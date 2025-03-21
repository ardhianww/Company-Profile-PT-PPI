import { NextRequest, NextResponse } from 'next/server'; 
import { prisma } from '@/lib/prisma';
import { put, del } from '@vercel/blob';

export async function PUT(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params; // ✅ Menggunakan await karena params adalah Promise!

    const formData = await request.formData();

    let imagePath = undefined;
    const image = formData.get('image') as File;

    if (image && image instanceof File) {
      const blob = await put(`testimonials/${Date.now()}-${image.name}`, image, { access: 'public' });
      imagePath = blob.url;
    }

    const updatedTestimonial = await prisma.testimonial.update({
      where: { id },
      data: {
        name: formData.get('name')?.toString() || '',
        company: formData.get('company')?.toString() || '',
        message: formData.get('message')?.toString() || '',
        rating: parseInt(formData.get('rating')?.toString() || '5'),
        ...(image instanceof File ? { image: imagePath } : {}),
      },
    });

    return NextResponse.json(updatedTestimonial);
  } catch (error) {
    console.error('Error updating testimonial:', error);
    return NextResponse.json({ error: 'Failed to update testimonial' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params; // ✅ Menggunakan await karena params adalah Promise!

    const testimonial = await prisma.testimonial.findUnique({ where: { id } });

    if (!testimonial) {
      return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
    }

    if (testimonial.image) {
      try {
        await del(testimonial.image);
      } catch (blobError) {
        console.error('Error deleting image from Blob storage:', blobError);
      }
    }

    const deletedTestimonial = await prisma.testimonial.delete({ where: { id } });

    return NextResponse.json(deletedTestimonial);
  } catch (error) {
    console.error('Error deleting testimonial:', error);
    return NextResponse.json({ error: 'Error deleting testimonial' }, { status: 500 });
  }
}
