// Path: src/app/(public)/profil/sejarah/page.tsx
import React from 'react'
import Link from 'next/link'
import { connection } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

import { 
  Award, 
  BookOpen, 
  Calendar, 
  MapPin, 
  Users, 
  ChevronRight, 
  Milestone 
} from 'lucide-react'

// 1. DATA DEFAULT SEJARAH (Sesuai dokumen sejarah asli MTsN 1 Aceh Barat Daya)
const defaultIntroParagraphs = [
  "Madrasah Tsanawiyah Negeri 1 Aceh Barat Daya merupakan salah satu lembaga pendidikan tingkat Tsanawiyah tertua dan paling bersejarah di Kabupaten Aceh Barat Daya. Berdiri kokoh di Pantai Perak, Susoh, madrasah ini telah melahirkan ratusan bahkan ribuan tokoh terkemuka, pemikir, serta praktisi hebat yang berkontribusi aktif bagi pembangunan daerah and nasional.",
  "Kombinasi budaya masyarakat sekitar yang kental dengan nuansa Islami, kesadaran tinggi akan pentingnya pendidikan agama, serta kepemimpinan yang progresif telah mendorong madrasah ini terus bertumbuh melewati berbagai dekade perubahan regulasi dan nomenklatur kenegaraan."
]

const defaultTimeline = [
  {
    year: "1969",
    title: "Cikal Bakal & Penegerian",
    description: "Berdiri pertama kali sebagai Madrasah Tsanawiyah Agama Islam Swasta (M.Ts.A.I.S) Kabupaten Aceh Selatan. Di tahun yang sama, berdasarkan Surat Keputusan Menteri Agama No. 84 Tahun 1969, madrasah ini resmi dinegerikan menjadi Madrasah Tsanawiyah Agama Islam Negeri (M.Ts.A.I.N) yang berlokasi di Desa Pantai Perak, Kecamatan Susoh.",
    badge: "Pendirian & Penegerian"
  },
  {
    year: "1997",
    title: "Era Keterampilan & Tukar Guling Lahan",
    description: "Di bawah kepemimpinan Drs. Mardin, madrasah menawarkan program keterampilan di samping Kurikulum Nasional yang disambut dengan sangat antusias oleh masyarakat dan Pemda. Sebagai bentuk dukungan nyata, Camat Susoh saat itu, Bapak Syaiful Azhar, SE, menyerahkan tanah milik SLTP-1 Susoh kepada MTsN Susoh melalui sistem tukar guling dengan tanah milik Pemda.",
    badge: "Ekspansi & Kurikulum Keterampilan"
  },
  {
    year: "1998",
    title: "Puncak Prestasi Nasional",
    description: "Pada tahun pelajaran 1998/1999, madrasah meraih prestasi luar biasa dengan menyabet Juara II Lomba Prestasi Madrasah Tingkat Nasional. Penghargaan bergengsi ini disahkan melalui Keputusan Direktorat Jenderal Pembinaan Kelembagaan Agama Islam Nomor: E. IV/PP.00/KEP/01/99 tertanggal 28 Desember 1998.",
    badge: "Juara II Tingkat Nasional"
  },
  {
    year: "2001",
    title: "Peresmian Menjadi MTsN Unggul Susoh",
    description: "Sebagai buah dari jerih payah dan berbagai prestasi emas yang ditorehkan, pada 31 Juli 2001, Kepala Kantor Wilayah Departemen Agama Provinsi Daerah Istimewa Aceh secara resmi meresmikan MTsN Susoh menjadi 'MTsN Unggul Susoh' dan nama itu melekat kuat di hati masyarakat sebagai simbol pendidikan berkualitas tinggi.",
    badge: "Menjadi Madrasah Unggul"
  },
  {
    year: "Kini",
    title: "Nomenklatur Baru & Madrasah Inovasi Provinsi",
    description: "Seiring pemekaran kabupaten dan regulasi pemerintah, nomenklatur madrasah disesuaikan menjadi MTsN 1 Aceh Barat Daya. Saat ini, madrasah terus berbenah dan berinovasi di bidang keagamaan maupun mutu pembelajaran umum, menjadikannya salah satu 'Madrasah Inovasi' percontohan resmi di tingkat Provinsi Aceh.",
    badge: "Madrasah Inovasi Provinsi Aceh"
  }
]

interface TimelineRecord {
  tahun: string
  judulPeristiwa: string
  deskripsiPeristiwa: string
}

// Helper: Menentukan badge peristiwa secara dinamis
const getBadgeText = (year: string) => {
  switch (year) {
    case "1969": return "Pendirian & Penegerian"
    case "1997": return "Ekspansi & Kurikulum Keterampilan"
    case "1998": return "Juara II Tingkat Nasional"
    case "2001": return "Menjadi Madrasah Unggul"
    case "Kini": return "Madrasah Inovasi Provinsi Aceh"
    default: return "Peristiwa Sejarah"
  }
}

// Helper: Memilih icon Lucide secara bergantian berdasarkan index
const getTimelineIcon = (index: number) => {
  const icons = [
    <Milestone key="m" className="w-5 h-5 text-white" />,
    <BookOpen key="b" className="w-5 h-5 text-white" />,
    <Award key="a" className="w-5 h-5 text-white" />,
    <Users key="u" className="w-5 h-5 text-white" />,
    <Calendar key="c" className="w-5 h-5 text-white" />
  ]
  return icons[index % icons.length]
}

// 2. SERVER COMPONENT UTAMA
export default async function SejarahPage() {
  await connection()

  let dbIntro: React.ReactNode | null = null
  let dbTimeline: Array<{ year: string; title: string; description: string; badge: string }> = []

  try {
    // A. Inisialisasi Payload Local API di Sisi Server
    const payload = await getPayload({ config })

    // B. Ambil data dari Global Profil Sekolah
    const profil = await payload.findGlobal({
      slug: 'profil-sekolah',
      depth: 1,
    })

    // C. Parsing Intro Sejarah (sejarahPanjang)
    if (profil && profil.sejarahPanjang) {
      if (typeof profil.sejarahPanjang === 'string') {
        dbIntro = profil.sejarahPanjang.split('\n').map((paragraph: string, index: number) => {
          if (paragraph.trim() === '') return null
          return <p key={index}>{paragraph}</p>
        })
      }
    }

    // D. Parsing Lini Masa (liniMasa) dari database
    if (profil && profil.liniMasa && profil.liniMasa.length > 0) {
      dbTimeline = profil.liniMasa.map((item: TimelineRecord) => ({
        year: item.tahun,
        title: item.judulPeristiwa,
        description: item.deskripsiPeristiwa,
        badge: getBadgeText(item.tahun)
      }))
    }
  } catch (error) {
    console.error("Gagal menarik data profil dari database Supabase:", error)
  }

  // E. Fallback: Jika database kosong, gunakan narasi default bersejarah
  const renderIntroParagraphs = dbIntro || defaultIntroParagraphs.map((p, idx) => <p key={idx}>{p}</p>)
  const timelineData = dbTimeline.length > 0 ? dbTimeline : defaultTimeline

  return (
    <div className="min-h-screen bg-gray-50/50">
      
      {/* =========================================================================
          1. HERO SECTION & BREADCRUMB
          ========================================================================= */}
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
            <span className="text-brand-gold">Profil</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white">Sejarah</span>
          </nav>

          {/* Judul & Deskripsi */}
          <div className="max-w-3xl">
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
              Sejarah Perjalanan <br />
              <span className="text-brand-gold">MTsN 1 Aceh Barat Daya</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-gray-200 leading-relaxed font-medium">
              Menelusuri jejak rekam sejarah dari sebuah madrasah swasta sederhana pada tahun 1969 hingga bertransformasi menjadi Madrasah Inovasi Unggulan di Provinsi Aceh saat ini.
            </p>
          </div>
        </div>
      </div>

      {/* =========================================================================
          2. SINOPSIS & PENGANTAR UTAMA (DYNAMIC INTRODUCTION)
          ========================================================================= */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-center">
          
          {/* Sisi Kiri: Foto & Lencana Pendirian */}
          <div className="lg:col-span-5 relative group">
            <div className="absolute -inset-2 rounded-2xl bg-gradient-to-tr from-brand-green to-brand-gold opacity-30 blur-lg transition duration-500 group-hover:opacity-40" />
            <div className="relative overflow-hidden rounded-xl bg-white border border-gray-100 p-3 shadow-xl">
              <div className="relative h-72 sm:h-96 w-full rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-green/90 to-brand-green flex flex-col items-center justify-center text-center p-6 text-white">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-gold/20 text-brand-gold mb-4 border border-brand-gold/30">
                    <span className="font-extrabold text-xl">1969</span>
                  </div>
                  <h3 className="font-bold text-lg text-brand-gold">Tertua di Abdya</h3>
                  <p className="text-xs text-gray-300 mt-2 max-w-xs">
                    Gedung MTsN 1 Aceh Barat Daya di Jl. Pendidikan No. 56, Desa Pantai Perak, Susoh.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sisi Kanan: Teks Pengantar Terstruktur (Dinamis) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-brand-green/10 px-4 py-1.5 text-xs font-bold text-brand-green w-fit">
              <MapPin className="w-3.5 h-3.5" />
              <span>Susoh, Kabupaten Aceh Barat Daya</span>
            </div>
            <h2 className="text-2xl font-extrabold text-brand-green sm:text-3xl tracking-tight">
              Pilar Pendidikan Islami Tertua dan Bersejarah
            </h2>
            <div className="text-base text-gray-600 leading-relaxed space-y-4 font-medium">
              {renderIntroParagraphs}
            </div>
          </div>

        </div>
      </div>

      {/* =========================================================================
          3. SECTION: LINI MASA (DYNAMIC VERTICAL TIMELINE)
          ========================================================================= */}
      <div className="bg-white border-y border-gray-100 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Judul Seksi */}
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-3">
            <h2 className="text-3xl font-extrabold text-brand-green tracking-tight sm:text-4xl">
              Lini Masa Kronologis Madrasah
            </h2>
            <p className="text-base text-gray-500 font-medium">
              Perjalanan transformasi dari masa ke masa yang dihiasi dedikasi dan prestasi emas nasional.
            </p>
          </div>

          {/* Struktur Visual Timeline */}
          <div className="relative mx-auto max-w-4xl">
            {/* Garis Tengah Timeline */}
            <div className="absolute left-4 top-0 h-full w-0.5 bg-gray-200 md:left-1/2 md:-ml-px" />

            <div className="space-y-12">
              {timelineData.map((item, index) => {
                const isEven = index % 2 === 0
                return (
                  <div
                    key={index}
                    className="relative flex flex-col md:flex-row items-start w-full"
                  >
                    {/* Bullet Penanda di Garis Tengah */}
                    <div className="absolute left-0 top-1.5 flex h-8 w-8 items-center justify-center rounded-full bg-brand-green border-4 border-white shadow-md z-10 md:left-1/2 md:-ml-4">
                      {getTimelineIcon(index)}
                    </div>

                    {/* Kartu Lini Masa */}
                    <div
                      className={`w-full pl-12 md:pl-0 md:w-[45%] ${
                        isEven 
                          ? "md:mr-auto md:text-right" 
                          : "md:ml-auto md:text-left"
                      }`}
                    >
                      <div className="bg-gray-50 rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md hover:border-brand-green/20 transition-all duration-300">
                        <span className="inline-block text-xs font-extrabold uppercase tracking-wider text-brand-gold bg-brand-gold/10 px-3 py-1 rounded-full mb-3">
                          {item.badge}
                        </span>
                        
                        {/* Arah text tahun */}
                        <div className={`flex items-baseline gap-2 mb-2 ${isEven ? "md:justify-end" : "md:justify-start"}`}>
                          <span className="text-2xl font-extrabold text-brand-green">{item.year}</span>
                        </div>
                        
                        <h3 className="text-lg font-bold text-gray-800 mb-2">{item.title}</h3>
                        <p className="text-sm text-gray-600 leading-relaxed font-medium">{item.description}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

          </div>
        </div>
      </div>

      {/* =========================================================================
          4. PENUTUP & KATA HARAPAN
          ========================================================================= */}
      <div className="mx-auto max-w-5xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-brand-green to-emerald-950 p-10 sm:p-16 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(209,187,7,0.15),transparent_40%)]" />
          <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center gap-6">
            <Award className="w-12 h-12 text-brand-gold animate-bounce" />
            <h3 className="text-2xl font-extrabold sm:text-3xl">Komitmen Terus Berinovasi</h3>
            <p className="text-base text-gray-200 leading-relaxed font-medium">
              Jerih payah, kerja keras, dan prestasi legendaris masa lalu adalah fondasi kokoh bagi kami. Kini, MTsN 1 Aceh Barat Daya terus berbenah secara digital, berinovasi secara akademik, demi mewujudkan visi melahirkan generasi islami, qur&apos;ani, bermutu unggul, dan berwawasan lingkungan.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
              <Link
                href="/profil/visi-misi"
                className="inline-flex items-center justify-center rounded-full bg-brand-gold text-brand-green px-6 py-3 text-sm font-extrabold hover:bg-white hover:text-brand-green hover:shadow-lg transition-all duration-300"
              >
                Lihat Visi & Misi Sekolah
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-full bg-white/10 text-white border border-white/20 px-6 py-3 text-sm font-bold hover:bg-white/20 transition-all duration-300"
              >
                Kembali ke Beranda
              </Link>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
