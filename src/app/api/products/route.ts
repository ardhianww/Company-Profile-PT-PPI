import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { writeFile } from 'fs/promises';
import path from 'path';
import { mkdir } from 'fs/promises';

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
    
    let imagePath = '';
    const image = formData.get('image') as File;
    
    if (image && image instanceof File) {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      // Ensure uploads directory exists
      const publicPath = path.join(process.cwd(), 'public', 'uploads');
      await mkdir(publicPath, { recursive: true });
      
      const filename = `${Date.now()}-${image.name}`;
      await writeFile(path.join(publicPath, filename), buffer);
      imagePath = `/uploads/${filename}`;
    }

    // Parse specs array properly
    const specs = formData.getAll('specs[]').map(spec => spec.toString());

    // Create product in database
    const product = await prisma.product.create({
      data: {
        name: formData.get('name')?.toString() || '',
        description: formData.get('description')?.toString() || '',
        price: parseFloat(formData.get('price')?.toString() || '0'),
        image: imagePath || null,
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