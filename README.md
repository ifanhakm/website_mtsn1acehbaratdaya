# 🕌 Website Resmi MTsN 1 Aceh Barat Daya

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Payload CMS](https://img.shields.io/badge/Payload_CMS-3.x_Stable-000000?style=for-the-badge&logo=payload)](https://payloadcms.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Supabase-316192?style=for-the-badge&logo=postgresql)](https://supabase.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)

Repositori Resmi pengembangan website **Madrasah Tsanawiyah Negeri 1 Aceh Barat Daya** (MTsN 1 Abdya), salah satu **Madrasah Inovasi** terkemuka di Provinsi Aceh. Proyek ini dibangun ulang dengan arsitektur modern berorientasi masa depan yang bersih, sangat cepat, responsif mobile-first, serta ramah tata kelola bagi tim Humas dan Tata Usaha sekolah.

---

## 🌟 Fitur Utama Website

1. **Beranda Dinamis (Homepage):**
   * **Hero Section:** Tagline madrasah, visual gedung utama, dan tombol aksi (Call to Action) terarah.
   * **Statistik Sekolah:** Menampilkan Rombe, Siswa Aktif, Jumlah Guru, dan Akreditasi secara profesional.
   * **Sambutan Kepala Sekolah:** Tata letak berdampingan rapat di tengah layar (*Cohesive Centered Grid*) untuk kenyamanan membaca yang seimbang di desktop maupun perangkat mobile.
   * **3 Pilar Utama:** Highlight komitmen sekolah pada aspek Imtaq, Iptek, dan Berwawasan Lingkungan.
   * **Kabar Terbaru:** Integrasi otomatis 3 artikel berita terhangat langsung dari database.

2. **Direktori Pendidik & Tenaga Kependidikan:**
   * Diintegrasikan secara dinamis ke database PostgreSQL via Payload CMS.
   * **Portrait 3:4 View:** Foto guru disajikan dalam rasio portrait presisi seperti situs institusi papan atas.
   * **Smart Top-Crop (`object-top`):** Kompresi visual cerdas yang memastikan area wajah dan kepala dewan guru tidak terpotong saat dirender dalam bingkai.
   * **Interaktivitas Instan:** Filter tab instan ("Semua", "Pendidik", "Staf TU") dan pencarian responsif tanpa loading ulang.

3. **Pusat Unduhan (Download Center):**
   * Media unduh blangko dokumen resmi sekolah untuk siswa maupun guru (misalnya: Surat Keterangan Aktif Siswa, Kehilangan Ijazah, Surat Tugas).
   * **Dukungan Beragam Format (.docx, .pdf, .xlsx):** Setiap tipe file didekorasi secara visual dengan ikon dan warna identitas yang selaras (ikon spreadsheet hijau lembut untuk berkas Excel `.xlsx` seperti Formulir Cuti dan SPPD).

4. **Portal Layanan Terpadu:**
   * Pusat integrasi tautan sistem eksternal (RDM Kemenag, Presensi, PTSP, EMIS, dll) yang disajikan dalam bentuk koleksi kartu taktis per kelompok audiens (Siswa, Wali Murid, Guru/Staf).

5. **Panel Admin CMS Modern (Branded Dashboard):**
   * Dasbor administrasi berbasis web yang kokoh, aman, dan mudah digunakan oleh staf sekolah.
   * **White-Label Branding:** Dashboard dihias dengan logo resmi madrasah berwarna emas-hijau mulia menggunakan taktik injeksi stylesheet murni (bukan jalur importMap yang sensitif) untuk jaminan performa stabil.

---

## 🛠️ Tech Stack & Strategi Hosting

* **Frontend:** Next.js 16 (App Router), React 19, TypeScript.
* **Styling:** Tailwind CSS, Lucide Icons, SCSS (untuk integrasi dashboard).
* **Headless CMS & Local API:** Payload CMS v3 (Stable Version) — mengadopsi struktur fullstack Next.js native.
* **Database Utama:** PostgreSQL di-hosting secara aman di **Supabase**.
* **Penyimpanan Gambar/Media:** Supabase Storage melalui endpoint S3-compatible. Disk lokal hanya menjadi fallback pengembangan bila kredensial S3 belum tersedia.

---

## 📂 Struktur Direktori Proyek

Berikut adalah peta struktur folder dan berkas dalam proyek ini:

```text
website_mtsn1acehbaratdaya/
├── public/                            # File statis publik (Logo, Favicon, PDF template)
│   ├── documents/                     # Template dokumen resmi (.docx, .xlsx, .pdf)
│   ├── images/                        # Koleksi gambar statis
│   └── media/                         # Folder penyimpanan berkas media lokal (mode development)
│       
│
├── certs/                             # Sertifikat SSL/TLS (untuk deployment)
│
├── deploy/                            # Konfigurasi deployment & Docker
│   ├── Caddyfile                      # Konfigurasi Caddy reverse proxy
│   ├── compose.yml                    # Docker Compose untuk lingkungan production
│   └── README.md                      # Panduan deployment
│
├── src/
│   ├── payload-types.ts               # Generated types dari Payload CMS
│   ├── payload.config.ts              # Berkas konfigurasi utama Payload CMS v3
│   │
│   ├── app/                           # Struktur Next.js App Router (Next.js 15)
│   │   ├── (public)/                  # Halaman publik pengunjung website (Layout Tradisional)
│   │   │   ├── globals.css            # CSS global untuk halaman publik
│   │   │   ├── layout.tsx             # Layout Publik (Integrasi Navbar, Footer, suppressHydration)
│   │   │   ├── page.tsx               # Landing Page Utama (Homepage)
│   │   │   ├── robots.ts              # Konfigurasi robots.txt
│   │   │   ├── sitemap.ts             # Konfigurasi sitemap.xml
│   │   │   ├── profil/
│   │   │   │   ├── sejarah/page.tsx   # Sejarah berdirinya madrasah sejak 1969
│   │   │   │   ├── visi-misi/page.tsx # Visi, misi, dan pilar komitmen
│   │   │   │   └── staf/
│   │   │   │       ├── page.tsx       # Server Component: Penarikan data staf dari Supabase
│   │   │   │       └── StafClient.tsx # Client Component: Filter, search, dan grid portrait 3:4
│   │   │   ├── kabar/
│   │   │   │   └── berita/
│   │   │   │       ├── BeritaClient.tsx # Client Component: Daftar berita dengan paginasi
│   │   │   │       ├── page.tsx       # Server Component: Pusat Dokumentasi & Berita
│   │   │   │       └── [slug]/
│   │   │   │           └── page.tsx   # Detail halaman berita individual
│   │   │   ├── galeri/
│   │   │   │   ├── GaleriClient.tsx   # Client Component: Grid galeri foto dengan filter
│   │   │   │   └── page.tsx           # Galeri foto kegiatan sekolah
│   │   │   ├── layanan/               # Portal Layanan Terintegrasi
│   │   │   │   ├── LayananClient.tsx  # Client Component: Daftar layanan terpadu
│   │   │   │   ├── page.tsx           # Server Component: Portal layanan utama
│   │   │   │   └── unduh/             # Download Center (DOCX, PDF, XLSX)
│   │   │   │       ├── UnduhClient.tsx # Client Component: Filter & download dokumen
│   │   │   │       └── page.tsx       # Halaman unduhan dokumen resmi
│   │   │   └── kontak/
│   │   │       ├── actions.ts         # Server Actions untuk form kontak
│   │   │       └── page.tsx           # Kontak madrasah (Alamat, Maps Embed, Form Kirim Pesan)
│   │   │
│   │   └── (payload)/                 # Area Sistem Kontrol CMS Admin
│   │       ├── custom-admin.scss      # Custom styling untuk admin panel
│   │       ├── importMap.ts           # Peta komponen kustom Payload
│   │       ├── layout.tsx             # Layout panel kontrol CMS
│   │       ├── admin/
│   │       │   ├── importMap.js       # Peta indeks komponen kustom Payload (legacy)
│   │       │   └── [[...segments]]/
│   │       │       ├── not-found.tsx  # Halaman 404 admin
│   │       │       └── page.tsx       # Dashboard admin CMS
│   │       └── api/
│   │           └── [...slug]/
│   │               └── route.ts       # REST API & GraphQL Endpoint dari Payload
│   │
│   ├── components/                    # Komponen UI Bersama yang Reusable
│   │   ├── CmsLogo.tsx                # Komponen logo kustom untuk panel kontrol
│   │   ├── Navbar.tsx                 # Navigasi sticky responsif maksimal 2 level dropdown
│   │   ├── Footer.tsx                 # Informasi penutup, alamat, dan pranala luar
│   │   └── ui/                        # Shadcn/ui & komponen UI dasar
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── dialog.tsx
│   │       ├── dropdown-menu.tsx
│   │       ├── navigation-menu.tsx
│   │       └── sheet.tsx
│   │
│   ├── lib/                           # Utility functions & helper modules
│   │   ├── contact.test.ts            # Unit tests untuk contact form
│   │   ├── contact.ts                 # Utility functions untuk form kontak
│   │   ├── env.ts                     # Validasi & parsing environment variables
│   │   └── utils.ts                   # General utility functions (classnames, etc)
│   │
│   └── cms/                           # Skema Koleksi Konten Payload CMS
│       ├── collections/               # Definisi koleksi data
│       │   ├── Berita.ts              # Schema artikel, slug generator, cover image
│       │   ├── Dokumen.ts             # Schema arsip dokumen unduhan (.docx, .xlsx)
│       │   ├── Galeri.ts              # Schema dokumentasi foto kegiatan sekolah
│       │   ├── KategoriLayanan.ts     # Schema kategorisasi menu layanan terpadu
│       │   ├── Media.ts               # Schema upload aset gambar ke Supabase Storage
│       │   └── Staf.ts                # Schema nama, nip, jabatan, foto 3:4, urutan
│       └── globals/                   # Konfigurasi global yang dapat diubah via CMS
│           └── ProfilSekolah.ts       # Data profil sekolah (nama, alamat, kontak, dsb)
│
├── components.json                    # Konfigurasi shadcn/ui & component library
├── Dockerfile                         # Container image untuk production deployment
├── eslint.config.mjs                  # Konfigurasi ESLint (linting JavaScript/TypeScript)
├── LICENSE                            # Lisensi proyek (MIT)
├── next-env.d.ts                      # TypeScript declarations untuk Next.js
├── next.config.ts                     # Konfigurasi Next.js (optimasi remotePattern gambar Supabase)
├── package.json                       # Dependensi proyek & shortcut skrip build
├── postcss.config.mjs                 # Konfigurasi PostCSS (untuk Tailwind CSS)
├── README.md                          # File dokumentasi ini
├── tailwind.config.ts                 # Desain sistem Tailwind CSS (warna, font, spacing)
├── tsconfig.json                      # Konfigurasi TypeScript (alias jalur @payload-config)
└── vitest.config.ts                   # Konfigurasi Vitest untuk unit testing
```

---

## ⚙️ Panduan Menjalankan Proyek di Lokal

### 1. Prasyarat Sistem
* Pastikan komputer Anda sudah terinstal **Node.js** (Rekomendasi versi `>= 20.9.0`) dan **npm** / **pnpm**.

### 2. Kloning Proyek
```bash
git clone https://github.com/ifanhakm/website_mtsn1acehbaratdaya.git
cd website_mtsn1acehbaratdaya
```

### 3. Instalasi Dependensi
```bash
npm install
```

### 4. Konfigurasi Variabel Lingkungan (`.env.local`)
Buat berkas bernama **`.env.local`** di root folder dan lengkapi kredensial Supabase Anda:
```env
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
DATABASE_URI=postgresql://postgres.[ID_PROYEK_SUPABASE]:[PASS_DB]@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true
PAYLOAD_SECRET=buat-string-acak-panjang-apa-saja-untuk-pengamanan-token
SCHOOL_EMAIL=website.mtsn1abdya@gmail.com
RESEND_API_KEY=re_xxxxxxxxx
SUPABASE_URL=https://[ID_PROYEK_SUPABASE].supabase.co
SUPABASE_BUCKET_NAME=media
SUPABASE_S3_ENDPOINT=https://[ID_PROYEK_SUPABASE].storage.supabase.co/storage/v1/s3
SUPABASE_S3_REGION=ap-southeast-1
SUPABASE_S3_ACCESS_KEY_ID=your-s3-access-key
SUPABASE_S3_SECRET_ACCESS_KEY=your-s3-secret-key
```

### 5. Menjalankan Server Pengembangan
```bash
npm run dev
```
Buka browser Anda dan akses:
*   🌐 **Website Utama:** `http://localhost:3000`
*   🔑 **Admin Panel CMS:** `http://localhost:3000/admin`

### 6. Pemeriksaan kualitas

```bash
npm run check
npm run build
```

`npm run check` menjalankan ESLint, pemeriksaan tipe TypeScript, dan unit test. Jangan pernah commit file `.env*`; gunakan `.env.example` sebagai template.

---

## ⚡ Penyelesaian Masalah Umum (Troubleshooting)

### 1. Hydration Mismatch Error (Akibat Ekstensi Browser)
Jika Anda melihat log peringatan di konsol browser mengenai perbedaan atribut `has-extension` atau sejenisnya saat memuat halaman, masalah tersebut sudah diantisipasi di proyek ini dengan memasang:
* Atribut `suppressHydrationWarning` pada tag `<html>` layout utama.
* Properti `suppressHydrationWarning: true` di dalam blok `admin` pada file `payload.config.ts` untuk melumpuhkan peringatan di area panel admin.

### 2. Impor Config Payload Tidak Ditemukan (`Module not found`)
Gunakan alias resmi bawaan Payload CMS yaitu **`@payload-config`** (bukan `@/payload.config` dengan garis miring) untuk merujuk file konfigurasi di seluruh komponen halaman Next.js. Hal ini didaftarkan di `tsconfig.json` dan mencegah kegagalan resolusi folder saat proses kompilasi bundler.

---

## 👥 Kontributor & Hak Cipta

* **Developed by:** [Ifan Hakim](https://github.com/ifanhakm) & [Muhammad Mufti Ardani](https://github.com/muftiardani)
* **Hak Cipta:** © 2026 MTsN 1 Aceh Barat Daya. Hak cipta dilindungi undang-undang.
* **Lisensi:** Proyek ini dilisensikan di bawah lisensi MIT untuk kepentingan pendidikan dan pengembangan madrasah.

---
*Dibuat dengan dedikasi penuh untuk kemajuan digitalisasi madrasah wiyata mandala di Bumi Serambi Mekkah.* 🌴🕋
