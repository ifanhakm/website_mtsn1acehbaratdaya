// Path: src/app/(public)/layanan/page.tsx
import React from 'react'
import { connection } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'
import LayananClient, { type LayananCategory, type LayananItem } from './LayananClient'

interface ServiceItemRecord {
  title: string
  description: string
  href: string
  isExternal?: boolean | null
  icon: LayananItem['icon']
  badge?: string | null
}

export default async function LayananPortalPage() {
  await connection()

  let dbLayanan: LayananCategory[] = []

  try {
    // 1. Inisialisasi Payload di Sisi Server
    const payload = await getPayload({ config })

    // 2. Tarik daftar kategori dan link layanan dari Supabase
    const result = await payload.find({
      collection: 'kategori-layanan',
      limit: 50, // Batas maksimal kategori
      sort: 'createdAt',
    })

    // 3. Petakan format database ke dalam tipe format props LayananClient
    dbLayanan = result.docs.map((doc) => ({
      categoryName: doc.name,
      categoryDesc: doc.description,
      items: (doc.items || []).map((item: ServiceItemRecord) => ({
        title: item.title,
        description: item.description,
        href: item.href,
        isExternal: item.isExternal ?? true,
        icon: item.icon,
        badge: item.badge || undefined,
      }))
    }))
  } catch (error) {
    console.error("Gagal menarik data kategori layanan dari database Supabase:", error)
  }

  return (
    // 4. Kirimkan data ke Client Component (dengan smart fallback di dalamnya jika data db kosong)
    <LayananClient dbLayanan={dbLayanan} />
  )
}
