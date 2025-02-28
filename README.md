# PT Prima Paper Indonesia - Company Profile

## Deskripsi Project
Website company profile untuk PT Prima Paper Indonesia, produsen karton box berkualitas. Website ini dibangun menggunakan Next.js 14 dengan App Router dan Tailwind CSS, menyediakan informasi perusahaan, produk, testimonial, blog, dan fitur kontak.

## Fitur
- **Responsive Design**: Tampilan yang responsif untuk berbagai ukuran perangkat
- **Dark Mode**: Dukungan tema gelap yang dapat diaktifkan/dinonaktifkan
- **Blog Management**: Sistem pengelolaan artikel dengan upload gambar lokal
- **Admin Panel**: Panel admin untuk mengelola konten website
- **Contact Form**: Form kontak dengan penyimpanan pesan
- **SEO Friendly**: Optimasi untuk mesin pencari

## Teknologi
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- React Hooks
- LocalStorage untuk preferensi pengguna
- PostgreSQL

## Instalasi

### Prasyarat
- Node.js (versi 18.x atau lebih baru)
- npm atau yarn

### Langkah Instalasi

1. **Clone repository**
   ```bash
   git clone https://github.com/username/company-profiles.git
   cd company-profiles
   ```

2. **Install dependencies**
   ```bash
   npm install
   # atau
   yarn install
   ```

3. **Konfigurasi environment**
   - Buat file `.env.local` di root project
   - Tambahkan variabel environment yang diperlukan:
     ```
     # Contoh konfigurasi
     NEXT_PUBLIC_API_URL=http://localhost:3000/api
     ```

4. **Jalankan development server**
   ```bash
   npm run dev
   # atau
   yarn dev
   ```

5. **Buka browser**
   - Akses `http://localhost:3000` untuk melihat website

## Struktur Project

```
company-profiles/
├── public/
│   └── uploads/           # Folder untuk menyimpan gambar yang diupload
├── src/
│   ├── app/
│   │   ├── admin/         # Halaman admin
│   │   ├── api/           # API routes
│   │   ├── blog/          # Halaman blog
│   │   └── ...            # Halaman lainnya
│   ├── components/
│   │   ├── layout/        # Komponen layout (Navbar, Footer, dll)
│   │   └── ...            # Komponen lainnya
│   ├── hooks/             # Custom hooks
│   │   └── useDarkMode.ts # Hook untuk dark mode
│   └── ...
├── tailwind.config.js     # Konfigurasi Tailwind CSS
└── ...
```

## Penggunaan Dark Mode

Dark mode diimplementasikan menggunakan Tailwind CSS dengan konfigurasi `darkMode: "class"`. Preferensi pengguna disimpan di localStorage.

### Cara Mengaktifkan Dark Mode
1. Klik tombol toggle di navbar
2. Preferensi akan disimpan dan tetap berlaku setelah refresh

### Implementasi di Komponen
Untuk menambahkan dukungan dark mode pada komponen baru, gunakan prefix `dark:` pada class Tailwind:

```jsx
<div className="bg-white dark:bg-gray-900 text-black dark:text-white">
  Konten
</div>
```

## Deployment

### Build untuk Production
```bash
npm run build
# atau
yarn build
```

### Jalankan Production Build
```bash
npm start
# atau
yarn start
```

## Troubleshooting

### Masalah Umum

1. **Gambar tidak muncul setelah upload**
   - Pastikan folder `public/uploads` sudah ada dan memiliki permission yang benar
   - Periksa path gambar di database

2. **Dark mode tidak berfungsi**
   - Pastikan `darkMode: "class"` sudah dikonfigurasi di `tailwind.config.js`
   - Periksa apakah class `dark` ditambahkan ke elemen `<html>`

3. **Error saat build**
   - Jalankan `npm run lint` untuk memeriksa error
   - Pastikan semua dependencies terinstall dengan benar

## Kontribusi
Silakan berkontribusi dengan membuat pull request atau melaporkan issue.

## Lisensi
[MIT License](LICENSE)

