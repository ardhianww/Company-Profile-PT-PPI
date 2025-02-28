"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface Blog {
  id: number;
  title: string;
  slug: string;
  content: string;
  createdAt: string;
  author: string;
  image?: string;
}

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    async function fetchBlogs() {
      const res = await fetch('/api/blogs');
      const data: Blog[] = await res.json();
      setBlogs(data);
    }
    fetchBlogs();
  }, []);

  return (
    <div className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h1 className="text-4xl font-bold mb-4 text-gray-900">Blog & Artikel</h1>
          <p className="text-lg text-gray-600">
            Temukan informasi terkini seputar industri packaging dan tips memilih solusi packaging yang tepat.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-10">
          {blogs.map((blog, index) => (
            <motion.article 
              key={blog.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {blog.image && (
                <div className="relative h-56">
                  <img 
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <div className="p-6 flex flex-col h-full">
                <h2 className="text-xl font-semibold mb-2 text-gray-900 hover:text-primary">
                  <Link href={`/blog/${blog.slug}`}>
                    {blog.title}
                  </Link>
                </h2>
                
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <span>{new Date(blog.createdAt).toLocaleDateString('id-ID', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</span>
                  <span className="mx-2">•</span>
                  <span>{blog.author}</span>
                </div>

                <p className="text-gray-700 line-clamp-3 flex-grow">
                  {blog.content}
                </p>

                <Link 
                  href={`/blog/${blog.slug}`}
                  className="inline-flex items-center mt-4 text-primary hover:text-primary-dark font-medium"
                >
                  Baca Selengkapnya
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <p className="text-2xl font-semibold text-gray-900">
            Masih ingin tahu lebih banyak? Jangan lewatkan artikel terbaru kami! 🚀
          </p>
          <p className="text-lg text-gray-600 mt-2">
            Tetap update dengan tren dan informasi terkini tentang industri packaging.
          </p>
        </motion.div>
      </div>
    </div>
  )
}
