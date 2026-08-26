# Website Resmi MTsN 1 Aceh Barat Daya 🏫✨

> **Referensi Pengembangan:** [MTs Negeri 5 Sleman](https://mtsn5sleman.sch.id/) — Versi lebih bersih (*clean*), modern, cepat, dan berkinerja tinggi (*high performance*).

Repository ini berisi kode sumber (*source code*) untuk **Website Resmi Madrasah Tsanawiyah Negeri (MTsN) 1 Aceh Barat Daya**, sebuah institusi pendidikan Islam unggul yang beralamat di Jl. Pendidikan No. 56, Desa Pantai Perak, Kecamatan Susoh, Kabupaten Aceh Barat Daya, Provinsi Aceh. 

Proyek ini dibangun menggunakan **Next.js 15 (App Router)** dan **Payload CMS 3.x** sebagai sistem manajemen konten terpadu yang menyederhanakan arsitektur web sekolah lama menjadi solusi *headless* modern yang sepenuhnya *serverless-ish*.

---

## 🚀 Fitur Utama & Penyempurnaan dari Referensi

Situs referensi (MTsN 5 Sleman) disempurnakan secara radikal dengan prinsip-prinsip berikut:
1. **Navigasi Maksimal 2 Level:** Mengeliminasi mega-menu bersarang hingga 4 level yang membingungkan pengguna mobile. Seluruh tautan dinavigasikan secara ringkas.
2. **Portal Layanan Terpadu (Card-Based):** Mengelompokkan semua tautan sistem eksternal (Google Classroom, RDM, Absensi GPS, EMIS, Pusaka Kemenag, dll.) ke dalam satu halaman interaktif berbasis kartu (*card layout*) yang terbagi berdasarkan audiens (**Siswa/Orang Tua** dan **Guru/Staf**).
3. **Download Center Administrasi Mandiri:** Memfasilitasi siswa, alumni, dan staf dengan template dokumen administrasi siap unduh (.docx) seperti:
   * *Layanan Siswa/Alumni:* Surat Keterangan Aktif Siswa, Surat Keterangan SKHUN, Surat Keterangan Pengganti Ijazah, Surat Kuasa, Surat Pernyataan Saksi, dsb.
   * *Layanan Guru/Staf:* Surat Pernyataan Kinerja (SPK) TPG, SPTJM TPG, Surat Tugas, dan Surat Keterangan Basen Error.
4. **Desain Visual "Generous Whitespace":** Layout modern menggunakan **Tailwind CSS + shadcn/ui** dengan sistem spasi konsisten (8pt grid), tipografi kontras (Plus Jakarta Sans/Poppins untuk Heading, Inter untuk Body), serta transisi mikro-interaksi yang halus.
5. **Performa Superior:** Menggunakan optimasi gambar Next.js (`next/image`), Server-Side Rendering (SSR), dan static caching untuk mencapai skor Lighthouse $\ge 90$ pada metrik performa dan SEO.

---

## 🛠️ Tech Stack (Teknologi yang Digunakan)

Sesuai cetak biru teknis, arsitektur website ini dirancang tanpa memerlukan VPS mentah agar meminimalkan perawatan server (*low maintenance*):

| Layer | Teknologi | Alasan Pemilihan |
| :--- | :--- | :--- |
| **Frontend Framework** | **Next.js 15 (App Router) & TypeScript** | SEO-friendly, transisi instan, dan performa tinggi melalui SSR/SSG. |
| **Styling & UI Library** | **Tailwind CSS + shadcn/ui** | Mempercepat pembuatan UI yang konsisten, bersih, dan mudah disesuaikan. |
| **CMS & Admin Panel** | **Payload CMS 3.x** | *Headless CMS* berbasis Node.js yang *type-safe*, terintegrasi mulus dalam Next.js App Router, dan menyediakan GUI Admin yang intuitif mirip WordPress. |
| **Database** | **PostgreSQL (Managed)** | Stabil dan didukung secara native oleh Payload/Prisma ORM. |
| **Infrastructure (Hosting)**| **Vercel** (Frontend) + **Neon / Supabase** (Database) + **Railway / Render** (CMS/Backend) | Pendekatan *serverless* terkelola; mengeliminasi kebutuhan mengelola SSH, OS patches, SSL manual, atau *Docker maintenance*. |
| **Form & Email Service** | **Resend / Nodemailer** | Mengamankan pengiriman email dari formulir kontak. |
| **Analytics** | **Google Analytics 4 & Search Console** | Standar pelacakan lalu lintas dan kesehatan SEO situs instansi pemerintah. |

---

## 📂 Struktur Folder Proyek (Next.js 15 App Router)

Proyek ini menggunakan struktur folder monorepo di mana Payload CMS tertanam secara *native* di dalam Next.js App Router:

```text
website_mtsn1acehbaratdaya/
├── app/                            # Direktori Utama Next.js App Router
│   ├── (public)/                   # Rute Publik (Akses Tanpa Login)
│   │   ├── page.tsx                # Beranda (Hero, Statistik, Berita Utama)
│   │   ├── profil/
│   │   │   ├── sejarah/            # Halaman Sejarah Sekolah (Tua, Unggul & Inovatif)
│   │   │   ├── visi-misi/          # Visi-Misi Sekolah (Imtaq, Iptek, Wiyata Mandala)
│   │   │   └── staf/               # Direktori Interaktif Pendidik & Kependidikan
│   │   ├── berita/
│   │   │   ├── page.tsx            # Index Berita (dengan Search & Filter Kategori)
│   │   │   └── [slug]/             # Detail Berita Dinamis (dengan RichTextRenderer)
│   │   ├── layanan/                # Portal Layanan Terpadu (Card-Based)
│   │   └── kontak/                 # Halaman Hubungi Kami (Map Embed & Form Kontak)
│   │
│   ├── (cms)/                      # Bagian Admin Panel CMS (Payload 3.x)
│   │   └── admin/                  # Endpoint /admin untuk Pengelolaan Konten
│   │
│   ├── api/                        # Rute API Backend
│   │   └── graphql/                # Endpoint GraphQL (opsional, bawaan Payload)
│   │
│   ├── layout.tsx                  # Global Layout (Navbar, Footer, Toast Provider)
│   └── globals.css                 # Import Tailwind CSS & Design Token Warna Kemenag
│
├── components/                     # Komponen UI Modular & Reusable
│   ├── ui/                         # Primitif Komponen shadcn/ui (Button, Card, Input, dll.)
│   ├── layout/                     # Komponen Tata Letak (Navbar, Footer, MobileMenu)
│   ├── home/                       # Komponen Khusus Beranda (HeroSection, Stats, NewsGrid)
│   └── shared/                     # Komponen Bersama (Breadcrumb, SectionHeading, DocDownloader)
│
├── cms/                            # Konfigurasi & Skema Payload CMS
│   ├── collections/                # Koleksi Konten Dinamis (Database Tables)
│   │   ├── Posts.ts                # Skema Koleksi Berita
│   │   ├── Categories.ts           # Skema Kategori Berita
│   │   ├── StaffMembers.ts         # Skema Tenaga Pendidik & Kependidikan
│   │   ├── Facilities.ts           # Skema Sarana & Prasarana
│   │   └── ServiceLinks.ts         # Skema Kartu Tautan Portal Layanan & Unduhan Dokumen
│   │
│   ├── globals/                    # Pengaturan Global Situs (Singletons)
│   │   └── SiteSettings.ts         # Kontak Global, Logo, Sosmed, Tahun Pelajaran
│   │
│   └── payload.config.ts           # Berkas Konfigurasi Utama Payload CMS
│
├── public/                         # Aset Statis yang Dapat Diakses Publik
│   ├── logo-mtsn.svg               # Logo Resmi MTsN 1 Aceh Barat Daya
│   ├── icons/                      # Ikon untuk Kartu Portal Layanan
│   └── placeholders/               # Gambar Cadangan (*Fallback*)
│
├── lib/                            # Kode Utilitas dan Integrasi
│   ├── db.ts                       # Inisialisasi Koneksi Database
│   ├── utils.ts                    # Utilitas CN (Tailwind Merge)
│   └── resend.ts                   # Konfigurasi Pengiriman Email
│
├── styles/                         # Pengaturan Desain Sistem Tambahan
├── types/                          # Deklarasi Tipe TypeScript Global
│
├── .env.example                    # Template Variabel Lingkungan
├── tailwind.config.ts              # Konfigurasi Tema (Warna Hijau Madrasah, Font Poppins)
├── tsconfig.json                   # Konfigurasi TypeScript
├── package.json                    # Daftar Dependensi Proyek
└── README.md                       # Dokumentasi Proyek Ini
```

---

## 🗄️ Model Data (Skema Koleksi CMS)

Sesuai dengan rancangan data di CMS, skema diatur secara modular dan terintegrasi:

### 1. `Post` (Berita / Kegiatan Sekolah)
* **Field:**
  * `title` (Text) - Judul berita.
  * `slug` (Text, Auto-generated) - URL ramah SEO.
  * `coverImage` (Media) - Gambar utama berita.
  * `excerpt` (Text) - Ringkasan singkat berita.
  * `content` (Rich Text) - Konten utama tulisan.
  * `category` (Relation $\rightarrow$ `Category`) - Kategori berita.
  * `publishedAt` (Date) - Tanggal rilis.
  * `author` (Text) - Penulis berita (Staf Humas).
  * `status` (Select: `draft` / `published`) - Alur publikasi konten.

### 2. `StaffMember` (Direktori Pendidik & Staf Kependidikan)
* **Field:**
  * `name` (Text) - Nama lengkap beserta gelar.
  * `photo` (Media) - Foto profil resmi.
  * `role` (Text) - Jabatan (misal: Kepala Madrasah, Guru Mapel Matematika, Staf TU).
  * `subject` (Text, Optional) - Mata pelajaran yang diampu.
  * `type` (Select: `pendidik` / `kependidikan`) - Pengelompokan kategori staf.

### 3. `ServiceLink` (Portal Layanan Terpadu & Download Center)
* **Field:**
  * `title` (Text) - Nama Layanan atau Berkas (misal: "Rapor Digital Madrasah (RDM)" atau "Formulir Surat Keterangan Aktif").
  * `url` (URL / File Upload) - Tautan ke aplikasi eksternal atau file unduhan `.docx`.
  * `description` (Text) - Deskripsi singkat fungsi layanan/dokumen.
  * `audience` (Select: `siswa` / `orang-tua` / `guru` / `staf` / `alumni`) - Segmentasi hak akses tampilan.
  * `icon` (Select/Text) - Ikon visual representatif.

---

## 🔒 Manajemen Akses (Hak Akses Pengguna)

Sistem login panel admin mengimplementasikan 2 Role utama:
* **Super Admin (Developer):** Hak akses penuh ke seluruh pengaturan sistem, pengelolaan user lain, struktur database, dan integrasi API.
* **Admin Konten (Humas/TU Sekolah):** Hak akses harian untuk menambah, mengubah, dan menghapus Berita, data Staf, Sarana Prasarana, serta file unduhan dokumen di Portal Layanan.

---

## 💻 Langkah Instalasi Lokal (Development)

1. **Clone repository:**
   ```bash
   git clone https://github.com/username/website_mtsn1acehbaratdaya.git
   cd website_mtsn1acehbaratdaya
   ```

2. **Instal dependensi:**
   ```bash
   npm install
   ```

3. **Konfigurasi Environment Variables:**
   Salin file `.env.example` menjadi `.env.local` dan lengkapi variabel berikut:
   ```env
   DATABASE_URI=postgresql://user:password@localhost:5432/mtsn_db
   PAYLOAD_SECRET=your-super-secret-payload-key
   NEXT_PUBLIC_SERVER_URL=http://localhost:3000
   RESEND_API_KEY=re_your_api_key
   ```

4. **Jalankan server pengembangan:**
   ```bash
   npm run dev
   ```
   Buka [http://localhost:3000](http://localhost:3000) di browser Anda untuk melihat situs web, dan [http://localhost:3000/admin](http://localhost:3000/admin) untuk masuk ke panel administrasi Payload CMS.

---

## 📋 Lisensi & Kontributor

* **Klien:** MTsN 1 Aceh Barat Daya
* **Hak Cipta:** © 2026 MTsN 1 Aceh Barat Daya. Hak Cipta Dilindungi Undang-Undang.
* **Pengembang:** Kolaborasi Kreatif bersama *Gemini Notebook Agent*.
