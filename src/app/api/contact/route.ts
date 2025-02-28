import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const messages = await prisma.visitor.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json(
      { error: 'Error fetching messages' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    const visitor = await prisma.visitor.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone || null, // karena phone optional
        message: data.message,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Pesan Anda telah terkirim. Kami akan segera menghubungi Anda.',
      data: visitor
    });
  } catch (error) {
    console.error('Error saving contact:', error);
    return NextResponse.json(
      { 
        success: false,
        message: 'Maaf, terjadi kesalahan. Silakan coba lagi.',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 