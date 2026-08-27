// Path: src/app/(public)/layanan/LayananClient.tsx
"use client"

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import { 
  BookOpen, 
  Download, 
  FileText, 
  Users, 
  GraduationCap, 
  PhoneCall, 
  Lock, 
  ExternalLink, 
  Search, 
  HelpCircle,
  Clock,
  ShieldCheck,
  Building,
  ArrowRight
} from 'lucide-react'

export interface LayananItem {
  title: string
  description: string
  href: string
  isExternal: boolean
  icon: 'rdm' | 'emis' | 'pusaka' | 'download' | 'aktif' | 'asn' | 'ppdb' | 'saran' | 'absensi'
  badge?: string
}

export interface LayananCategory {
  categoryName: string
  categoryDesc: string
  items: LayananItem[]
}

// =========================================================================
// 1. DATA LAYANAN BAWAAN (FALLBACK - SEKARANG NON-AKTIF / DI-KOMEN)
// 💡 Seluruh data ini murni sebagai rujukan cadangan. Link asli sekarang hanya
//    berasal dari database CMS Admin. Jika ingin mengaktifkan kembali fallback lokal,
//    cukup hapus tanda komentar /* di atas const dan */ di akhir array.
// =========================================================================
/*
const defaultLayanan: LayananCategory[] = [
  {
    categoryName: "Layanan Kepegawaian & Kemenag",
    categoryDesc: "Portal digital terintegrasi untuk pendataan, presensi, dan kapasitas pegawai serta guru madrasah.",
    items: [
      {
        title: "ASN Digital",
        description: "Portal resmi Badan Kepegawaian Negara (BKN) untuk pengelolaan dan peningkatan kapasitas digital pegawai ASN.",
        href: "https://asndigital.bkn.go.id/",
        isExternal: true,
        icon: "asn",
        badge: "BKN",
      },
      {
        title: "Absen ASN Pusaka",
        description: "Akses login portal presensi digital mandiri Pusaka Kemenag RI versi terbaru untuk guru dan pegawai ASN.",
        href: "https://pusaka-v3.kemenag.go.id/login",
        isExternal: true,
        icon: "pusaka",
        badge: "Presensi",
      },
      {
        title: "Absen GTK",
        description: "Portal Single Sign-On (SSO) Kementerian Agama untuk pengelolaan presensi, simpatika, dan administrasi GTK.",
        href: "https://sso.kemenag.go.id/",
        isExternal: true,
        icon: "absensi",
        badge: "SSO Kemenag",
      },
      {
        title: "EMIS GTK",
        description: "Education Management Information System khusus untuk pemutakhiran data guru dan tenaga kependidikan madrasah.",
        href: "https://emisgtk.kemenag.go.id/",
        isExternal: true,
        icon: "emis",
        badge: "Data GTK",
      }
    ]
  },
  {
    categoryName: "Layanan Publik & Hubungan Masyarakat",
    categoryDesc: "Saluran informasi penerimaan siswa baru dan media penyampaian aspirasi masyarakat terhadap pelayanan madrasah.",
    items: [
      {
        title: "Pendaftaran Siswa Baru (PPDB Online)",
        description: "Portal pendaftaran dan informasi resmi Penerimaan Peserta Didik Baru (PPDB) MTsN 1 Aceh Barat Daya. (Link akan diaktifkan saat musim pendaftaran dibuka)",
        href: "#",
        isExternal: true,
        icon: "ppdb",
        badge: "Musiman",
      },
      {
        title: "Kotak Saran & Aspirasi",
        description: "Sampaikan saran, kritik konstruktif, atau aspirasi Anda demi peningkatan kualitas pelayanan pendidikan di madrasah kami.",
        href: "#",
        isExternal: true,
        icon: "saran",
        badge: "Umpan Balik",
      }
    ]
  }
]
*/

// Map string icon ke komponen visual Lucide yang sesuai
const renderIcon = (iconName: string) => {
  switch (iconName) {
    case "rdm":
      return <GraduationCap className="w-6 h-6 text-brand-green group-hover:text-white transition-colors duration-300" />
    case "emis":
      return <FileText className="w-6 h-6 text-brand-green group-hover:text-white transition-colors duration-300" />
    case "pusaka":
      return <ShieldCheck className="w-6 h-6 text-brand-green group-hover:text-white transition-colors duration-300" />
    case "download":
      return <Download className="w-6 h-6 text-brand-green group-hover:text-white transition-colors duration-300" />
    case "aktif":
      return <BookOpen className="w-6 h-6 text-brand-green group-hover:text-white transition-colors duration-300" />
    case "asn":
      return <Users className="w-6 h-6 text-brand-green group-hover:text-white transition-colors duration-300" />
    case "ppdb":
      return <Building className="w-6 h-6 text-brand-green group-hover:text-white transition-colors duration-300" />
    case "saran":
      return <PhoneCall className="w-6 h-6 text-brand-green group-hover:text-white transition-colors duration-300" />
    case "absensi":
      return <Clock className="w-6 h-6 text-brand-green group-hover:text-white transition-colors duration-300" />
    default:
      return <HelpCircle className="w-6 h-6 text-brand-green group-hover:text-white transition-colors duration-300" />
  }
}

interface LayananClientProps {
  dbLayanan: LayananCategory[]
}

export default function LayananClient({ dbLayanan }: LayananClientProps) {
  const [searchQuery, setSearchQuery] = useState("")

  // GABUNGKAN DATA DATABASE DENGAN DEFAULT SECARA PINTAR 
  // 🌟 SEKARANG MURNI 100% MENGIKUTI DATA DARI DATABASE CMS (KOSONG JIKA DB KOSONG)
  const finalLayanan = useMemo(() => {
    return dbLayanan || []
  }, [dbLayanan])

  // Fungsi pencarian layanan secara real-time
  const filteredLayanan = useMemo(() => {
    return finalLayanan.map(category => {
      const matchedItems = category.items.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
      return {
        ...category,
        items: matchedItems
      }
    }).filter(category => category.items.length > 0)
  }, [finalLayanan, searchQuery])

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20">
      
      {/* 1. HERO BANNER */}
      <div className="relative overflow-hidden bg-brand-green py-20 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(209,187,7,0.15),transparent_45%)]" />
        <div className="absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-gold/20 px-4 py-1.5 text-xs font-bold text-brand-gold tracking-wide uppercase mb-4 border border-brand-gold/30">
            One-Stop Digital Hub
          </span>
          <h1 className="text-3xl font-extrabold sm:text-4xl lg:text-5xl tracking-tight">
            Portal Layanan Terpadu
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg text-gray-200 leading-relaxed font-medium">
            Selamat datang di pusat layanan digital MTsN 1 Aceh Barat Daya. 
            Silakan pilih layanan administrasi, akademik, atau kepemerintahan yang Anda butuhkan di bawah ini.
          </p>
          
          {/* Bar Pencarian Layanan */}
          <div className="mx-auto mt-8 max-w-md relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Cari layanan (misal: Rapor, EMIS, Unduh...)"
              className="block w-full rounded-full border border-transparent bg-white py-3 pl-11 pr-4 text-gray-800 placeholder-gray-400 shadow-md focus:border-brand-gold focus:outline-hidden focus:ring-2 focus:ring-brand-gold/50 text-xs sm:text-sm font-bold transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* 2. DAFTAR UTAMA LAYANAN (GRID BERKELOMPOK) */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-16">
        
        {filteredLayanan.length === 0 ? (
          /* JIKA HASIL PENCARIAN KOSONG / BELUM ADA DATA DI CMS */
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-xs max-w-xl mx-auto">
            <HelpCircle className="mx-auto h-12 w-12 text-gray-300" />
            <h3 className="mt-4 text-lg font-bold text-gray-700">Layanan tidak ditemukan</h3>
            <p className="mt-2 text-sm text-gray-500 font-medium max-w-xs mx-auto">
              Maaf, belum ada layanan yang dikonfigurasi di dashboard admin atau pencarian Anda tidak cocok.
            </p>
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-brand-green px-4 py-2 text-xs font-bold text-white hover:bg-emerald-950 transition-colors shadow-xs"
              >
                Hapus Pencarian
              </button>
            )}
          </div>
        ) : (
          /* JIKA LAYANAN DITEMUKAN */
          <div className="space-y-16">
            {filteredLayanan.map((category, catIndex) => (
              <div key={catIndex} className="flex flex-col gap-6">
                
                {/* Header Kategori */}
                <div className="border-b border-gray-200 pb-4">
                  <h2 className="text-xl font-extrabold text-brand-green tracking-tight sm:text-2xl">
                    {category.categoryName}
                  </h2>
                  <p className="text-sm text-gray-500 font-semibold mt-1">
                    {category.categoryDesc}
                  </p>
                </div>

                {/* Grid Item Layanan di Kategori Ini */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {category.items.map((item, itemIndex) => {
                    const isExternalLink = item.isExternal
                    
                    if (isExternalLink) {
                      return (
                        <a
                          key={itemIndex}
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group relative flex flex-col justify-between rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-xl hover:border-brand-green/20 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
                        >
                          <div>
                            <div className="flex items-center justify-between gap-2 mb-4">
                              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-green/5 border border-brand-green/10 group-hover:bg-brand-green group-hover:border-brand-green transition-all duration-300">
                                {renderIcon(item.icon)}
                              </div>
                              {item.badge && (
                                <span className="rounded-full bg-brand-gold/10 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-brand-gold border border-brand-gold/20">
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            <h3 className="text-lg font-bold text-gray-800 tracking-tight group-hover:text-brand-green transition-colors">
                              {item.title}
                            </h3>
                            <p className="mt-2 text-xs sm:text-sm text-gray-500 leading-relaxed font-semibold">
                              {item.description}
                            </p>
                          </div>
                          <div className="mt-6 flex items-center gap-1 text-xs font-extrabold text-brand-green group-hover:text-brand-gold transition-colors">
                            <span>Akses Layanan</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </div>
                        </a>
                      )
                    }

                    return (
                      <Link
                        key={itemIndex}
                        href={item.href}
                        className="group relative flex flex-col justify-between rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-xl hover:border-brand-green/20 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-green/5 border border-brand-green/10 group-hover:bg-brand-green group-hover:border-brand-green transition-all duration-300">
                              {renderIcon(item.icon)}
                            </div>
                            {item.badge && (
                              <span className="rounded-full bg-brand-gold/10 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-brand-gold border border-brand-gold/20">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <h3 className="text-lg font-bold text-gray-800 tracking-tight group-hover:text-brand-green transition-colors">
                            {item.title}
                          </h3>
                          <p className="mt-2 text-xs sm:text-sm text-gray-500 leading-relaxed font-semibold">
                            {item.description}
                          </p>
                        </div>
                        <div className="mt-6 flex items-center gap-1 text-xs font-extrabold text-brand-green group-hover:text-brand-gold transition-colors">
                          <span>Akses Layanan</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </Link>
                    )
                  })}
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

      {/* 3. ALUR / PROSEDUR INTEGRITAS LAYANAN */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-24">
        <div className="rounded-3xl border border-gray-100 bg-white p-8 sm:p-12 shadow-sm">
          <div className="max-w-3xl mx-auto text-center mb-10 flex flex-col gap-2">
            <Lock className="w-10 h-10 text-brand-gold mx-auto mb-2" />
            <h2 className="text-2xl font-extrabold text-brand-green tracking-tight sm:text-3xl">
              Prinsip Keamanan & Akuntabilitas Digital
            </h2>
            <p className="text-sm text-gray-500 font-semibold leading-relaxed">
              Seluruh integrasi portal layanan di MTsN 1 Aceh Barat Daya menerapkan kebijakan keamanan 
              informasi dan perlindungan data pribadi sesuai standar Kementerian Agama Republik Indonesia.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 text-center">
            <div className="flex flex-col items-center gap-3 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-brand-green font-extrabold text-lg">1</div>
              <h3 className="font-bold text-gray-800 text-md">Single Sign-On (SSO)</h3>
              <p className="text-xs text-gray-500 font-semibold leading-relaxed">
                Beberapa portal kepemerintahan menggunakan akun kredensial terpusat Pusaka Kemenag untuk keamanan akses satu pintu yang optimal.
              </p>
            </div>
            <div className="flex flex-col items-center gap-3 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-brand-green font-extrabold text-lg">2</div>
              <h3 className="font-bold text-gray-800 text-md">Multi-Factor Authentication (MFA)</h3>
              <p className="text-xs text-gray-500 font-semibold leading-relaxed">
                Sesuai himbauan keamanan ASN Digital, disarankan menggunakan langkah konfirmasi ganda guna menghindari pencurian data kredensial penting.
              </p>
            </div>
            <div className="flex flex-col items-center gap-3 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-brand-green font-extrabold text-lg">3</div>
              <h3 className="font-bold text-gray-800 text-md">Layanan Bebas Pungli</h3>
              <p className="text-xs text-gray-500 font-semibold leading-relaxed">
                Seluruh pelayanan surat-menyurat administrasi kesiswaan dan unduhan dokumen di madrasah ini bersifat 100% gratis tanpa biaya tambahan apa pun.
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
