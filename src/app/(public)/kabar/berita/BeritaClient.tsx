// Path: src/app/(public)/kabar/berita/BeritaClient.tsx
"use client"

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronRight, Search, Calendar, User, Tag, Clock, ArrowRight, Newspaper } from 'lucide-react'

// 1. Definisikan Struktur Media Upload dari Payload
export interface Media {
  id: string
  url: string
  alt?: string
}

// 2. Definisikan Struktur Author (User) dari Payload
export interface Author {
  id: string
  email: string
  name?: string
}

// 3. Definisikan Struktur Post Berita Sesuai Skema Berita.ts
export interface Post {
  id: string
  slug: string
  title: string
  excerpt: string
  date: string
  category: 'Akademik' | 'Kesiswaan' | 'Pengumuman' | 'Prestasi'
  readTime: string
  image: string | Media // Bisa berupa ID string atau objek Media utuh
  author: string | Author // Bisa berupa ID string atau objek Author utuh
  isFeatured?: boolean
}

interface BeritaClientProps {
  beritaData: Post[]
}

export default function BeritaClient({ beritaData }: BeritaClientProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua')

  const categories = ['Semua', 'Akademik', 'Kesiswaan', 'Pengumuman', 'Prestasi']

  // Fungsi Pembantu: Format Tanggal ke Bahasa Indonesia (misal: "26 Agustus 2026")
  const formatTanggalIndo = (dateStr: string) => {
    try {
      const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(dateStr).toLocaleDateString('id-ID', options)
    } catch {
      return dateStr
    }
  }

  // Fungsi Pembantu: Mengambil URL Gambar dari Payload Media
  const getImageUrl = (imageField: string | Media): string => {
    if (!imageField) return '/logo.jpg' // Fallback ke logo jika tidak ada gambar
    if (typeof imageField === 'object' && imageField.url) {
      return imageField.url
    }
    return '/logo.jpg'
  }

  // Fungsi Pembantu: Mengambil Nama Penulis dari Payload Users
  const getAuthorName = (authorField: string | Author): string => {
    if (!authorField) return 'Humas'
    if (typeof authorField === 'object') {
      return authorField.name || authorField.email.split('@')[0]
    }
    return 'Humas'
  }

  // LOGIKA FILTER & PENCARIAN BERITA
  const filteredBerita = useMemo(() => {
    return beritaData.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesCategory = selectedCategory === 'Semua' || item.category === selectedCategory
      
      return matchesSearch && matchesCategory
    })
  }, [beritaData, searchQuery, selectedCategory])

  // Cari Berita Utama (Featured) — Hanya muncul jika tidak sedang melakukan pencarian/filter
  const featuredBerita = useMemo(() => {
    if (searchQuery !== '' || selectedCategory !== 'Semua') return null
    return beritaData.find((b) => b.isFeatured) || null
  }, [beritaData, searchQuery, selectedCategory])

  // Daftar berita di grid (kecualikan berita utama agar tidak duplikat)
  const gridBerita = useMemo(() => {
    if (featuredBerita) {
      return filteredBerita.filter((b) => b.id !== featuredBerita.id)
    }
    return filteredBerita
  }, [filteredBerita, featuredBerita])

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* 1. HERO SECTION & BREADCRUMB */}
      <div className="relative overflow-hidden bg-brand-green py-20 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(209,187,7,0.15),transparent_45%)]" />
        <div className="absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-white/5 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/70 mb-4">
            <Link href="/" className="hover:text-brand-gold transition-colors">Beranda</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-brand-gold">Kabar</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white">Berita & Kegiatan</span>
          </nav>

          <div className="max-w-3xl">
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
              Berita & <span className="text-brand-gold">Kegiatan</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-gray-200 leading-relaxed font-medium">
              Ikuti terus informasi terhangat seputar prestasi siswa, perkembangan akademis, agenda penting, serta aktivitas dinamis keluarga besar MTsN 1 Aceh Barat Daya.
            </p>
          </div>
        </div>
      </div>

      {/* 2. FILTER & SEARCH CONTROL BAR */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          {/* Kategori */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs font-extrabold rounded-full transition-all duration-300 ${
                  selectedCategory === cat
                    ? 'bg-brand-green text-white shadow-md shadow-brand-green/10'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Kolom Pencarian */}
          <div className="relative w-full lg:max-w-xs">
            <input
              type="text"
              placeholder="Cari berita atau kegiatan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-gray-200 bg-gray-50 py-2.5 pl-11 pr-4 text-sm font-semibold text-gray-700 outline-none transition-all placeholder:text-gray-400 focus:border-brand-green focus:bg-white focus:ring-3 focus:ring-brand-green/10"
            />
            <Search className="absolute left-4 top-3 h-4 w-4 text-gray-400" />
          </div>
        </div>
      </div>

      {/* 3. BANNER BERITA UTAMA (FEATURED) */}
      {featuredBerita && (
        <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
          <h2 className="text-xs font-extrabold text-brand-green uppercase tracking-wider mb-6 flex items-center gap-2">
            <Newspaper className="w-4 h-4 text-brand-gold" />
            <span>Berita Utama Terkini</span>
          </h2>
          <div className="group relative overflow-hidden rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 lg:grid lg:grid-cols-12">
            <div className="relative h-64 sm:h-80 lg:h-full lg:col-span-6 overflow-hidden bg-brand-green/5 flex items-center justify-center">
              <Image
                src={getImageUrl(featuredBerita.image)}
                alt={featuredBerita.title}
                width={600}
                height={400}
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4 bg-brand-gold text-brand-green text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                {featuredBerita.category}
              </div>
            </div>

            <div className="p-8 sm:p-10 lg:col-span-6 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-gray-400 mb-4">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-brand-green" />
                    {formatTanggalIndo(featuredBerita.date)}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-brand-green" />
                    {getAuthorName(featuredBerita.author)}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-brand-green" />
                    {featuredBerita.readTime}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-extrabold text-gray-800 leading-tight mb-4 group-hover:text-brand-green transition-colors">
                  {featuredBerita.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed font-medium mb-6">
                  {featuredBerita.excerpt}
                </p>
              </div>

              <Link
                href={`/kabar/berita/${featuredBerita.slug}`}
                className="inline-flex items-center gap-2 text-sm font-extrabold text-brand-green hover:text-brand-gold transition-colors w-fit group/btn"
              >
                <span>Baca Selengkapnya</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* 4. GRID ARSIP BERITA */}
      <div className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <h2 className="text-xs font-extrabold text-brand-green uppercase tracking-wider mb-6 flex items-center gap-2">
          <Newspaper className="w-4 h-4 text-brand-gold" />
          <span>
            {searchQuery || selectedCategory !== 'Semua'
              ? `Hasil Filter (${filteredBerita.length})`
              : 'Arsip Kabar & Berita'}
          </span>
        </h2>

        {filteredBerita.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
            <Newspaper className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-800 mb-2">Berita Tidak Ditemukan</h3>
            <p className="text-sm text-gray-400 font-semibold max-w-md mx-auto">
              Maaf, kami tidak menemukan berita dengan kata kunci "{searchQuery}". Silakan coba kata kunci lainnya.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {gridBerita.map((item) => (
              <article
                key={item.id}
                className="group flex flex-col justify-between overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-brand-green/10 transition-all duration-300"
              >
                <div className="relative h-48 w-full overflow-hidden bg-brand-green/5">
                  <Image
                    src={getImageUrl(item.image)}
                    alt={item.title}
                    width={400}
                    height={250}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-brand-green text-white text-[9px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
                    {item.category}
                  </div>
                </div>

                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-3 text-[11px] font-bold text-gray-400 mb-3.5">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-brand-green" />
                        {formatTanggalIndo(item.date)}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-brand-green" />
                        {item.readTime}
                      </span>
                    </div>

                    <h3 className="text-md font-extrabold text-gray-800 leading-snug mb-2.5 line-clamp-2 group-hover:text-brand-green transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed font-semibold line-clamp-3 mb-4">
                      {item.excerpt}
                    </p>
                  </div>

                  <Link
                    href={`/kabar/berita/${item.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-extrabold text-brand-green hover:text-brand-gold transition-colors group/btn-grid mt-2 w-fit"
                  >
                    <span>Baca Berita</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn-grid:translate-x-1" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}