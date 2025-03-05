import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { put, del } from '@vercel/blob';

// GET /api/blogs/[id] - Get a specific blog
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const blog = await prisma.blog.findUnique({
      where: { id: params.id }
    });
    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }
    return NextResponse.json(blog);
  } catch (error) {
    console.error('Error fetching blog:', error);
    return NextResponse.json({ error: 'Failed to fetch blog' }, { status: 500 });
  }
}

// PUT /api/blogs/[id] - Update a blog
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
      // Upload new image to Vercel Blob
      const blob = await put(`blog/${Date.now()}-${image.name}`, image, {
        access: 'public',
      });

      imagePath = blob.url;

      // Delete old image if exists
      const oldBlog = await prisma.blog.findUnique({ where: { id } });
      if (oldBlog?.image) {
        await fetch(oldBlog.image, { method: 'DELETE' }).catch(err =>
          console.error('Error deleting old image:', err)
        );
      }
    }

    const updatedBlog = await prisma.blog.update({
      where: { id },
      data: {
        title: formData.get('title')?.toString(),
        content: formData.get('content')?.toString(),
        author: formData.get('author')?.toString(),
        slug: formData.get('slug')?.toString(),
        ...(imagePath ? { image: imagePath } : {}),
      },
    });

    return NextResponse.json(updatedBlog);
  } catch (error) {
    console.error('Error updating blog:', error);
    return NextResponse.json(
      { error: 'Failed to update blog' },
      { status: 500 }
    );
  }
}

// DELETE /api/blogs/[id] - Delete a blog
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Delete image from Vercel Blob if exists
    const blog = await prisma.blog.findUnique({
      where: { id: params.id }
    });

    if (blog?.image) {
      try {
        // Extract the blob URL path
        const blobUrl = new URL(blog.image);
        const blobPath = blobUrl.pathname.substring(1); // Remove leading slash
        await del(blobPath);
      } catch (err) {
        console.error('Error deleting image from Vercel Blob:', err);
      }
    }

    // Delete blog from database
    await prisma.blog.delete({
      where: { id: params.id }
    });

    return NextResponse.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog:', error);
    return NextResponse.json(
      { error: 'Error deleting blog' },
      { status: 500 }
    );
  }
}
