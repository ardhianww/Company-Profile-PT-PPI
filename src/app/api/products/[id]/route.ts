import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { put, del } from '@vercel/blob';

export async function PUT(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;

    const formData = await request.formData();
    const deleteImage = formData.get('deleteImage') === 'true';

    let imagePath = undefined;
    const image = formData.get('image') as File;

    // Get the current product to handle image deletion
    const currentProduct = await prisma.product.findUnique({ where: { id } });
    if (!currentProduct) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Handle image deletion if requested
    if (deleteImage && currentProduct.image) {
      try {
        await del(currentProduct.image);
        imagePath = null; // Set to null to remove from database
      } catch (error) {
        console.error('Error deleting image from storage:', error);
      }
    } else if (image && image instanceof File) {
      // Upload new image if provided
      const blob = await put(`products/${Date.now()}-${image.name}`, image, { access: 'public' });
      imagePath = blob.url;

      // Delete old image if exists
      if (currentProduct.image) {
        try {
          await del(currentProduct.image);
        } catch (error) {
          console.error('Error deleting old image from storage:', error);
        }
      }
    }

    const specs = formData.getAll('specs[]').map(spec => spec.toString());

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        name: formData.get('name')?.toString() || '',
        description: formData.get('description')?.toString() || '',
        price: parseFloat(formData.get('price')?.toString() || '0'),
        specs: specs,
        ...(imagePath !== undefined ? { image: imagePath } : {}),
      },
    });

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params; // ✅ FIX: Menggunakan await karena params adalah Promise!

    const product = await prisma.product.findUnique({ where: { id } });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    if (product.image) {
      try {
        await del(product.image);
      } catch (blobError) {
        console.error('Error deleting image from Blob storage:', blobError);
      }
    }

    const deletedProduct = await prisma.product.delete({ where: { id } });

    return NextResponse.json(deletedProduct);
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json({ error: 'Error deleting product' }, { status: 500 });
  }
}