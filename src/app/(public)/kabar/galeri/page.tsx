// Path: src/app/(public)/kabar/galeri/page.tsx
import React from 'react'
import { connection } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'
import GaleriClient, { type GaleriItem } from './GaleriClient'

export default async function KabarGaleriPage() {
  await connection()

  let dbGaleri: GaleriItem[] = []

  try {
    // 1. Inisialisasi Payload di Sisi Server
    const payload = await getPayload({ config })

    // 2. Tarik daftar galeri foto dari Supabase
    const result = await payload.find({
      collection: 'galeri',
      limit: 100, // Ambil hingga 100 foto teratas
      sort: '-createdAt', // Urutan terbaru di atas
    })

    // 3. Konversi format data database ke format props GaleriClient
    dbGaleri = result.docs.map((doc) => {
      // Dapatkan URL gambar dinamis dari Supabase Storage jika media terhubung
      const imageUrl = doc.image && typeof doc.image === 'object' 
        ? (doc.image.url || null) 
        : null

      return {
        id: String(doc.id),
        title: doc.title,
        description: doc.description,
        category: doc.category || 'kegiatan',
        date: doc.date,
        imageUrl: imageUrl,
        aspectRatio: doc.aspectRatio || 'aspect-video',
      }
    })
  } catch (error) {
    console.error("Gagal menarik data galeri dari database Supabase:", error)
  }

  return (
    // 4. Kirimkan data ke Client Component
    <GaleriClient dbGaleri={dbGaleri} />
  )
}
