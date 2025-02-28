"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-gray-900 text-white py-10 mt-10"
    >
      <div className="container mx-auto px-6 md:flex md:justify-between">
        {/* Contact Info */}
        <div className="mb-6 md:mb-0">
          <h2 className="text-2xl font-bold">PT Prima Paper Indonesia</h2>
          <p className="mt-2 text-gray-400">Jl. Industri Raya No. 123, Jakarta</p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-lg font-semibold">Hubungi Kami:</h3>
          <ul className="mt-2 space-y-2 text-gray-400">
            {/* <li className="hover:text-white-800 transition relative after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-white-800 after:bottom-0 after:left-0 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"><Link href="/contact">Hubungi Kami</Link></li> */}
            <p className="mt-2 text-gray-400">info@primapaper.com</p>
            <p className="mt-2 text-gray-400">(021) 1234-5678</p>
          </ul>
        </div>

        {/* Social Media */}
        <div className="mt-6 md:mt-0">
          <h3 className="text-lg font-semibold">Mari Terhubung:</h3>
          <div className="flex space-x-4 mt-2">
            <a href="#" className="text-gray-400 hover:text-white text-2xl"><FaFacebook /></a>
            <a href="#" className="text-gray-400 hover:text-white text-2xl"><FaTwitter /></a>
            <a href="#" className="text-gray-400 hover:text-white text-2xl"><FaInstagram /></a>
            <a href="#" className="text-gray-400 hover:text-white text-2xl"><FaLinkedin /></a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-700 mt-6 pt-6 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} PT Prima Paper Indonesia. All rights reserved.</p>
      </div>
    </motion.footer>
  );
};

export default Footer;
