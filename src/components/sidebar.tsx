import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-4">
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
      <ul className="space-y-4">
        <li><Link href="/admin">🏠 Dashboard</Link></li>
        <li><Link href="/admin/manage">📦 Manajemen Produk</Link></li>
        <li><Link href="/admin/orders">🛒 Order Masuk</Link></li>
        <li><Link href="/admin/customers">👥 Data Customer</Link></li>
      </ul>
    </div>
  );
}
