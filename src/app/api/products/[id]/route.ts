import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

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
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      // Ensure uploads directory exists
      const publicPath = path.join(process.cwd(), 'public', 'uploads');
      await mkdir(publicPath, { recursive: true });
      
      const filename = `${Date.now()}-${image.name}`;
      await writeFile(path.join(publicPath, filename), buffer);
      imagePath = `/uploads/${filename}`;
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
        ...(image instanceof File ? { image: imagePath } : {}), // Only update image if new file provided
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