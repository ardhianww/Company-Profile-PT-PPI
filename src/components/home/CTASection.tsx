import Link from 'next/link'

export default function CTASection() {
  return (
    <section className="py-20 bg-primary">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Siap Untuk Memulai?
        </h2>
        <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
          Hubungi kami sekarang untuk mendapatkan penawaran terbaik sesuai kebutuhan packaging bisnis Anda.
        </p>
        <Link 
          href="/contact"
          className="inline-block bg-white text-primary font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
        >
          Dapatkan Penawaran
        </Link>
      </div>
    </section>
  )
} 