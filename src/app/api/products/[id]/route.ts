import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { put } from '@vercel/blob';
import { del } from '@vercel/blob';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const formData = await request.formData();
    const id = params.id;
    
    let imagePath = undefined;
    const image = formData.get('image') as File;
    
    if (image && image instanceof File) {
      // Upload image to Vercel Blob
      const blob = await put(`${Date.now()}-${image.name}`, image, { access: 'public' });
      imagePath = blob.url; // Store URL in the database
    }

    // Get specs array
    const specs = formData.getAll('specs[]').map(spec => spec.toString());

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        name: formData.get('name')?.toString() || '',
        description: formData.get('description')?.toString() || '',
        price: parseFloat(formData.get('price')?.toString() || '0'),
        specs: specs,
        ...(image instanceof File ? { image: imagePath } : {}), // Only update image if a new file is provided
      },
    });

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // First, get the product to access its image URL
    const product = await prisma.product.findUnique({
      where: { id: params.id }
    });

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // If product has an image, delete it from Vercel Blob
    if (product.image) {
      try {
        await del(product.image);
      } catch (blobError) {
        console.error('Error deleting image from Blob storage:', blobError);
      }
    }

    // Then delete the product from the database
    const deletedProduct = await prisma.product.delete({
      where: { id: params.id }
    });

    return NextResponse.json(deletedProduct);
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { error: 'Error deleting product' },
      { status: 500 }
    );
  }
}
