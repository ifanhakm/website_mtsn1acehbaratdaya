import React from 'react'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@/payload.config'

export const revalidate = 300
import { 
  ArrowRight, 
  BookOpen, 
  Users, 
  Award, 
  GraduationCap, 
  Calendar, 
  Heart, 
  Cpu, 
  Leaf,
  ExternalLink
} from 'lucide-react'

interface MediaValue {
  url?: string | null
  alt?: string | null
}

interface HomeNews {
  id: string | number
  title: string
  slug: string
  excerpt: string
  date: string
  category: string
  readTime: string
  image: string | number | MediaValue
}

// Fungsi Pembantu: Format Tanggal ke Bahasa Indonesia
const formatTanggalIndo = (dateStr: string) => {
  try {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateStr).toLocaleDateString('id-ID', options)
  } catch {
    return dateStr
  }
}

// Fungsi Pembantu: Mengambil URL Gambar dari Payload Media
const getImageUrl = (imageField: HomeNews['image'] | null | undefined): string => {
  if (!imageField) return '/logo.jpg' // Fallback ke logo jika tidak ada gambar
  if (typeof imageField === 'object' && imageField.url) {
    return imageField.url
  }
  return '/logo.jpg'
}

export default async function HomePage() {
  let latestNews: HomeNews[] = []

  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'berita',
      where: {
        status: {
          equals: 'published',
        },
      },
      sort: '-date',
      limit: 3,
      depth: 1,
    })

    latestNews = result.docs.flatMap((news) =>
      news.slug
        ? [{ id: news.id, title: news.title, slug: news.slug, excerpt: news.excerpt, date: news.date, category: news.category, readTime: news.readTime, image: news.image }]
        : [],
    )
  } catch (error) {
    console.error('Berita beranda tidak dapat dimuat', error instanceof Error ? error.message : 'unknown')
  }

  // Statistik Sekolah (Statis)
  const stats = [
    { id: 1, value: "520+", label: "Siswa Aktif", icon: Users },
    { id: 2, value: "45+", label: "Guru & Tenaga Pendidik", icon: GraduationCap },
    { id: 3, value: "18", label: "Rombongan Belajar", icon: BookOpen },
    { id: 4, value: "A (Unggul)", label: "Akreditasi Ban-SM", icon: Award },
  ]

  const kepsekFotoUrl = "/media/kepsek-1024x1536.jpg";

  return (
    <div className="flex flex-col min-h-screen bg-white">
      
      {/* =========================================================================
          1. HERO SECTION
          ========================================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-green/5 via-white to-white py-20 lg:py-32">
        {/* Dekorasi Background */}
        <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-brand-green/5 to-transparent rounded-l-full -z-10 hidden lg:block" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Sisi Kiri: Teks Hero */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-brand-gold/10 text-brand-gold-dark border border-brand-gold/20">
                Madrasah Inovasi Provinsi Aceh
              </span>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight leading-tight">
                Membangun Generasi <br />
                <span className="text-brand-green">Unggul, Berkarakter & Inovatif</span>
              </h1>
              
              <p className="text-lg text-gray-600 max-w-2xl mx-auto lg:mx-0">
                Selamat Datang di Website Resmi <strong>MTsN 1 Aceh Barat Daya</strong>. Lembaga pendidikan Islam tertua di Abdya yang berkomitmen memadukan kekuatan spiritualitas, keilmuan modern, dan kesadaran lingkungan.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
                <Link 
                  href="/layanan" 
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-brand-green hover:bg-brand-green-light text-white font-medium transition-all duration-200 shadow-lg shadow-brand-green/20 group gap-2"
                >
                  Portal Layanan
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  href="/profil/sejarah" 
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white border border-gray-200 hover:border-brand-green hover:text-brand-green text-gray-700 font-medium transition-all duration-200 gap-2"
                >
                  Jelajahi Sejarah
                </Link>
              </div>
            </div>

            {/* Sisi Kanan: Foto/Visual */}
            <div className="lg:col-span-5 relative mt-8 lg:mt-0">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="absolute -inset-1.5 bg-gradient-to-tr from-brand-gold to-brand-green rounded-2xl blur opacity-30 -z-10" />
                <div className="relative aspect-4/3 overflow-hidden rounded-2xl bg-gray-100 border border-gray-100 shadow-2xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src="fotogedung.png" 
                    alt="Gedung MTsN 1 Aceh Barat Daya" 
                    className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-500"
                  />
                </div>
                {/* Lencana Floating */}
                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl border border-gray-50 flex items-center gap-3 hidden sm:flex">
                  <div className="p-3 bg-brand-green/10 rounded-lg text-brand-green">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Juara II Nasional</p>
                    <p className="text-sm font-bold text-gray-900">Lomba Prestasi Madrasah</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          2. SEKSI STATISTIK (GENEROUS WHITESPACE)
          ========================================================================= */}
      <section className="py-12 border-y border-gray-100 bg-gray-50/50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {stats.map((item) => {
              const IconComponent = item.icon;
              return (
                <div key={item.id} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col items-center text-center space-y-2 hover:shadow-md transition-shadow">
                  <div className="p-3 bg-brand-green/5 rounded-full text-brand-green">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <span className="text-2xl sm:text-3xl font-extrabold text-gray-950 tracking-tight">
                    {item.value}
                  </span>
                  <span className="text-xs sm:text-sm font-medium text-gray-500">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. SAMBUTAN KEPALA MADRASAH
          ========================================================================= */}
      <section className="py-16 md:py-20 bg-white">
        {/* 1. max-w-5xl + mx-auto: Mengunci seluruh grup agar selalu presisi di tengah halaman */}
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          
          {/* 2. md:grid-cols-12: Memaksa layout berdampingan sejak layar ukuran tablet (md) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
            
            {/* Foto Kepala Sekolah (Menduduki 5 Kolom, merapat manis ke arah tengah) */}
            <div className="md:col-span-5 flex justify-center md:justify-end">
              <div className="relative w-full max-w-[260px] sm:max-w-xs">
                <div className="absolute -inset-1 bg-brand-green/20 rounded-2xl -rotate-3 transform -z-10" />
                <div className="aspect-[3/4] overflow-hidden rounded-2xl border-4 border-white shadow-xl bg-gray-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={kepsekFotoUrl} 
                    alt="Kepala Madrasah MTsN 1 Abdya" 
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-xl border border-gray-100 text-center">
                  <p className="text-sm font-bold text-gray-900">Zulkifli, S.Pd.</p>
                  <p className="text-xs text-brand-green font-medium">Kepala Madrasah</p>
                </div>
              </div>
            </div>

            {/* Isi Sambutan (Menduduki 7 Kolom, berdampingan rapi sejak layar tablet) */}
            <div className="md:col-span-7 space-y-5 text-left flex flex-col justify-center">
              <div>
                <span className="inline-flex text-xs font-bold tracking-wider text-brand-green uppercase bg-brand-green/5 px-3 py-1 rounded-full">
                  Kata Sambutan
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mt-3">
                  Membuka Gerbang Informasi Madrasah Era Digital
                </h2>
              </div>
              
              <div className="text-gray-600 space-y-3.5 leading-relaxed text-sm sm:text-base font-semibold">
                <p>
                  Assalamu’alaikum Warahmatullahi Wabarakatuh.
                </p>
                <p>
                  Segala puji bagi Allah SWT, yang telah memberikan kita kekuatan untuk terus berinovasi dalam mengabdi di dunia pendidikan Islam. Selamat datang di portal resmi <strong>MTsN 1 Aceh Barat Daya</strong>. Website ini dirancang sebagai media informasi transparan, interaktif, dan modern bagi seluruh siswa, wali murid, alumni, dan publik.
                </p>
                <p>
                  Sebagai salah satu <strong>Madrasah Inovasi</strong> di Provinsi Aceh, kami percaya bahwa pendidikan unggul harus menyatukan nilai-nilai keagamaan (Imtaq) dengan penguasaan teknologi informasi (Iptek). Semoga portal ini memberikan manfaat maksimal untuk kita semua.
                </p>
                <p>
                  Wassalamu’alaikum Warahmatullahi Wabarakatuh.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          4. PILAR UTAMA MADRASAH (VISI HIGHLIGHT)
          ========================================================================= */}
      <section className="py-20 bg-gray-50/50 border-y border-gray-100">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-sm font-bold tracking-wider text-brand-green uppercase">
              Visi & Komitmen
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
              Pilar Karakter Unggulan Kami
            </h2>
            <p className="text-gray-500">
              Mewujudkan generasi islami, berakhlakul karimah, cerdas secara teknologi, dan peduli terhadap kelestarian alam sekitar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Pilar 1: Imtaq */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 group">
              <div className="w-12 h-12 bg-brand-green/10 rounded-xl text-brand-green flex items-center justify-center mb-6 group-hover:bg-brand-green group-hover:text-white transition-colors duration-300">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-950 mb-3">Imtaq & Karakter Islami</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                Menyelenggarakan kegiatan keagamaan intensif, pembiasaan akhlak mulia, perbaikan bacaan Quran, dan hafalan juz amma (Tahfidz) harian untuk membentuk pribadi qur&apos;ani.
              </p>
            </div>

            {/* Pilar 2: Iptek */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 group">
              <div className="w-12 h-12 bg-brand-gold/10 rounded-xl text-brand-gold-dark flex items-center justify-center mb-6 group-hover:bg-brand-gold group-hover:text-white transition-colors duration-300">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-950 mb-3">Iptek & Madrasah Digital</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                Mendorong literasi teknologi informasi siswa melalui program pembelajaran berbasis digital terintegrasi, serta menyediakan layanan administrasi berbasis paperless (PTSP).
              </p>
            </div>

            {/* Pilar 3: Lingkungan */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 group">
              <div className="w-12 h-12 bg-emerald-50 rounded-xl text-emerald-600 flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                <Leaf className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-950 mb-3">Berwawasan Lingkungan</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                Menciptakan lingkungan madrasah wiyata mandala yang hijau, bersih, dan asri guna menanamkan karakter cinta alam serta menerapkan pola hidup sehat sejak dini.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          5. SEKSI BERITA TERBARU (DYNAMIC PREVIEW)
          ========================================================================= */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4">
            <div>
              <span className="text-sm font-bold tracking-wider text-brand-green uppercase">
                Kabar Terbaru
              </span>
              <h2 className="text-3xl font-bold text-gray-900 tracking-tight mt-1">
                Berita & Kegiatan Madrasah
              </h2>
            </div>
            <Link 
              href="/kabar/berita" 
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-green hover:text-brand-green-light"
            >
              Lihat Semua Berita
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {latestNews.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-2xl border border-gray-100 p-6">
              <p className="text-gray-400 font-semibold text-sm">Belum ada berita yang diterbitkan.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {latestNews.map((news) => (
                <article key={news.id} className="bg-white rounded-2xl border border-gray-150 overflow-hidden shadow-sm flex flex-col hover:shadow-md transition-shadow group">
                  <div className="relative aspect-video bg-gray-100 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={getImageUrl(news.image)} 
                      alt={news.title} 
                      className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-brand-green border border-gray-100">
                      {news.category}
                    </span>
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center text-xs text-gray-400 gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {formatTanggalIndo(news.date)}
                      </div>
                      <h3 className="font-bold text-lg text-gray-900 group-hover:text-brand-green transition-colors leading-snug">
                        <Link href={`/kabar/berita/${news.slug}`}>
                          {news.title}
                        </Link>
                      </h3>
                      <p className="text-sm text-gray-500 line-clamp-3">
                        {news.excerpt}
                      </p>
                    </div>
                    <Link 
                      href={`/kabar/berita/${news.slug}`} 
                      className="inline-flex items-center text-sm font-semibold text-brand-green group-hover:text-brand-green-light pt-2 gap-1"
                    >
                      Baca Selengkapnya
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* =========================================================================
          6. BANNER PORTAL LAYANAN TERPADU (CTA)
          ========================================================================= */}
      <section className="pb-24 pt-12 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="bg-gradient-to-tr from-brand-green to-brand-green-dark text-white rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl shadow-brand-green/10">
            {/* Dekorasi Aksen Emas */}
            <div className="absolute right-0 bottom-0 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl -mr-20 -mb-20 pointer-events-none" />
            
            <div className="relative z-10 max-w-3xl space-y-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/10 text-brand-gold">
                Pusat Layanan Terintegrasi
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
                Semua Layanan Madrasah <br />
                Dalam Satu Sentuhan Layar
              </h2>
              <p className="text-white/80 text-lg leading-relaxed max-w-2xl">
                Akses cepat seluruh layanan akademik, administrasi kesiswaan, Rapor Digital Madrasah (RDM), absensi online, hingga pusat pengunduhan blanko dokumen surat-menyurat resmi sekolah.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link 
                  href="/layanan" 
                  className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white text-brand-green hover:bg-gray-50 font-bold transition-all duration-200 shadow-md gap-2"
                >
                  Buka Portal Layanan
                  <ExternalLink className="w-4 h-4" />
                </Link>
                <Link 
                  href="/kontak" 
                  className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-brand-green border border-white/20 hover:bg-white/10 text-white font-semibold transition-all duration-200 gap-2"
                >
                  Hubungi Kami
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
