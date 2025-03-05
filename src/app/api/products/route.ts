import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { put } from '@vercel/blob';

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Error fetching products' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    let imageUrl = '';
    const image = formData.get('image') as File;
    
    if (image && image instanceof File) {
      const blob = await put(`products/${Date.now()}-${image.name}`, image, {
        access: 'public',
      });
      imageUrl = blob.url;
    }

    // Parse specs array properly
    const specs = formData.getAll('specs[]').map(spec => spec.toString());

    // Create product in database
    const product = await prisma.product.create({
      data: {
        name: formData.get('name')?.toString() || '',
        description: formData.get('description')?.toString() || '',
        price: parseFloat(formData.get('price')?.toString() || '0'),
        image: imageUrl || null,
        specs: specs,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}
