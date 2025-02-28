import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  // Jika tidak ada token, redirect ke login
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    // Verifikasi token menggunakan jose (lebih aman untuk edge runtime)
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    await jwtVerify(token, secret);

    // Token valid, lanjutkan request
    return NextResponse.next();
  } catch (error) {
    // Token tidak valid atau expired
    console.error("Token verification failed:", error);

    // Hapus cookie token yang tidak valid
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("token");

    return response;
  }
}

// Konfigurasi route yang dilindungi
export const config = {
  matcher: [
    "/admin/:path*", // Semua route yang dimulai dengan /admin
    "/api/admin/:path*", // Semua route API admin
  ],
};
