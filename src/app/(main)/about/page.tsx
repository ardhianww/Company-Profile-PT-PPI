"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* Hero Section */}
      <section className="relative w-full h-[500px] flex flex-col justify-center items-center text-center bg-cover bg-center">
        <Image src="/group-of-business-people-scaled.jpg" width={1200} height={600} alt="About Us" className="absolute top-0 left-0 w-full h-full object-cover" />
        <div className="bg-black bg-opacity-50 w-full h-full flex flex-col justify-center items-center relative">
          <motion.h1 
            initial={{ opacity: 0, y: -50 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }}
            className="text-5xl font-bold text-white"
          >
            About PT PPI
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 50 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-white mt-4 max-w-2xl"
          >
            A legacy of excellence in sustainable paper and packaging solutions.
          </motion.p>
        </div>
      </section>

      {/* History Section */}
      <section className="py-16 px-6 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 50 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }}
          className="text-4xl font-semibold"
        >
          Our Journey
        </motion.h2>
        <div className="max-w-4xl mx-auto mt-8 space-y-8">
          {[{ year: "1990", text: "Founded with a vision to revolutionize the paper industry." },
            { year: "2005", text: "Expanded globally, offering high-quality sustainable solutions." },
            { year: "2020", text: "Launched eco-friendly packaging innovations." }].map((item, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, x: -50 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="p-6 bg-white shadow-lg rounded-lg"
            >
              <h3 className="text-2xl font-bold">{item.year}</h3>
              <p className="text-gray-600 mt-2">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="bg-white py-16 px-6 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 50 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }}
          className="text-4xl font-semibold"
        >
          Our Vision & Mission
        </motion.h2>
        <div className="flex flex-wrap justify-center gap-6 mt-8">
          {[{ title: "Vision", desc: "To lead the industry in sustainable paper innovation." },
            { title: "Mission", desc: "Providing eco-friendly, high-quality paper solutions for businesses worldwide." }].map((item, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 50 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="p-6 bg-gray-200 rounded-lg shadow-md max-w-sm"
            >
              <h3 className="text-2xl font-bold">{item.title}</h3>
              <p className="text-gray-600 mt-2">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Achievements & Certifications Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-16 px-6 text-center bg-white"
      >
        <h2 className="text-3xl font-semibold text-gray-800 mb-12">Our Achievements & Certifications</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gray-50 p-6 rounded-xl shadow-md"
          >
            <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">ISO 9001:2015</h3>
            <p className="text-gray-600">
              Tersertifikasi standar manajemen mutu internasional untuk konsistensi kualitas produk.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gray-50 p-6 rounded-xl shadow-md"
          >
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v2m0 4h.01" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">ISO 14001:2015</h3>
            <p className="text-gray-600">
              Sertifikasi sistem manajemen lingkungan untuk praktik produksi berkelanjutan.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gray-50 p-6 rounded-xl shadow-md"
          >
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">FSC Certified</h3>
            <p className="text-gray-600">
              Sertifikasi Forest Stewardship Council untuk penggunaan bahan baku yang bertanggung jawab.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mt-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gray-50 p-6 rounded-xl shadow-md"
          >
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Best Factory Award 2023</h3>
            <p className="text-gray-600">
              Penghargaan untuk fasilitas produksi terbaik dengan standar keamanan dan efisiensi tinggi.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gray-50 p-6 rounded-xl shadow-md"
          >
            <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">SNI Certification</h3>
            <p className="text-gray-600">
              Memenuhi Standar Nasional Indonesia untuk kualitas dan keamanan produk kertas.
            </p>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default AboutUs;
