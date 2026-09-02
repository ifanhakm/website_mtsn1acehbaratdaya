// Path: src/app/(public)/kabar/galeri/page.tsx
import React from 'react'
import { connection } from 'next/server'
import { getGalleryEntries } from '@/lib/publicData'
import GaleriClient, { type GaleriItem } from './GaleriClient'

export default async function KabarGaleriPage() {
  await connection()

  let dbGaleri: GaleriItem[] = []

  try {
    dbGaleri = (await getGalleryEntries()).map((doc) => {
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
