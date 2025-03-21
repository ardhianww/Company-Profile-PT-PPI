import { prisma } from '@/lib/prisma'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Key } from 'react'
import Link from 'next/link'

export const dynamic = "force-dynamic"; 

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params; // ✅ Tetap menggunakan `await`
  const blog = await prisma.blog.findUnique({
    where: { slug }
  });

  if (!blog) {
    return {
      title: 'Blog Not Found | PT Prima Paper Indonesia'
    };
  }

  return {
    title: `${blog.title} | PT Prima Paper Indonesia`,
    description: blog.content.substring(0, 160)
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params; // ✅ Tetap menggunakan `await`
  const blog = await prisma.blog.findUnique({
    where: { slug }
  });

  if (!blog) {
    notFound();
  }

  return (
    <div className="py-24 bg-gray-50">
      <article className="container mx-auto px-4 max-w-4xl bg-white shadow-lg rounded-xl p-8">
        {blog.image && (
          <div className="relative h-96 mb-8 rounded-xl overflow-hidden">
            <Image
              src={blog.image}
              alt={blog.title}
              width={1200}
              height={800}
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        )}

        <h1 className="text-4xl font-bold mb-6 text-gray-900 leading-tight text-center">{blog.title}</h1>

        <div className="flex items-center justify-center text-gray-500 mb-8 text-sm">
          <span>{new Date(blog.createdAt).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}</span>
          <span className="mx-2">•</span>
          <span className="font-medium">{blog.author}</span>
        </div>

        <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed">
          {blog.content.split('\n').map((paragraph: string, index: Key) => (
            <p key={index} className="mb-4">{paragraph}</p>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link 
            href="/blog" 
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <svg 
              className="w-5 h-5 mr-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M10 19l-7-7m0 0l7-7m-7 7h18" 
              />
            </svg>
            Kembali
          </Link>
        </div>
      </article>
    </div>
  )
}
