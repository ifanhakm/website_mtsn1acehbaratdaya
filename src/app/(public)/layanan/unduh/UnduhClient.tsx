// Path: src/app/(public)/layanan/unduh/UnduhClient.tsx
"use client"

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import { 
  FileText, 
  Search, 
  Download, 
  ChevronRight, 
  Users, 
  Briefcase, 
  ShieldAlert
} from 'lucide-react'

export interface DocumentItem {
  id: string | number
  title: string
  description: string
  category: 'siswa' | 'kepegawaian' | 'umum'
  fileSize: string
  fileType: string
  fileName: string   // Nama file fisik
  fileUrl?: string   // URL dinamis dari Supabase Storage jika ada
  badge?: string
}

// 1. DATA BLANGKO BAWAAN SEKOLAH (SMART FALLBACK)
const defaultDocuments: DocumentItem[] = [
  /*
  // --- KATEGORI: SISWA & ALUMNI ---
  {
    id: "aktif-siswa",
    title: "Surat Keterangan Aktif Siswa",
    description: "Blangko resmi untuk menyatakan bahwa siswa bersangkutan berstatus aktif menempuh pendidikan di MTsN 1 Aceh Barat Daya.",
    category: "siswa",
    fileSize: "28 KB",
    fileType: "DOCX",
    fileName: "Blangko Surat Keterangan Aktif Siswa.docx",
    badge: "",
  },
  {
    id: "pengganti-ijazah",
    title: "Surat Keterangan Pengganti Ijazah",
    description: "Formulir pengganti ijazah kelulusan madrasah yang rusak atau hilang, dilengkapi lampiran nilai rapor akhir siswa.",
    category: "siswa",
    fileSize: "32 KB",
    fileType: "DOCX",
    fileName: "Blangko Surat Keterangan Pengganti Ijazah.docx",
    badge: "Alumni / Kehilangan",
  },
  {
    id: "sptjm-ijazah",
    title: "Surat Tanggung Jawab Mutlak (SPTJM) Ijazah",
    description: "Surat pernyataan tanggung jawab hukum mutlak dari pemohon penggantian ijazah atas kebenaran berkas kehilangan.",
    category: "siswa",
    fileSize: "24 KB",
    fileType: "DOCX",
    fileName: "Blangko Surat Tanggung jawab mutlak Pengganti Ijazah.docx",
    badge: "Alumni / Hukum",
  },
  {
    id: "saksi-ijazah",
    title: "Surat Pernyataan Saksi Kehilangan Ijazah",
    description: "Affidavit kesaksian dari rekan satu angkatan lulusan sebagai bukti pendukung proses penerbitan pengganti ijazah.",
    category: "siswa",
    fileSize: "25 KB",
    fileType: "DOCX",
    fileName: "Blangko Surat Pernyataan Saksi.docx",
    badge: "Alumni / Saksi",
  },
  {
    id: "skhun-keterangan",
    title: "Surat Keterangan Pengganti SKHUN",
    description: "Surat verifikasi legalitas bagi alumni yang lulus setelah tahun 2021 dimana ujian nasional ditiadakan oleh pemerintah.",
    category: "siswa",
    fileSize: "27 KB",
    fileType: "DOCX",
    fileName: "Blangko Surat Keterangan SKHUN.docx",
    badge: "Kelulusan",
  },
  {
    id: "surat-kuasa",
    title: "Surat Kuasa Pengambilan Ijazah",
    description: "Format surat pelimpahan wewenang legal bagi pihak ketiga untuk mewakili pemilik asli dalam pengambilan berkas kelulusan.",
    category: "siswa",
    fileSize: "23 KB",
    fileType: "DOCX",
    fileName: "Blangko Surat Kuasa.docx",
    badge: "Kuasa",
  },
  {
    id: "panggilan-ortu",
    title: "Surat Pemanggilan Orang Tua / Wali",
    description: "Template undangan formal madrasah kepada orang tua/wali siswa untuk keperluan koordinasi bimbingan konseling atau keuangan.",
    category: "siswa",
    fileSize: "21 KB",
    fileType: "DOCX",
    fileName: "Blangko Surat Pemanggilan Orang Tua.docx",
    badge: "Bimbingan",
  },

  // --- KATEGORI: GURU & KEPEGAWAIAN ---
  {
    id: "kinerja-guru",
    title: "Surat Pernyataan Kinerja Guru (TPG)",
    description: "Surat pernyataan pemenuhan jam mengajar mingguan (25-32 jam) sebagai syarat wajib pencairan Tunjangan Profesi Guru (TPG).",
    category: "kepegawaian",
    fileSize: "30 KB",
    fileType: "DOCX",
    fileName: "SURAT PERNYATAAN KINERJA.docx",
    badge: "Khusus Guru",
  },
  {
    id: "sptjm-keuangan",
    title: "SPTJM Pencairan Keuangan TPG",
    description: "Surat Pernyataan Tanggung Jawab Mutlak atas keabsahan nominal pembayaran tunjangan profesi guru periode terkait.",
    category: "kepegawaian",
    fileSize: "29 KB",
    fileType: "DOCX",
    fileName: "SURAT PERNYATAAN TANGGUNG JAWAB MUTLAK.docx",
    badge: "Keuangan Guru",
  },
  {
    id: "surat-tugas",
    title: "Surat Tugas Pelaksanaan Dinas",
    description: "Format surat mandat resmi pimpinan madrasah untuk menugaskan staf mengikuti seminar, bimtek, atau dinas luar kota.",
    category: "kepegawaian",
    fileSize: "26 KB",
    fileType: "DOCX",
    fileName: "Blangko Surat Tugas.docx",
    badge: "Dinas Luar",
  },
  {
    id: "basen-error",
    title: "Surat Keterangan Kendala Presensi Pusaka",
    description: "Berkas berita acara pembuktian gangguan server presensi mandiri (Pusaka Kemenag) agar tidak mendapat sanksi pemotongan tunjangan.",
    category: "kepegawaian",
    fileSize: "24 KB",
    fileType: "DOCX",
    fileName: "Blangko Keterangan Basen Eror Agustus.docx",
    badge: "Presensi ASN",
  }
*/]; 

interface UnduhClientProps {
  dbDocuments: DocumentItem[]
}

export default function UnduhClient({ dbDocuments }: UnduhClientProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState<"semua" | "siswa" | "kepegawaian" | "umum">("semua")

  // 2. GABUNGKAN DATA DATABASE DENGAN DEFAULT SECARA PINTAR (DEDUPLIKASI)
  const allDocuments = useMemo(() => {
    const merged = [...dbDocuments]

    defaultDocuments.forEach((fallback) => {
      // Jika berkas sudah diupload oleh admin dengan judul atau nama file yang sama, 
      // gunakan versi database dan abaikan versi fallback.
      const isDuplicated = dbDocuments.some(
        (dbDoc) =>
          dbDoc.title.toLowerCase() === fallback.title.toLowerCase() ||
          dbDoc.fileName.toLowerCase() === fallback.fileName.toLowerCase()
      )

      if (!isDuplicated) {
        merged.push(fallback)
      }
    })

    return merged
  }, [dbDocuments])

  // 3. LOGIKA FILTER & PENCARIAN
  const filteredDocuments = useMemo(() => {
    return allDocuments.filter((doc) => {
      const matchesSearch =
        doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.fileName.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesTab = activeTab === "semua" || doc.category === activeTab

      return matchesSearch && matchesTab
    })
  }, [allDocuments, searchQuery, activeTab])

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* ==========================================
         1. HERO HEADER & BREADCRUMB
         ========================================== */}
      <div className="relative overflow-hidden bg-brand-green py-20 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(209,187,7,0.15),transparent_45%)]" />
        <div className="absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-white/5 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/70 mb-4">
            <Link href="/" className="hover:text-brand-gold transition-colors">
              Beranda
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/layanan" className="hover:text-brand-gold transition-colors">
              Layanan
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white">Pusat Unduh</span>
          </nav>

          {/* Judul Seksi */}
          <div className="max-w-3xl">
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
              Pusat Unduh Dokumen <br />
              <span className="text-brand-gold">Administrasi Madrasah</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-gray-200 leading-relaxed font-medium">
              Unduh formulir, surat pernyataan, blangko ijazah, dan dokumen administratif resmi MTsN 1 Aceh Barat Daya dengan mudah, gratis, dan terstandarisasi.
            </p>
          </div>
        </div>
      </div>

      {/* ==========================================
         2. PENCARIAN & FILTER TAB CONTROL
         ========================================== */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between border-b border-gray-200 pb-8">
          
          {/* Tab Kategori */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTab("semua")}
              className={`px-4 py-2.5 text-xs font-extrabold rounded-lg transition-all ${
                activeTab === "semua"
                  ? "bg-brand-green text-white shadow-md shadow-brand-green/15"
                  : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              Semua Berkas
            </button>
            <button
              onClick={() => setActiveTab("siswa")}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-extrabold rounded-lg transition-all ${
                activeTab === "siswa"
                  ? "bg-brand-green text-white shadow-md shadow-brand-green/15"
                  : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Users className="w-4 h-4" />
              Siswa & Alumni
            </button>
            <button
              onClick={() => setActiveTab("kepegawaian")}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-extrabold rounded-lg transition-all ${
                activeTab === "kepegawaian"
                  ? "bg-brand-green text-white shadow-md shadow-brand-green/15"
                  : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Briefcase className="w-4 h-4" />
              Guru & Kepegawaian
            </button>
          </div>

          {/* Kolom Pencarian */}
          <div className="relative w-full max-w-md">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="Cari blangko (contoh: Ijazah, Aktif)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 text-xs font-bold bg-white border border-gray-200 rounded-xl focus:outline-hidden focus:ring-3 focus:ring-brand-green/10 focus:border-brand-green transition-all shadow-xs placeholder:text-gray-400"
            />
          </div>

        </div>

        {/* ==========================================
           3. GRID DOKUMEN / KARTU UNDUHAN
           ========================================== */}
        {filteredDocuments.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-10">
            {filteredDocuments.map((doc) => (
              <div 
                key={doc.id}
                className="group relative flex flex-col justify-between bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-lg hover:border-brand-green/20 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    {/* Ikon Jenis Berkas */}
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                      doc.fileType === "DOCX" 
                        ? "bg-blue-50 text-blue-600 border border-blue-100" 
                        : "bg-red-50 text-red-600 border border-red-100"
                    }`}>
                      <FileText className="w-5 h-5" />
                    </div>
                    
                    {/* Lencana Kategori */}
                    {doc.badge && (
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-gold bg-brand-gold/10 px-2.5 py-1 rounded-full">
                        {doc.badge}
                      </span>
                    )}
                  </div>

                  {/* Judul & Deskripsi Dokumen */}
                  <h3 className="text-base font-extrabold text-gray-800 leading-snug group-hover:text-brand-green transition-colors mb-2">
                    {doc.title}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed font-semibold mb-6">
                    {doc.description}
                  </p>
                </div>

                {/* Tombol Unduh & Informasi File */}
                <div className="flex items-center justify-between border-t border-gray-150 pt-4 mt-auto">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wide">
                      Format Berkas
                    </span>
                    <span className="text-xs font-bold text-gray-600">
                      {doc.fileType} • {doc.fileSize}
                    </span>
                  </div>

                  {/* Deteksi Link Unduhan (Dinamis dari Supabase / Statis dari folder public) */}
                  <a
                    href={doc.fileUrl ? doc.fileUrl : `/documents/${doc.fileName}`}
                    download
                    className="inline-flex items-center gap-1.5 rounded-lg bg-gray-50 border border-gray-100 text-gray-600 hover:bg-brand-green hover:text-white hover:border-brand-green px-3.5 py-2.5 text-xs font-black shadow-2xs hover:shadow-md transition-all duration-300"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Unduh</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Tampilan Jika Pencarian Kosong */
          <div className="text-center py-20 bg-white border border-dashed border-gray-200 rounded-3xl mt-10 p-8 shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-yellow-50 text-brand-gold border border-yellow-100 mb-4 animate-pulse">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-extrabold text-gray-800">Berkas Tidak Ditemukan</h3>
            <p className="text-xs text-gray-400 max-w-sm mx-auto mt-2 font-semibold">
              Maaf, dokumen dengan kata kunci &quot;{searchQuery}&quot; tidak ditemukan. Silakan masukkan kata kunci lainnya.
            </p>
          </div>
        )}  
      </div>
    </div>
  )
}
