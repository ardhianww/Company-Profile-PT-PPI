import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { writeFile } from 'fs/promises';
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
      
      const filename = `${Date.now()}-${image.name}`;
      const publicPath = path.join(process.cwd(), 'public', 'uploads');
      await writeFile(path.join(publicPath, filename), buffer);
      imagePath = `/uploads/${filename}`;
    }

    const updatedTestimonial = await prisma.testimonial.update({
      where: { id },
      data: {
        name: formData.get('name')?.toString(),
        company: formData.get('company')?.toString(),
        message: formData.get('message')?.toString(),
        rating: parseInt(formData.get('rating')?.toString() || '5'),
        image: formData.get('image') ? imagePath : null,
      },
    });

    return NextResponse.json(updatedTestimonial);
  } catch (error) {
    console.error('Error updating testimonial:', error);
    return NextResponse.json(
      { error: 'Failed to update testimonial' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.testimonial.delete({
      where: { id: params.id }
    });
    return NextResponse.json({ message: 'Testimonial deleted' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error deleting testimonial' },
      { status: 500 }
    );
  }
} 