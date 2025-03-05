import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { put, del } from '@vercel/blob';

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
      const blob = await put(`testimonials/${Date.now()}-${image.name}`, image, {
        access: 'public',
      });
      imagePath = blob.url;
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
    const testimonial = await prisma.testimonial.findUnique({
      where: { id: params.id },
    });
    
    if (testimonial?.image) {
      await del(testimonial.image);
    }

    await prisma.testimonial.delete({
      where: { id: params.id },
    });
    
    return NextResponse.json({ message: 'Testimonial deleted' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error deleting testimonial' },
      { status: 500 }
    );
  }
}
