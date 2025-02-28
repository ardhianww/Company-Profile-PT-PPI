import Link from 'next/link'

export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-primary to-primary-dark text-white py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Solusi Packaging Profesional untuk Bisnis Anda
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-100">
            Kami menyediakan karton box berkualitas tinggi dengan berbagai ukuran dan spesifikasi sesuai kebutuhan bisnis Anda.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              href="/products" 
              className="bg-white text-primary font-semibold px-8 py-3 rounded-lg text-center hover:bg-gray-100 transition-colors"
            >
              Lihat Produk
            </Link>
            <Link 
              href="/contact" 
              className="border-2 border-white text-white font-semibold px-8 py-3 rounded-lg text-center hover:bg-white hover:text-primary transition-colors"
            >
              Hubungi Kami
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
} 