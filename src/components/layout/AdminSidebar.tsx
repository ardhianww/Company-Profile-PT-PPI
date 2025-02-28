import Link from 'next/link';
import { usePathname } from 'next/navigation';

const AdminSidebar = () => {
  const pathname = usePathname();

  const isActive = (path: string) => pathname.startsWith(path);

  const menuItems = [
    { path: '/admin/product', label: 'Products', icon: '📦' },
    { path: '/admin/testimonial', label: 'Testimonials', icon: '💬' },
    { path: '/admin/blog', label: 'Blog', icon: '📝' },
    { path: '/admin/messages', label: 'Messages', icon: '✉️' },
  ];

  return (
    <div className="bg-white shadow-lg w-64 min-h-screen p-4">
      <div className="text-xl font-bold text-gray-800 mb-8 p-2">Admin Dashboard</div>
      <nav>
        {menuItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`flex items-center space-x-2 p-3 rounded-lg mb-2 transition-colors ${
              isActive(item.path)
                ? 'bg-blue-100 text-blue-600'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default AdminSidebar; 