'use client'

import React, { useState, useEffect } from 'react'
import { X, Eye, ZoomIn, Download } from 'lucide-react'
import Image from 'next/image'

const posters = [
  {
    id: 1,
    src: '/poster1.png',
    alt: 'Sosialisasi Zona Integritas MTsN 1 Abdya',
    tag: 'Zona Integritas',
    title: 'Sosialisasi Pembangunan Zona Integritas (ZI)',
    desc: 'MTsN 1 Aceh Barat Daya berkomitmen penuh mewujudkan wilayah bebas korupsi, kolusi, nepotisme, serta meningkatkan mutu pelayanan publik yang bersih, cepat, dan transparan.'
  },
  {
    id: 2,
    src: '/poster2.png',
    alt: 'Kampanye Anti Korupsi MTsN 1 Abdya',
    tag: 'Anti Korupsi',
    title: 'Kampanye Anti Korupsi & Tolak Gratifikasi',
    desc: 'Menolak keras segala jenis pungutan liar (pungli), suap-menyuap, dan gratifikasi dalam bentuk apa pun demi menjaga marwah dan integritas moral seluruh warga madrasah.'
  },
  {
    id: 3,
    src: '/poster3.png',
    alt: 'Kampanye Anti Bullying MTsN 1 Abdya',
    tag: 'Anti Bullying',
    title: 'Kampanye Anti Bullying & Perundungan',
    desc: 'Mewujudkan lingkungan madrasah ramah anak yang aman, harmonis, dan saling menghargai. Zero tolerance untuk segala bentuk perundungan fisik, verbal, maupun siber.'
  }
]

export default function PosterCampaign() {
  const [activePoster, setActivePoster] = useState<typeof posters[0] | null>(null)

  // Efek keyboard Escape untuk menutup modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActivePoster(null)
    }
    if (activePoster) {
      window.addEventListener('keydown', handleKeyDown)
      // Kunci scroll pada halaman utama saat modal aktif
      document.body.style.overflow = 'hidden'
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [activePoster])

  return (
    <div className="mt-20 pt-16 border-t border-gray-200/60">
      {/* 1. KEPALA SEKSI KAMPANYE */}
      <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
        <h3 className="text-2xl font-bold text-gray-900 tracking-tight">
          Sosialisasi & Komitmen Bersama
        </h3>
        <p className="text-sm text-gray-500">
          MTsN 1 Aceh Barat Daya aktif mengampanyekan nilai-nilai integritas, pencegahan korupsi, dan menciptakan ruang belajar yang aman bagi seluruh siswa.
        </p>
      </div>

      {/* 2. GRID KARTU POSTER */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {posters.map((poster) => (
          <div 
            key={poster.id} 
            className="group bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer"
            onClick={() => setActivePoster(poster)}
          >
            <div className="relative aspect-[3/4] bg-gray-50 overflow-hidden">
              <Image 
                src={poster.src} 
                alt={poster.alt} 
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                priority={poster.id === 1}
              />
              {/* Efek Hover Masking dengan Zoom Icon */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2 text-white z-10">
                <div className="p-3 bg-white/20 backdrop-blur-md rounded-full">
                  <ZoomIn className="w-5 h-5 text-white" />
                </div>
                <span className="text-xs font-semibold tracking-wide">Klik untuk Perbesar</span>
              </div>
            </div>
            
            {/* Informasi & Tombol Aksi di Bawah Poster */}
            <div className="p-5 flex-1 flex flex-col justify-between border-t border-gray-50 bg-white">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-brand-green uppercase tracking-wider bg-brand-green/5 px-2 py-0.5 rounded-md">
                  {poster.tag}
                </span>
                <h4 className="font-bold text-gray-900 text-sm sm:text-base leading-snug">
                  {poster.title}
                </h4>
              </div>
              <button 
                onClick={(e) => {
                  e.stopPropagation() // Mencegah terpicunya onClick milik wrapper card
                  setActivePoster(poster)
                }}
                className="mt-4 inline-flex items-center justify-center gap-1.5 text-xs font-bold text-brand-green hover:text-white py-2.5 px-3 bg-brand-green/5 hover:bg-brand-green rounded-lg transition-all duration-200 w-full"
              >
                <Eye className="w-3.5 h-3.5" />
                Detail & Perbesar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 3. MODAL LIGHTBOX PREVIEW (POPUP DENGAN DETAIL KAMPANYE) */}
      {activePoster && (
        <div 
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 transition-opacity duration-300 animate-fade-in"
          onClick={() => setActivePoster(null)}
        >
          {/* Tombol X Close Floating */}
          <button 
            onClick={() => setActivePoster(null)}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors duration-200 focus:outline-none"
            aria-label="Tutup"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Konten Kotak Modal */}
          <div 
            className="relative max-w-4xl w-full flex flex-col md:flex-row bg-white rounded-3xl overflow-hidden shadow-2xl animate-scale-up"
            onClick={(e) => e.stopPropagation()} // Supaya klik di area putih tidak menutup modal
          >
            {/* Sisi Kiri: Gambar Poster Kualitas Penuh */}
            <div className="relative md:w-1/2 aspect-[3/4] md:aspect-auto md:h-[75vh] bg-gray-950 flex items-center justify-center">
              <Image 
                src={activePoster.src} 
                alt={activePoster.alt} 
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain p-2"
                priority
              />
            </div>

            {/* Sisi Kanan: Detail Informasi Poster & Tombol Unduh */}
            <div className="p-8 md:w-1/2 flex flex-col justify-between bg-white text-gray-900">
              <div className="space-y-6">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-brand-green/10 text-brand-green border border-brand-green/20 uppercase tracking-wide w-fit">
                  {activePoster.tag}
                </span>
                <div className="space-y-3">
                  <h4 className="text-xl sm:text-2xl font-bold leading-tight">
                    {activePoster.title}
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {activePoster.desc}
                  </p>
                </div>
              </div>

              {/* Tombol Download dan Close */}
              <div className="pt-8 border-t border-gray-100 flex flex-col sm:flex-row gap-3">
                <a 
                  href={activePoster.src} 
                  download={`poster-${activePoster.tag.toLowerCase().replace(' ', '-')}.png`}
                  className="inline-flex items-center justify-center gap-2 text-xs font-bold bg-brand-green hover:bg-brand-green-light text-white py-3 px-4 rounded-xl transition-colors duration-200 flex-1"
                >
                  <Download className="w-4 h-4" />
                  Unduh Poster Resmi
                </a>
                <button 
                  onClick={() => setActivePoster(null)}
                  className="inline-flex items-center justify-center gap-2 text-xs font-bold border border-gray-200 hover:bg-gray-50 text-gray-700 py-3 px-4 rounded-xl transition-all duration-200"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
