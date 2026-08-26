// Path: src/app/(public)/kabar/berita/page.tsx
import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import BeritaClient, { type Post } from './BeritaClient'

export default async function BeritaPage() {
  // 1. Inisialisasi Payload Instance
  const payload = await getPayload({ config })

  // 2. Tarik data berita yang berstatus 'published' dari Supabase
  const result = await payload.find({
    collection: 'berita',
    where: {
      status: {
        equals: 'published', // Hanya tampilkan berita yang sudah siap terbit
      },
    },
    sort: '-date', // Urutkan dari berita terbaru ke terlama
  })

  return (
    // 3. Kirim data ke Client Component dengan type assertion yang aman
    <BeritaClient beritaData={result.docs as unknown as Post[]} />
  )
}