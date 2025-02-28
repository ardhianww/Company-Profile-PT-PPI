import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

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
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      // Ensure uploads directory exists
      const publicPath = path.join(process.cwd(), 'public', 'uploads', 'blog');
      await mkdir(publicPath, { recursive: true });
      
      const filename = `${Date.now()}-${image.name}`;
      await writeFile(path.join(publicPath, filename), buffer);
      imagePath = `/uploads/blog/${filename}`;
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