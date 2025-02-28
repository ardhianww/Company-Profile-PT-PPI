import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { writeFile } from 'fs/promises';
import path from 'path';

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
    
    let imagePath = '';
    const image = formData.get('image') as File;
    
    if (image && image instanceof File) {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      const filename = `${Date.now()}-${image.name}`;
      const publicPath = path.join(process.cwd(), 'public', 'uploads');
      await writeFile(path.join(publicPath, filename), buffer);
      imagePath = `/uploads/${filename}`;
    }

    const testimonial = await prisma.testimonial.create({
      data: {
        name: formData.get('name')?.toString() || '',
        company: formData.get('company')?.toString() || '',
        message: formData.get('message')?.toString() || '',
        rating: parseInt(formData.get('rating')?.toString() || '5'),
        image: imagePath || null,
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