// Path: src/app/(public)/profilstaf/StafClient.tsx
"use client"

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Search, Users, GraduationCap, Briefcase, Mail, ChevronRight, User } from 'lucide-react'

export interface Media {
  id: string;
  url: string;
  alt?: string;
}

export interface StaffMember {
  id: string;
  namaLengkap: string;
  jabatan: string;
  jenisPtk: 'guru' | 'staf';
  foto: string | Media; 
  urutan: number;
  nip?: string;
} 

export default function DirektoriStafClient({ staffData }: { staffData: StaffMember[] }) {
  // State untuk Filter Kategori & Pencarian
  const [activeTab, setActiveTab] = useState<'semua' | 'guru' | 'staf'>('semua')
  const [searchQuery, setSearchQuery] = useState('')

  // 1. Ambil Kepala Madrasah (Pimpinan) untuk dipajang di Spotlight paling atas
  const kepalaMadrasah = useMemo(() => {
    return staffData.find(
      (member) =>
        member.urutan === 1 || member.jabatan.toLowerCase().includes('kepala madrasah')
    )
  }, [staffData])

  // 2. Filter & Pencarian Data untuk Grid Utama
  const filteredStaff = useMemo(() => {
    return staffData.filter((member) => {
      // Kecualikan Kepala Madrasah dari grid utama agar tidak tampil ganda
      if (member.id === kepalaMadrasah?.id) return false

      const matchesTab = activeTab === 'semua' || member.jenisPtk === activeTab

      const matchesSearch =
        member.namaLengkap.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.jabatan.toLowerCase().includes(searchQuery.toLowerCase())

      return matchesTab && matchesSearch
    })
  }, [activeTab, searchQuery, staffData, kepalaMadrasah])

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* ==========================================
         1. HERO SECTION & BREADCRUMB
         ========================================== */}
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
            <span className="text-white">Direktori Guru & Staf</span>
          </nav>

          {/* Judul */}
          <div className="max-w-3xl">
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
              Direktori Pendidik <br />
              <span className="text-brand-gold">& Tenaga Kependidikan</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-gray-200 leading-relaxed font-medium">
              Kenali lebih dekat jajaran pimpinan, dewan guru pengajar, dan staf tata usaha profesional
              yang berdedikasi tinggi membimbing putra-putri berprestasi di MTsN 1 Aceh Barat Daya.
            </p>
          </div>
        </div>
      </div>

      {/* ==========================================
         2. KEPALA MADRASAH SPOTLIGHT
         ========================================== */}
      {kepalaMadrasah && (
        <div className="mx-auto max-w-7xl px-4 -mt-10 sm:px-6 lg:px-8 relative z-20">
          <div className="overflow-hidden rounded-3xl bg-white border border-gray-100 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-12">

              {/* Foto Kepala Madrasah */}
              <div className="md:col-span-4 bg-gray-100 flex items-center justify-center p-8 border-b md:border-b-0 md:border-r border-gray-100">
                <div className="relative overflow-hidden flex h-56 w-56 items-center justify-center rounded-2xl bg-brand-green/10 border-4 border-brand-green/10 text-brand-green shadow-inner">
                  {kepalaMadrasah.foto && typeof kepalaMadrasah.foto === 'object' && kepalaMadrasah.foto.url ? (
                    <Image
                      src={kepalaMadrasah.foto.url}
                      alt={kepalaMadrasah.foto.alt || kepalaMadrasah.namaLengkap}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <User className="w-24 h-24 stroke-[1.2]" />
                  )}
                </div>
              </div>

              {/* Sambutan & Detail */}
              <div className="md:col-span-8 p-8 sm:p-10 flex flex-col justify-center">
                <span className="inline-block text-[10px] font-extrabold uppercase tracking-widest text-brand-gold bg-brand-gold/10 px-3 py-1 rounded-full w-fit mb-4">
                  Pimpinan Madrasah
                </span>
                <h2 className="text-2xl font-extrabold text-brand-green tracking-tight sm:text-3xl">
                  {kepalaMadrasah.namaLengkap}
                </h2>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mt-1">
                  {kepalaMadrasah.jabatan}
                </p>

                {kepalaMadrasah.nip && (
                  <p className="text-xs font-semibold text-gray-500 mt-1">
                    NIP. {kepalaMadrasah.nip}
                  </p>
                )}

                <div className="mt-5 border-t border-gray-100 pt-5">
                  <p className="text-sm text-gray-500 leading-relaxed font-medium italic">
                    Selamat datang di Direktori Resmi MTsN 1 Aceh Barat Daya. Kami percaya bahwa kolaborasi
                    yang kuat antara tenaga pendidik yang kompeten, staf administrasi yang berintegritas,                    serta dukungan penuh dari orang tua murid adalah kunci utama dalam mencetak generasi emas
                    yang cerdas spiritual, unggul intelektual, dan berwawasan lingkungan.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* ==========================================
         3. UTILITY BAR: PENCARIAN & FILTER TAB
         ========================================== */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 border-b border-gray-200 pb-8">

          {/* Kiri: Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTab('semua')}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold tracking-wide transition-all duration-300 ${
                activeTab === 'semua'
                  ? 'bg-brand-green text-white shadow-md shadow-brand-green/20'
                  : 'bg-white border border-gray-200 text-gray-500 hover:text-brand-green hover:border-brand-green/30'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Semua Personel ({staffData.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('guru')}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold tracking-wide transition-all duration-300 ${
                activeTab === 'guru'
                  ? 'bg-brand-green text-white shadow-md shadow-brand-green/20'
                  : 'bg-white border border-gray-200 text-gray-500 hover:text-brand-green hover:border-brand-green/30'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Tenaga Pendidik / Guru</span>
            </button>

            <button
              onClick={() => setActiveTab('staf')}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold tracking-wide transition-all duration-300 ${
                activeTab === 'staf'
                  ? 'bg-brand-green text-white shadow-md shadow-brand-green/20'
                  : 'bg-white border border-gray-200 text-gray-500 hover:text-brand-green hover:border-brand-green/30'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Tenaga Kependidikan / Staf TU</span>
            </button>
          </div>

          {/* Kanan: Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-3.5 h-4.5 w-4.5 text-gray-400" />
            <input
              type="text"
              placeholder="Cari guru atau staf..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-gray-200 pl-11 pr-4 py-3 text-xs font-semibold rounded-full text-gray-700 placeholder-gray-400 focus:outline-hidden focus:border-brand-green/50 focus:ring-4 focus:ring-brand-green/5 transition-all duration-300"
            />
          </div>

        </div>

        {/* ==========================================
           4. GRID LIST PERSONEL (GURU & STAF)
           ========================================== */}
        {filteredStaff.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 mt-10">
            {filteredStaff.map((member) => (
              <div
                key={member.id}
                className="group relative bg-white border border-gray-100 rounded-3xl p-6 shadow-xs hover:shadow-xl hover:border-brand-green/20 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Atas: Foto & Info Utama */}
                <div className="flex items-center gap-5">
                  {/* Foto Profil Lingkaran dengan Fallback Lucide Icon */}
                  <div className="relative overflow-hidden flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-brand-green/5 border border-brand-green/10 text-brand-green shadow-xs group-hover:scale-105 transition-transform duration-300">
                    {member.foto && typeof member.foto === 'object' && member.foto.url ? (
                      <Image
                        src={member.foto.url}
                        alt={member.foto.alt || member.namaLengkap}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <User className="w-8 h-8 stroke-[1.2]" />
                    )}
                  </div>

                  {/* Identitas */}
                  <div className="flex flex-col">
                    <span className="inline-block text-[9px] font-extrabold uppercase tracking-wider text-brand-gold bg-brand-gold/10 px-2 py-0.5 rounded-full w-fit mb-1.5">
                      {member.jenisPtk === 'guru' ? 'Guru / Pendidik' : 'Tata Usaha / Staf'}
                    </span>
                    <h3 className="font-extrabold text-gray-800 leading-snug group-hover:text-brand-green transition-colors duration-300">
                      {member.namaLengkap}
                    </h3>
                    <p className="text-xs text-gray-400 font-bold mt-0.5">
                      {member.jabatan}
                    </p>
                    {member.nip && (
                      <p className="text-[10px] text-gray-400 font-medium mt-0.5">
                        NIP. {member.nip}
                      </p>
                    )}
                  </div>
                </div>

              </div>
            ))}
          </div>
        ) : (
          /* State Kosong (Search tidak ditemukan) */
          <div className="text-center py-20 mt-10 bg-white rounded-3xl border border-dashed border-gray-200">
            <Users className="w-12 h-12 text-gray-300 mx-auto mb-4 stroke-[1.2]" />
            <h3 className="text-lg font-bold text-gray-700">Tidak ada personel ditemukan</h3>\n            <p className="text-sm text-gray-400 max-w-xs mx-auto mt-1 font-medium">
              Tidak ada hasil untuk kata kunci "{searchQuery}" pada kategori tab yang Anda pilih.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}