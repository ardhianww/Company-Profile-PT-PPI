"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const Navbar = () => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      {/* Spacer div to prevent content jump when navbar becomes fixed */}
      <div className="h-[72px]"></div>
      <nav className={`
        fixed top-0 left-0 right-0 z-50
        bg-white shadow-md py-4 px-6 
        flex justify-between items-center
        transition-all duration-300
        ${scrolled ? 'bg-white/95 backdrop-blur-sm shadow-lg' : 'bg-white'}
      `}>
        <div className="text-2xl font-bold text-gray-800">PT Prima Paper Indonesia</div>
        <ul className="flex space-x-6">
          <li>
            <Link 
              href="/" 
              className={`text-gray-600 hover:text-gray-800 transition relative after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-gray-800 after:bottom-0 after:left-0 ${
                isActive('/') ? 'after:scale-x-100' : 'after:scale-x-0'
              } hover:after:scale-x-100 after:transition-transform after:duration-300`}
            >
              Beranda
            </Link>
          </li>
          <li>
            <Link 
              href="/about" 
              className={`text-gray-600 hover:text-gray-800 transition relative after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-gray-800 after:bottom-0 after:left-0 ${
                isActive('/about') ? 'after:scale-x-100' : 'after:scale-x-0'
              } hover:after:scale-x-100 after:transition-transform after:duration-300`}
            >
              Tentang Kami
            </Link>
          </li>
          <li>
            <Link 
              href="/products" 
              className={`text-gray-600 hover:text-gray-800 transition relative after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-gray-800 after:bottom-0 after:left-0 ${
                isActive('/products') ? 'after:scale-x-100' : 'after:scale-x-0'
              } hover:after:scale-x-100 after:transition-transform after:duration-300`}
            >
              Produk
            </Link>
          </li>
          <li>
            <Link 
              href="/testimonials" 
              className={`text-gray-600 hover:text-gray-800 transition relative after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-gray-800 after:bottom-0 after:left-0 ${
                isActive('/testimonials') ? 'after:scale-x-100' : 'after:scale-x-0'
              } hover:after:scale-x-100 after:transition-transform after:duration-300`}
            >
              Testimoni
            </Link>
          </li>
          <li>
            <Link 
              href="/blog" 
              className={`text-gray-600 hover:text-gray-800 transition relative after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-gray-800 after:bottom-0 after:left-0 ${
                isActive('/blog') ? 'after:scale-x-100' : 'after:scale-x-0'
              } hover:after:scale-x-100 after:transition-transform after:duration-300`}
            >
              Artikel
            </Link>
          </li>
        </ul>
        <Link 
          href="/contact" 
          className={`bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition ${
            isActive('/contact') ? 'bg-blue-700' : ''
          }`}
        >
          Contact
        </Link>
      </nav>
    </>
  );
};

export default Navbar;
