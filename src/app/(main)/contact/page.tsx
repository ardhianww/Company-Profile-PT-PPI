import { Metadata } from 'next'
import ContactForm from '@/components/contact/ContactForm'

export const metadata: Metadata = {
  title: 'Hubungi Kami | PT Prima Paper Indonesia',
  description: 'Hubungi kami untuk mendapatkan penawaran dan konsultasi tentang kebutuhan packaging bisnis Anda.',
}

export default function ContactPage() {
  return (
    <div className="py-24 bg-gray-50">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-6 text-gray-900">Hubungi Kami</h1>
            <p className="text-lg text-gray-700">
              Kami siap membantu Anda mendapatkan solusi packaging terbaik untuk bisnis Anda.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-10">
            <ContactForm />
          </div>

          <div className="mt-16 grid md:grid-cols-3 gap-10">
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg transition-transform transform hover:scale-105">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Telepon</h3>
              <p className="text-gray-600">(021) 1234-5678</p>
            </div>

            <div className="text-center p-8 bg-white rounded-2xl shadow-lg transition-transform transform hover:scale-105">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Email</h3>
              <p className="text-gray-600">info@primapaper.com</p>
            </div>

            <div className="text-center p-8 bg-white rounded-2xl shadow-lg transition-transform transform hover:scale-105">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Alamat</h3>
              <p className="text-gray-600">Jl. Industri Raya No. 123, Jakarta</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
