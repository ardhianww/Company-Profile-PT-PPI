"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const HomePage = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section with Carousel */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }} 
        className="relative w-full h-[500px] flex flex-col justify-center items-center text-center bg-cover bg-center"
      >
        <Carousel
          showThumbs={false}
          autoPlay
          infiniteLoop
          interval={5000}
          showStatus={false}
          className="w-full h-full"
        >
          <div>
            <Image src="/real.jpg" width={1200} height={600} alt="Paper Factory" className="w-full h-[500px] object-cover" />
          </div>
          <div>
            <Image src="/asaw.jpeg" width={1200} height={600} alt="Paper Production" className="w-full h-[500px] object-cover" />
          </div>
          <div>
            <Image src="/OIP.jpeg" width={1200} height={600} alt="Sustainable Paper" className="w-full h-[500px] object-cover" />
          </div>
        </Carousel>
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex flex-col justify-center items-center text-white">
          <h1 className="text-4xl font-bold">Revolutionizing the Paper & Carton Industry</h1>
          <p className="text-lg mt-4 max-w-2xl">Delivering sustainable and high-quality paper solutions to empower businesses worldwide.</p>
          <Link href="/products" className="mt-6 bg-blue-600 px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition">
            Explore Our Products
          </Link>
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }} 
        viewport={{ once: true }}
        className="py-16 px-6 text-center"
      >
        <h2 className="text-3xl font-semibold text-gray-800">Why Choose PaperCorp?</h2>
        <p className="text-gray-600 max-w-3xl mx-auto mt-4">
          With years of experience in the paper industry, we provide top-notch materials for packaging, printing, and industrial use. Our commitment to sustainability ensures an eco-friendly future.
        </p>
      </motion.section>

      {/* Core Values Section - menggantikan Client Testimonials */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-16 px-6 text-center bg-white"
      >
        <h2 className="text-3xl font-semibold text-gray-800 mb-12">Our Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gray-50 p-6 rounded-xl shadow-md"
          >
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Quality Excellence</h3>
            <p className="text-gray-600">
              Berkomitmen untuk menghasilkan produk berkualitas tinggi yang memenuhi standar industri dan kebutuhan pelanggan.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gray-50 p-6 rounded-xl shadow-md"
          >
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Sustainability</h3>
            <p className="text-gray-600">
              Mengutamakan praktik ramah lingkungan dalam setiap aspek produksi dan pengembangan produk.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gray-50 p-6 rounded-xl shadow-md"
          >
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Innovation</h3>
            <p className="text-gray-600">
              Terus berinovasi dalam teknologi dan proses untuk memberikan solusi terbaik bagi industri kertas.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mt-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gray-50 p-6 rounded-xl shadow-md"
          >
            <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Customer Partnership</h3>
            <p className="text-gray-600">
              Membangun hubungan jangka panjang dengan pelanggan melalui layanan dan dukungan yang berkelanjutan.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gray-50 p-6 rounded-xl shadow-md"
          >
            <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Integrity & Trust</h3>
            <p className="text-gray-600">
              Menjalankan bisnis dengan standar etika tinggi dan transparansi dalam setiap interaksi.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        viewport={{ once: true }} 
        transition={{ duration: 0.5 }} 
        className="py-16 px-6 bg-gray-100"
      >
        <h2 className="text-3xl font-semibold text-gray-800 text-center">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto mt-6">
          {[
            { question: "Produk apa yang ditawarkan?", answer: "Kami menyediakan solusi kertas, karton, dan kemasan berkualitas tinggi yang disesuaikan untuk berbagai industri." },
            { question: "Apakah produk Anda ramah lingkungan?", answer: "Ya! Keberlanjutan adalah prinsip inti kami. Kami menggunakan bahan yang dapat didaur ulang dan dapat terurai secara hayati." },
            { question: "Bagaimana cara memesan?", answer: "Anda dapat menelusuri produk kami dan menghubungi kami melalui situs web kami untuk mendapatkan penawaran dan melakukan pemesanan." }
          ].map((faq, index) => (
            <div key={index} className="border-b border-gray-300 py-4">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left flex justify-between items-center text-gray-800 font-medium"
              >
                {faq.question}
                <span className="text-lg transition-transform duration-300" style={{ transform: openFAQ === index ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                  ▼
                </span>
              </button>
              {openFAQ === index && (
                <motion.p 
                  initial={{ opacity: 0, height: 0 }} 
                  animate={{ opacity: 1, height: "auto" }} 
                  transition={{ duration: 0.3 }} 
                  className="mt-2 text-gray-600"
                >
                  {faq.answer}
                </motion.p>
              )}
            </div>
          ))}
        </div>
      </motion.section>

    </div>
  );
};

export default HomePage;
