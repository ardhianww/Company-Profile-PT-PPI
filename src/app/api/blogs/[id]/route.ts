import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { put, del } from '@vercel/blob';

export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params; // Menggunakan await karena params adalah Promise!

    if (!id) {
      return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
    }

    const blog = await prisma.blog.findUnique({
      where: { id },
    });

    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json(blog);
  } catch (error) {
    console.error('Error fetching blog:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json({ error: 'Missing blog ID' }, { status: 400 });
    }

    const formData = await request.formData();

    let imagePath = undefined;
    const image = formData.get('image') as File;

    if (image && image instanceof File) {
      const blob = await put(`blog/${Date.now()}-${image.name}`, image, { access: 'public' });
      imagePath = blob.url;
    }

    const updatedBlog = await prisma.blog.update({
      where: { id },
      data: {
        title: formData.get('title')?.toString() || '',
        content: formData.get('content')?.toString() || '',
        author: formData.get('author')?.toString() || '',
        slug: formData.get('slug')?.toString() || '',
        ...(imagePath ? { image: imagePath } : {}),
      },
    });

    return NextResponse.json(updatedBlog);
  } catch (error) {
    console.error('Error updating blog:', error);
    return NextResponse.json({ error: 'Failed to update blog' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json({ error: 'Missing blog ID' }, { status: 400 });
    }

    const blog = await prisma.blog.findUnique({ where: { id } });

    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    if (blog.image) {
      try {
        const blobUrl = new URL(blog.image);
        const blobPath = blobUrl.pathname.substring(1);
        await del(blobPath);
      } catch (err) {
        console.error('Error deleting image from Vercel Blob:', err);
      }
    }

    await prisma.blog.delete({ where: { id } });

    return NextResponse.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog:', error);
    return NextResponse.json({ error: 'Error deleting blog' }, { status: 500 });
  }
}
