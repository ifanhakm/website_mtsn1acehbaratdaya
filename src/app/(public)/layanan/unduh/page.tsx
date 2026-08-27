// Path: src/app/(public)/layanan/unduh/page.tsx
import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import UnduhClient, { type DocumentItem } from './UnduhClient'

export default async function DownloadCenterPage() {
  let dbDocuments: DocumentItem[] = []

  try {
    // 1. Inisialisasi Payload di Sisi Server
    const payload = await getPayload({ config })

    // 2. Tarik daftar berkas dokumen yang diunggah dari Supabase
    const result = await payload.find({
      collection: 'dokumen',
      limit: 100, // Batas maksimal pengambilan dokumen sekaligus
    })

    // 3. Konversi format data Payload ke format props yang ramah bagi Client Component
    dbDocuments = result.docs.map((doc: any) => {
      // Deteksi format berkas (PDF atau DOCX) berdasarkan mimeType / nama file
      const extension = doc.filename ? doc.filename.split('.').pop().toUpperCase() : 'FILE'
      const fileType = extension

      // Format ukuran berkas agar mudah dibaca manusia (KB / MB)
      const sizeInKb = doc.filesize ? Math.round(doc.filesize / 1024) : 0
      const fileSize = sizeInKb > 1000 
        ? `${(sizeInKb / 1024).toFixed(1)} MB` 
        : `${sizeInKb} KB`

      return {
        id: doc.id,
        title: doc.title,
        description: doc.description,
        category: doc.category || 'siswa',
        fileSize: fileSize,
        fileType: fileType,
        fileName: doc.filename,
        fileUrl: doc.url, // Tautan download langsung ke Supabase Storage
        badge: doc.badge || undefined,
      }
    })
  } catch (error) {
    console.error("Gagal menarik data dokumen dari database Supabase:", error)
  }

  return (
    // 4. Oper dokumen dinamis ke Client Component
    <UnduhClient dbDocuments={dbDocuments} />
  )
}
