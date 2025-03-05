import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { put } from '@vercel/blob';

export async function GET() {
  try {
    const blogs = await prisma.blog.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(blogs);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error fetching blogs' },
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
      // Upload image to Vercel Blob
      const blob = await put(`blog/${Date.now()}-${image.name}`, image, {
        access: 'public',
      });
      imagePath = blob.url;
    }

    const blog = await prisma.blog.create({
      data: {
        title: formData.get('title')?.toString() || '',
        content: formData.get('content')?.toString() || '',
        author: formData.get('author')?.toString() || '',
        slug: formData.get('slug')?.toString() || '',
        image: imagePath || null,
      },
    });

    return NextResponse.json(blog);
  } catch (error) {
    console.error('Error creating blog:', error);
    return NextResponse.json(
      { error: 'Failed to create blog' },
      { status: 500 }
    );
  }
}
