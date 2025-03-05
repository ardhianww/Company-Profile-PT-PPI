import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { put, del } from '@vercel/blob';

export async function GET() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(testimonials);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error fetching testimonials' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    let imageUrl = null;
    const image = formData.get('image') as File;
    
    if (image && image instanceof File) {
      const blob = await put(`testimonials/${Date.now()}-${image.name}`, image, { access: 'public' });
      imageUrl = blob.url;
    }

    const testimonial = await prisma.testimonial.create({
      data: {
        name: formData.get('name')?.toString() || '',
        company: formData.get('company')?.toString() || '',
        message: formData.get('message')?.toString() || '',
        rating: parseInt(formData.get('rating')?.toString() || '5'),
        image: imageUrl,
      },
    });

    return NextResponse.json(testimonial);
  } catch (error) {
    console.error('Error creating testimonial:', error);
    return NextResponse.json(
      { error: 'Failed to create testimonial' },
      { status: 500 }
    );
  }
}
