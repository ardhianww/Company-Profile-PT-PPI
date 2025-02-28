import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PT Prima Paper Indonesia | Produsen Karton Box Berkualitas",
  description: "Produsen karton box terpercaya dengan berbagai ukuran dan spesifikasi. Solusi packaging profesional untuk bisnis Anda.",
  keywords: "karton box, produsen karton, packaging solution, kardus custom",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
