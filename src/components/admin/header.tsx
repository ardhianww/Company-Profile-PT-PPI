"use client";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function AdminHeader() {
  const router = useRouter();

  const handleLogout = () => {
    // Hapus token dari cookies
    Cookies.remove("token", { path: "/" });

    // Redirect ke halaman login
    router.push("/login");
  };

  return (
    <header className='bg-white shadow-md'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center py-4'>
          <h1 className='text-xl font-semibold text-gray-800'>
            Admin Dashboard
          </h1>

          <button
            onClick={handleLogout}
            className='px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 flex items-center'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5 mr-2'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M3 3a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H3zm11 4a1 1 0 1 0-2 0v4a1 1 0 1 0 2 0V7zm-3 1a1 1 0 1 0-2 0v3a1 1 0 1 0 2 0V8z'
                clipRule='evenodd'
              />
            </svg>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
