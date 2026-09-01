"use client";

import Image from "next/image";
import React from "react";
import Link from "next/link";
import { Mail, MapPin, Phone, Award } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-gray-50 border-t border-gray-100 text-gray-600">
      {/* BAGIAN ATAS: INFORMASI UTAMA & TAUTAN */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          
          {/* KOLOM 1: IDENTITAS SEKOLAH */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white p-0.5 shadow-md border border-gray-100 overflow-hidden">
                <Image 
                  src="/logo.jpg" 
                  alt="Logo MTsN 1 Aceh Barat Daya" 
                  width={40} 
                  height={40} 
                  className="object-contain"
                />
              </div>

              <div className="flex flex-col">
                <span className="font-bold text-md leading-tight text-brand-green tracking-wide">
                  MTsN 1 Aceh Barat Daya
                </span>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                  Kementerian Agama RI
                </span>
              </div>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed font-medium">
              Madrasah Tsanawiyah Negeri 1 Aceh Barat Daya berkomitmen melahirkan generasi yang unggul dalam Imtaq, menguasai Iptek, berakhlak mulia, dan berwawasan lingkungan.
            </p>
            {/* SOSMED MADRASAH - MENGGUNAKAN INLINE SVG UNTUK KEANDALAN MAKSIMAL */}
            <div className="flex items-center gap-3 mt-2">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/mtsn1abdya/"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white border border-gray-200 text-gray-500 hover:text-brand-green hover:border-brand-green/30 shadow-xs hover:shadow-md transition-all duration-300"
                aria-label="Instagram MTsN 1 Abdya"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              {/* TikTok */}
              <a
                href="https://www.tiktok.com/@mtsn.1.abdya"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white border border-gray-200 text-gray-500 hover:text-brand-green hover:border-brand-green/30 shadow-xs hover:shadow-md transition-all duration-300"
                aria-label="TikTok MTsN 1 Abdya"
              >
                <svg
                  className="w-4 h-4 fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.59 4.23.94 1.18 2.27 2 3.75 2.37V10.2c-1.85-.01-3.67-.62-5.18-1.74-.03 2.1-.01 4.19-.02 6.29-.07 1.83-.67 3.65-1.79 5.08-1.57 2-4.04 3.19-6.58 3.16-2.54-.03-4.94-1.28-6.39-3.37C-1.12 16.03-1 12.02 1.94 9.69c1.67-1.32 3.84-1.92 5.99-1.63V11.8c-1.33-.21-2.73.13-3.75 1.05-.98.88-1.48 2.22-1.33 3.51.15 1.3 1 2.45 2.19 2.97 1.25.55 2.76.43 3.89-.31.86-.57 1.39-1.51 1.48-2.54.06-4.52.02-9.04.04-13.56.1-.21.09-.45.09-.67-.01-.08-.01-.16-.01-.25z" />
                </svg>
              </a>
              {/* Youtube */}
              <a
                href="https://www.youtube.com/@mtsn1acehbaratdaya364"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white border border-gray-200 text-gray-500 hover:text-brand-green hover:border-brand-green/30 shadow-xs hover:shadow-md transition-all duration-300"
                aria-label="Youtube MTsN 1 Abdya"
              >
                <svg
                  className="w-4 h-4 fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* KOLOM 2: TAUTAN CEPAT (PROFIL) */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-extrabold text-brand-green uppercase tracking-wider">
              Profil Madrasah
            </h3>
            <ul className="grid gap-2.5 text-sm font-semibold">
              <li>
                <Link href="/profil/sejarah" className="hover:text-brand-green transition-colors">
                  Sejarah Singkat
                </Link>
              </li>
              <li>
                <Link href="/profil/visi-misi" className="hover:text-brand-green transition-colors">
                  Visi & Misi
                </Link>
              </li>
              <li>
                <Link href="/profil/staf" className="hover:text-brand-green transition-colors">
                  Direktori Guru & Staf
                </Link>
              </li>
              <li>
                <Link href="/kabar/berita" className="hover:text-brand-green transition-colors">
                  Berita & Kegiatan
                </Link>
              </li>
            </ul>
          </div>

          {/* KOLOM 3: PORTAL LAYANAN */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-extrabold text-brand-green uppercase tracking-wider">
              Layanan & Dokumen
            </h3>
            <ul className="grid gap-2.5 text-sm font-semibold">
              <li>
                <Link href="/layanan" className="hover:text-brand-green transition-colors">
                  Portal Layanan Terpadu
                </Link>
              </li>
              <li>
                <Link href="/layanan/unduh" className="hover:text-brand-green transition-colors">
                  Download Center Dokumen
                </Link>
              </li>
              <li>
                <a href="https://emisgtk.kemenag.go.id/" target="_blank" rel="noreferrer" className="hover:text-brand-green transition-colors">
                  EMIS Kemenag
                </a>
              </li>
            </ul>
          </div>

          {/* KOLOM 4: INFO KONTAK */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-extrabold text-brand-green uppercase tracking-wider">
              Hubungi Kami
            </h3>
            <ul className="grid gap-3.5 text-sm font-medium">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Jl. Pendidikan No. 56, Desa Pantai Perak, Kec. Susoh, Kab. Aceh Barat Daya, Prov. Aceh.
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-brand-green shrink-0" />
                <span className="break-all">mtsn1acehbaratdaya@gmail.com</span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* BAGIAN BAWAH: HAK CIPTA */}
      <div className="w-full bg-gray-100 border-t border-gray-200/50 py-6 text-xs text-center font-semibold text-gray-500">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>
            © {currentYear} MTsN 1 Aceh Barat Daya. Hak Cipta Dilindungi Undang-Undang.
          </span>
          <span className="flex items-center gap-1.5">
            <Award className="w-4 h-4 text-brand-gold shrink-0" />
            <span>Madrasah Inovasi Kantor Wilayah Kementerian Agama Provinsi Aceh</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
