// Path: src/app/(public)/kabar/galeri/GaleriClient.tsx
"use client"

import React, { useState, useMemo, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Image as ImageIcon, Calendar, Tag, ChevronRight, X, Eye } from 'lucide-react'

export interface GaleriItem {
  id: string
  title: string
  description: string
  category: 'kegiatan' | 'fasilitas' | 'prestasi' | 'keagamaan'
  date: string
  imageUrl?: string | null // Tautan gambar fisik dari Supabase Storage
  aspectRatio: 'aspect-square' | 'aspect-video' | 'aspect-[4/3]'
  imagePlaceholderColor?: string // warna cadangan
}

// =========================================================================
// 1. DATA DUMMY BAWAAN SEKOLAH (FALLBACK - DIKOMENTARI/DI-NONAKTIFKAN)
// 💡 Seluruh data ini sudah dipindahkan ke backup-galeri.md untuk
//    memudahkan Anda melakukan copy-paste di admin panel CMS.
//    Jika Anda ingin mengaktifkan kembali fallback lokal, cukup hapus simbol /* dan */
// =========================================================================
/*
const defaultGaleri: GaleriItem[] = [
  {
    id: "galeri-1",
    title: "Gedung Utama MTsN 1 Aceh Barat Daya",
    description: "Tampak depan gedung utama madrasah yang berlokasi di Jalan Pendidikan No. 56, Desa Pantai Perak, Susoh.",
    category: "fasilitas",
    date: "12 Agustus 2026",
    imagePlaceholderColor: "bg-emerald-800/90",
    aspectRatio: "aspect-video",
  },
  {
    id: "galeri-2",
    title: "Peringatan Hari Lahir Madrasah ke-57",
    description: "Upacara syukur dan tumpengan memperingati kiprah bersejarah madrasah sejak berdiri pertama kali pada tahun 1969.",
    category: "keagamaan",
    date: "24 Juli 2026",
    imagePlaceholderColor: "bg-brand-green/90",
    aspectRatio: "aspect-[4/3]",
  },
  {
    id: "galeri-3",
    title: "Siswa Peraih Juara Lomba Sains Tingkat Kabupaten",
    description: "Penyerahan medali penghargaan kepada siswa berprestasi di bidang sains, meneruskan tradisi prestasi emas nasional.",
    category: "prestasi",
    date: "05 Juni 2026",
    imagePlaceholderColor: "bg-brand-gold/90",
    aspectRatio: "aspect-square",
  },
  {
    id: "galeri-4",
    title: "Kegiatan Praktikum di Laboratorium Komputer",
    description: "Implementasi pilar 'Iptek & Madrasah Digital' melalui kegiatan pembelajaran komputer dan literasi internet bagi siswa.",
    category: "fasilitas",
    date: "20 Mei 2026",
    imagePlaceholderColor: "bg-slate-700/90",
    aspectRatio: "aspect-[4/3]",
  },
  {
    id: "galeri-5",
    title: "Kegiatan Pramuka dan Kemah Bakti Lingkungan",
    description: "Aktivitas kepanduan luar ruangan siswa dalam rangka melatih jiwa kepemimpinan dan rasa peduli terhadap pelestarian alam sekitar.",
    category: "kegiatan",
    date: "14 Mei 2026",
    imagePlaceholderColor: "bg-teal-800/90",
    aspectRatio: "aspect-video",
  },
  {
    id: "galeri-6",
    title: "Pembacaan Yasin Bersama & Shalat Dhuha Berjamaah",
    description: "Rutinitas keagamaan setiap Jumat pagi untuk memperkuat pilar 'Imtaq & Karakter Qur'ani' seluruh civitas akademika.",
    category: "keagamaan",
    date: "30 April 2026",
    imagePlaceholderColor: "bg-emerald-950/95",
    aspectRatio: "aspect-[4/3]",
  },
  {
    id: "galeri-7",
    title: "Aksi Bersih Pantai di Kawasan Wisata Susoh",
    description: "Kontribusi nyata siswa dalam implementasi madrasah berwawasan lingkungan dengan membersihkan sampah plastik di pesisir pantai.",
    category: "kegiatan",
    date: "18 Maret 2026",
    imagePlaceholderColor: "bg-sky-800/90",
    aspectRatio: "aspect-square",
  },
  {
    id: "galeri-8",
    title: "Kunjungan Studi Banding Madrasah Sahabat",
    description: "Pertemuan hangat dan diskusi bertukar inovasi pembelajaran bersama rombongan madrasah dari kabupaten tetangga.",
    category: "kegiatan",
    date: "10 Februari 2026",
    imagePlaceholderColor: "bg-indigo-900/90",
    aspectRatio: "aspect-video",
  },
  {
    id: "galeri-9",
    title: "Piala Bergilir Lomba Kreativitas Seni Islami",
    description: "Prestasi membanggakan tim rebana dan nasyid madrasah yang meraih juara umum dalam festival seni pelajar.",
    category: "prestasi",
    date: "25 Januari 2026",
    imagePlaceholderColor: "bg-amber-600/90",
    aspectRatio: "aspect-[4/3]",
  },
]
*/

// Kategori Filter
const categories = [
  { value: "semua", label: "Semua Foto" },
  { value: "kegiatan", label: "Kegiatan Siswa" },
  { value: "fasilitas", label: "Sarana & Prasarana" },
  { value: "prestasi", label: "Prestasi & Penghargaan" },
  { value: "keagamaan", label: "Keagamaan & Imtaq" },
]

interface GaleriClientProps {
  dbGaleri: GaleriItem[]
}

export default function GaleriClient({ dbGaleri }: GaleriClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("semua")
  const [activeImage, setActiveImage] = useState<GaleriItem | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const triggerRef = useRef<HTMLButtonElement | null>(null)

  const closeImage = () => {
    setActiveImage(null)
    window.setTimeout(() => triggerRef.current?.focus(), 0)
  }

  useEffect(() => {
    if (!activeImage) return

    closeButtonRef.current?.focus()
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeImage()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeImage])

  const openImage = (item: GaleriItem, trigger: HTMLButtonElement) => {
    triggerRef.current = trigger
    setActiveImage(item)
  }

  // 2. GABUNGKAN DATA DATABASE DENGAN DEFAULT (MURNI CMS JIKA DEFAULT DI-NONAKTIFKAN)
  const finalGaleri = useMemo(() => {
    return dbGaleri || []
  }, [dbGaleri])

  // Menyaring Data Berdasarkan Kategori yang Dipilih
  const filteredGaleri = useMemo(() => {
    return selectedCategory === "semua"
      ? finalGaleri
      : finalGaleri.filter((item) => item.category === selectedCategory)
  }, [finalGaleri, selectedCategory])

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'kegiatan': return 'Kegiatan Siswa'
      case 'fasilitas': return 'Sarana & Prasarana'
      case 'prestasi': return 'Prestasi'
      case 'keagamaan': return 'Keagamaan / Imtaq'
      default: return 'Dokumentasi'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20">
      {/* 1. HERO HEADER */}
      <div className="relative overflow-hidden bg-brand-green py-20 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(209,187,7,0.15),transparent_45%)]" />
        <div className="absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-white/5 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/70 mb-4">
            <Link href="/" className="hover:text-brand-gold transition-colors">
              Beranda
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-brand-gold">Kabar</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white">Galeri</span>
          </nav>

          {/* Judul */}
          <div className="max-w-3xl">
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
              Galeri Kegiatan & <br />
              <span className="text-brand-gold">Dokumentasi Madrasah</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-gray-200 leading-relaxed font-medium">
              Jelajahi potret aktivitas pembelajaran, ketersediaan facilities penunjang, rutinitas ibadah harian, serta dokumentasi momen-momen bersejarah di MTsN 1 Aceh Barat Daya.
            </p>
          </div>
        </div>
      </div>

      {/* 2. FILTER KATEGORI */}
      <div className="border-b border-gray-100 bg-white sticky top-16 z-20 shadow-xs">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`rounded-full px-5 py-2.5 text-xs font-extrabold transition-all duration-300 ${
                  selectedCategory === cat.value
                    ? "bg-brand-green text-white shadow-md shadow-brand-green/10"
                    : "bg-gray-100 text-gray-500 hover:bg-gray-200/70 hover:text-gray-800"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="text-xs text-gray-400 font-bold uppercase tracking-wider">
            Menampilkan <span className="text-brand-green">{filteredGaleri.length}</span> Dokumentasi
          </div>
        </div>
      </div>

      {/* 3. GRID GALERI (PRINSIP GENEROUS WHITESPACE) */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {filteredGaleri.length > 0 ? (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {filteredGaleri.map((item) => (
              <button
                type="button"
                key={item.id}
                onClick={(event) => openImage(item, event.currentTarget)}
                className="break-inside-avoid relative overflow-hidden rounded-2xl bg-white border border-gray-100 p-3 shadow-sm hover:shadow-xl hover:border-brand-green/20 group cursor-pointer transition-all duration-300 w-full text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-green"
                aria-haspopup="dialog"
              >
                {/* Visual Kontainer Gambar (Masonry Style / Adaptive Aspect Ratio) */}
                <div className={`relative w-full rounded-xl overflow-hidden ${item.aspectRatio} ${item.imageUrl ? 'bg-gray-100' : (item.imagePlaceholderColor || 'bg-brand-green')} flex flex-col items-center justify-center text-white`}>
                  
                  {item.imageUrl ? (
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    // Fallback Banner Visual karena File Gambar Kosong (Local Demo)
                    <div className="flex flex-col items-center justify-center text-center p-6">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-brand-gold mb-3 border border-brand-gold/20">
                        <ImageIcon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-brand-gold">
                        MTsN 1 Abdya
                      </span>
                    </div>
                  )}

                  {/* Efek Gradasi Bayangan saat Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md border border-white/30 transform scale-75 group-hover:scale-100 transition-all duration-300">
                      <Eye className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Deskripsi Teks di Bawah Gambar */}
                <div className="mt-4 px-1 pb-1">
                  <div className="flex items-center gap-2.5 text-[10px] font-extrabold uppercase tracking-wider text-brand-gold mb-2">
                    <span className="bg-brand-gold/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Tag className="w-2.5 h-2.5" />
                      {getCategoryLabel(item.category)}
                    </span>
                    <span className="text-gray-400 flex items-center gap-1">
                      <Calendar className="w-2.5 h-2.5" />
                      {item.date}
                    </span>
                  </div>
                  <h3 className="font-extrabold text-gray-800 leading-snug group-hover:text-brand-green transition-colors duration-300 text-sm sm:text-base">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-xs text-gray-500 leading-relaxed font-semibold line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center justify-center p-8">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-50 text-gray-400 mb-4 border border-gray-100">
              <ImageIcon className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-700 text-lg">Tidak ada dokumentasi</h3>
            <p className="text-sm text-gray-400 mt-1 max-w-sm font-semibold">
              Dokumentasi untuk kategori ini belum tersedia atau sedang dalam proses pemeliharaan kurasi.
            </p>
          </div>
        )}
      </div>

      {/* 4. LIGHTBOX MODAL (MODAL INTERAKTIF OVERLAY) */}
      {activeImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 animate-fade-in backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          aria-labelledby="gallery-dialog-title"
        >
          {/* Tombol Tutup Layar Penuh */}
          <button
            ref={closeButtonRef}
            onClick={closeImage}
            className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-all border border-white/10 z-50"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="relative max-w-3xl w-full bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-white/5 flex flex-col">
            {/* Sisi Atas: Wadah Visual Gambar */}
            <div className={`relative w-full ${activeImage.imageUrl ? 'bg-gray-100' : (activeImage.imagePlaceholderColor || 'bg-brand-green')} flex flex-col items-center justify-center p-16 aspect-video text-white`}>
              {activeImage.imageUrl ? (
                <Image
                  src={activeImage.imageUrl}
                  alt={activeImage.title}
                  fill
                  className="object-contain"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-brand-gold mb-4 border border-brand-gold/20">
                    <ImageIcon className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-extrabold uppercase tracking-widest text-brand-gold">
                    Foto Dokumentasi Fisik Sekolah
                  </h4>
                  <p className="text-xs text-white/60 mt-1 max-w-xs font-semibold">
                    MTsN 1 Aceh Barat Daya
                  </p>
                </div>
              )}
            </div>

            {/* Sisi Bawah: Keterangan Detail */}
            <div className="bg-white p-6 sm:p-8">
              <div className="flex items-center gap-3 text-xs font-extrabold uppercase tracking-wider text-brand-gold mb-3">
                <span className="bg-brand-gold/10 px-3 py-1 rounded-full flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5" />
                  {getCategoryLabel(activeImage.category)}
                </span>
                <span className="text-gray-400 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {activeImage.date}
                </span>
              </div>
              <h3 id="gallery-dialog-title" className="text-xl font-extrabold text-gray-800 leading-snug mb-3">
                {activeImage.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed font-semibold">
                {activeImage.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
