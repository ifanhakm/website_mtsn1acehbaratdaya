// Path: src/app/(public)/layanan/unduh/page.tsx
import React from 'react'
import { connection } from 'next/server'
import UnduhClient, { type DocumentItem } from './UnduhClient'
import { z } from 'zod'
import { getDocuments } from '@/lib/publicData'

const documentRecordSchema = z.object({
  id: z.union([z.string(), z.number()]),
  title: z.string(),
  description: z.string(),
  category: z.enum(['siswa', 'kepegawaian', 'umum']).nullish(),
  filename: z.string().nullish(),
  filesize: z.number().nullish(),
  url: z.string().nullish(),
  badge: z.string().nullish(),
})

export default async function DownloadCenterPage() {
  await connection()

  const dbDocuments: DocumentItem[] = (await getDocuments()).flatMap((value) => {
      const parsed = documentRecordSchema.safeParse(value)
      if (!parsed.success) return []
      const doc = parsed.data
      // Deteksi format berkas (PDF atau DOCX) berdasarkan mimeType / nama file
      const extension = doc.filename ? doc.filename.split('.').pop()?.toUpperCase() || 'FILE' : 'FILE'
      const fileType = extension

      // Format ukuran berkas agar mudah dibaca manusia (KB / MB)
      const sizeInKb = doc.filesize ? Math.round(doc.filesize / 1024) : 0
      const fileSize = sizeInKb > 1000 
        ? `${(sizeInKb / 1024).toFixed(1)} MB` 
        : `${sizeInKb} KB`

      return [{
        id: doc.id,
        title: doc.title,
        description: doc.description,
        category: doc.category || 'siswa',
        fileSize: fileSize,
        fileType: fileType,
        fileName: doc.filename || '',
        fileUrl: doc.url || undefined,
        badge: doc.badge || undefined,
      }]
    })

  return (
    // 4. Oper dokumen dinamis ke Client Component
    <UnduhClient dbDocuments={dbDocuments} />
  )
}
