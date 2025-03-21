// import Sidebar from "@/components/sidebar";
// import Header from "@/components/header";
import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-4 min-h-screen">
        <Link href="/admin" className="text-lg font-bold">Admin Panel</Link>
        <nav className="mt-4">
          <Link href="/admin/product" className="block py-2 px-4 hover:bg-gray-700">📦 Product</Link>
          <Link href="/admin/testimonial" className="block py-2 px-4 hover:bg-gray-700">💬 Testimoni</Link>
          <Link href="/admin/blog" className="block py-2 px-4 hover:bg-gray-700">📝 Blog</Link>
          <Link href="/admin/messages" className="block py-2 px-4 hover:bg-gray-700">📧 Pesan Contact</Link>
          <Link href="/" className="block py-2 px-4 hover:bg-gray-700">Kembali ke beranda</Link>
        </nav>
      </aside>

      {/* Content */}
      <div className="flex-1 p-6 bg-gray-100">
        {children}
      </div>
    </div>
  );
}


