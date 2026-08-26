"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  FileText, 
  Search, 
  Download, 
  ChevronRight, 
  FileSpreadsheet, 
  Users, 
  Briefcase, 
  ShieldAlert,
  Info
} from "lucide-react";

// Definisikan tipe data untuk dokumen unduhan
interface DocumentItem {
  id: string;
  title: string;
  description: string;
  category: "siswa" | "kepegawaian" | "umum";
  fileSize: string;
  fileType: "DOCX" | "PDF" | "XLSX";
  fileName: string; 
  badge?: string;
}

export default function DownloadCenterPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"semua" | "siswa" | "kepegawaian" | "umum">("semua");

  // =========================================================================
  // DAFTAR DOKUMEN RESMI (Sesuai dengan sumber Dokumen .docx Sekolah)
  // Anda bisa menambah, mengedit, atau menghapus berkas dokumen di bawah ini:
  // =========================================================================
  const documents: DocumentItem[] = [
    // --- KATEGORI: SISWA & ALUMNI ---
    {
      id: "aktif-siswa",
      title: "Surat Keterangan Aktif Siswa",
      description: "Blangko resmi untuk menyatakan bahwa siswa bersangkutan berstatus aktif menempuh pendidikan di MTsN 1 Aceh Barat Daya.",
      category: "siswa",
      fileSize: "28 KB",
      fileType: "DOCX",
      fileName: "Blangko Surat Keterangan Aktif Siswa.docx",
      badge: "Siswa Aktif",
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
    },
    {
      id: "formulir-cuti",
      title: "Formulir Pengajuan Cuti GTK",
      description: "Formulir permohonan izin cuti (sakit, tahunan, melahirkan, atau alasan penting) bagi Guru dan Tenaga Kependidikan.",
      category: "kepegawaian",
      fileSize: "14 KB",
      fileType: "XLSX",
      fileName: "Formulir Cuti.xlsx", 
      badge: "Cuti Pegawai",
    },
    {
      id: "sppd-blanko",
      title: "Surat Perintah Perjalanan Dinas (SPPD)",
      description: "Format lembar kendala perjalanan dinas luar untuk lampiran pencairan anggaran SPPD madrasah.",
      category: "kepegawaian",
      fileSize: "52 KB",
      fileType: "XLSX",
      fileName: "SPPD.xlsx", 
      badge: "Anggaran SPPD",
    }
  ];

  // =========================================================================
  // 🔍 LOGIKA FILTER & PENCARIAN
  // =========================================================================
  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = 
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.fileName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTab = activeTab === "semua" || doc.category === activeTab;

    return matchesSearch && matchesTab;
  });

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* 1. HERO HEADER */}
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
            <p className="mt-4 text-base sm:text-lg text-gray-200 leading-relaxed">
              Unduh formulir, surat pernyataan, blangko ijazah, dan dokumen administratif resmi 
              MTsN 1 Aceh Barat Daya dengan mudah, gratis, dan terstandarisasi.
            </p>
          </div>
        </div>
      </div>

      {/* 2. AREA UTAMA: PENCARIAN & FILTER TAB */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between border-b border-gray-200 pb-8">
          
          {/* TAB FILTER */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTab("semua")}
              className={`px-4 py-2 text-sm font-bold rounded-lg transition-all ${
                activeTab === "semua"
                  ? "bg-brand-green text-white shadow-md"
                  : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              Semua Berkas
            </button>
            <button
              onClick={() => setActiveTab("siswa")}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-lg transition-all ${
                activeTab === "siswa"
                  ? "bg-brand-green text-white shadow-md"
                  : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Users className="w-4 h-4" />
              Siswa & Alumni
            </button>
            <button
              onClick={() => setActiveTab("kepegawaian")}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-lg transition-all ${
                activeTab === "kepegawaian"
                  ? "bg-brand-green text-white shadow-md"
                  : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Briefcase className="w-4 h-4" />
              Guru & Kepegawaian
            </button>
          </div>

          {/* BILAH PENCARIAN */}
          <div className="relative w-full max-w-md">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              placeholder="Cari blangko (contoh: Ijazah, Aktif)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm font-medium bg-white border border-gray-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-all shadow-xs"
            />
          </div>

        </div>

        {/* 📚 DAFTAR DOKUMEN DALAM GRID */}
        {filteredDocuments.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-10">
            {filteredDocuments.map((doc) => (
              <div 
                key={doc.id}
                className="group relative flex flex-col justify-between bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-lg hover:border-brand-green/20 transition-all duration-300"
              >
                <div>
                  {/* Bagian Atas Kartu */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    {/* Ikon Jenis Berkas */}
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                      doc.fileType === "DOCX" 
                        ? "bg-blue-50 text-blue-600 border border-blue-100" 
                        : "bg-red-50 text-red-600 border border-red-100"
                    }`}>
                      {doc.fileType === "DOCX" ? (
                        <FileText className="w-5 h-5" />
                      ) : (
                        <FileSpreadsheet className="w-5 h-5" />
                      )}
                    </div>
                    
                    {/* Lencana Kategori */}
                    {doc.badge && (
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-gold bg-brand-gold/10 px-2.5 py-1 rounded-full">
                        {doc.badge}
                      </span>
                    )}
                  </div>

                  {/* Judul & Deskripsi Dokumen */}
                  <h3 className="text-base font-bold text-gray-800 leading-snug group-hover:text-brand-green transition-colors mb-2">
                    {doc.title}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed font-medium mb-6">
                    {doc.description}
                  </p>
                </div>

                {/* Tombol Unduh & Informasi File */}
                <div className="flex items-center justify-between border-t border-gray-50 pt-4 mt-auto">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wide">
                      Format Berkas
                    </span>
                    <span className="text-xs font-bold text-gray-600">
                      {doc.fileType} • {doc.fileSize}
                    </span>
                  </div>

                  {/* 
                      💡 PANDUAN TAUTAN FISIK:
                      File ditaruh di folder: public/downloads/[NamaFile.docx]
                      Tautan di-render menjadi: href={`/downloads/${doc.fileName}`}
                  */}
                  <a
                    href={`/downloads/${doc.fileName}`}
                    download
                    className="inline-flex items-center gap-1.5 rounded-lg bg-gray-50 border border-gray-100 text-gray-600 hover:bg-brand-green hover:text-white hover:border-brand-green px-3.5 py-2 text-xs font-extrabold shadow-2xs hover:shadow-md transition-all duration-300"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Unduh
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Tampilan Jika Pencarian Kosong */
          <div className="text-center py-20 bg-white border border-dashed border-gray-200 rounded-3xl mt-10">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-yellow-50 text-brand-gold border border-yellow-100 mb-4">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-800">Berkas Tidak Ditemukan</h3>
            <p className="text-sm text-gray-400 max-w-sm mx-auto mt-2 font-medium">
              Maaf, dokumen dengan kata kunci "{searchQuery}" tidak ditemukan. Coba masukkan kata kunci umum lainnya.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
