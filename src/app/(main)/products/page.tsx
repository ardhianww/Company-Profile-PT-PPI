"use client";

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface Product {
  id: number;
  name: string;
  description: string;
  image?: string;
  specs: string[];
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch('/api/products');
      const data: Product[] = await res.json();
      setProducts(data);
    }
    fetchProducts();
  }, []);

  return (
    <div className="py-24 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 50 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Produk Kami</h1>
          <p className="text-lg text-gray-700">
            Berbagai jenis karton box berkualitas dengan spesifikasi yang dapat disesuaikan untuk memenuhi kebutuhan packaging bisnis Anda.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden transform hover:scale-105"
            >
              <div className="relative h-64 bg-gray-300">
                {product.image && (
                  <Image src={product.image} alt={product.name} layout="fill" className="object-cover" priority />
                )}
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-3 text-gray-900">{product.name}</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                
                <div className="bg-gray-100 rounded-lg p-4">
                  {/* <h4 className="text-lg font-semibold text-gray-800 mb-2">Spesifikasi:</h4> */}
                  <ul className="space-y-1 text-sm text-gray-600">
                    {product.specs.map((spec: string, index: number) => (
                      <li key={index} className="flex items-center">{spec}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="text-lg text-gray-700 mb-6">
            Butuh spesifikasi khusus? Kami siap membantu Anda mendapatkan solusi packaging yang tepat.
          </p>
          <a 
            href="/contact" 
            className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-full shadow-md transition-all duration-300"
          >
            Hubungi Kami
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </div>
  )
}
