# PT Prima Paper Indonesia - Company Profile

## Deskripsi Project
Website company profile untuk PT Prima Paper Indonesia, produsen karton box berkualitas. Website ini dibangun menggunakan Next.js 14 dengan App Router dan Tailwind CSS, menyediakan informasi perusahaan, produk, testimonial, blog, dan fitur kontak.

## Fitur
- **Responsive Design**: Tampilan yang responsif untuk berbagai ukuran perangkat
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
   - Buat file `.env` di root project
   - Tambahkan variabel environment yang diperlukan:
     ```
     # Contoh konfigurasi
     DATABASE_URL=http://localhost:3000/api
     ```
4. **Setup Prisma**
   ```bash
   npx prisma migrate dev
   
   npx  prisma generate


   ```

4. **Jalankan development server**
   ```bash
   npm run dev
   # atau
   yarn dev
   ```

5. **Buka browser**
   - Akses `http://localhost:3000` untuk melihat website


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


## Kontribusi
Silakan berkontribusi dengan membuat pull request atau melaporkan issue.

## Lisensi
[MIT License](LICENSE)

