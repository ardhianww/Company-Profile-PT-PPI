"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Card from "@/components/card";
import { motion } from "framer-motion";

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("[Admin] Memeriksa token...");
    const token = Cookies.get("token");
    console.log("[Admin] Token ditemukan:", token);

    if (!token) {
      console.log("[Admin] Token tidak ditemukan, redirect ke /login...");
      router.replace("/login");
      setLoading(false);
      return;
    }

    fetch("/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("[Admin] Response dari /api/auth/me:", data);

        if (data.error) {
          console.log("[Admin] Session expired, redirect ke /login...");
          Cookies.remove("token");
          router.replace("/login");
        } else {
          console.log("[Admin] User ditemukan, tetap di halaman admin.");
          setUser(data.user);
        }
      })
      .catch((err) => {
        console.error("[Admin] Gagal fetch user data:", err);
        setError("Gagal mengambil data pengguna.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [router]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-xl shadow-lg mb-6"
      >
        <h1 className="text-3xl font-bold">Selamat Datang di Dashboard Admin 🎉</h1>
        <p className="mt-2 text-lg">
          Gunakan sidebar di sebelah kiri untuk mengakses fitur kelola data dengan mudah dan cepat.
        </p>
      </motion.div>
    </div>
  );
}
