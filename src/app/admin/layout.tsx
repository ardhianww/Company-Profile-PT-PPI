import Sidebar from "@/components/sidebar";
import Header from "@/components/header";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-4 min-h-screen">
        <a href="/admin" className="text-lg font-bold">Admin Panel</a>
        <nav className="mt-4">
          {/* <a href="/admin" className="block py-2 px-4 hover:bg-gray-700">🏠 Dashboard</a> */}
          <a href="/admin/product" className="block py-2 px-4 hover:bg-gray-700">📦 Product</a>
          <a href="/admin/testimonial" className="block py-2 px-4 hover:bg-gray-700">💬 Testimoni</a>
          <a href="/admin/blog" className="block py-2 px-4 hover:bg-gray-700">📝 Blog</a>
          <a href="/admin/messages" className="block py-2 px-4 hover:bg-gray-700">📧 Pesan Contact</a>
          <a href="/" className="block py-2 px-4 hover:bg-gray-700">Kembali ke beranda</a>
        </nav>
      </aside>

      {/* Content */}
      <div className="flex-1 p-6 bg-gray-100">
        {children}
      </div>
    </div>
  );
}

