// Path: src/app/(public)/profil/staf/page.tsx
import React from 'react'
import { connection } from 'next/server'
import { getStaff } from '@/lib/publicData'
import DirektoriStafClient, { type StaffMember } from './StafClient'

function normalizeMediaUrl(url: string | null | undefined): string | null {
  if (!url) return null
  if (url.startsWith('https://mtsn1acehbaratdaya.sch.id/api/')) {
    return url.replace('https://mtsn1acehbaratdaya.sch.id', '')
  }
  if (url.startsWith('http://43.173.7.84/api/')) {
    return url.replace('http://43.173.7.84', '')
  }
  return url
}

export default async function DirektoriStafPage() {
  await connection()

  let staffData: StaffMember[] = []

  try {
    const rawStaff = await Promise.race([
      getStaff(),
      new Promise<null>((resolve) => setTimeout(() => resolve(null), 3000)),
    ])

    if (rawStaff && Array.isArray(rawStaff)) {
      staffData = rawStaff.map((member) => {
        const fotoObj = typeof member.foto === 'object' && member.foto ? member.foto : null
        const rawUrl = fotoObj?.url || (typeof member.foto === 'string' ? member.foto : null)
        const fotoUrl = normalizeMediaUrl(rawUrl)
        const fotoAlt = fotoObj?.alt || member.namaLengkap

        return {
          id: member.id,
          namaLengkap: member.namaLengkap || 'Nama Tidak Tersedia',
          nip: member.nip || null,
          jabatan: member.jabatan || 'Pendidik / Staf',
          jenisPtk: (member.jenisPtk === 'staf' ? 'staf' : 'guru') as 'guru' | 'staf',
          fotoUrl: fotoUrl,
          fotoAlt: fotoAlt,
          urutan: typeof member.urutan === 'number' ? member.urutan : 99,
        }
      })
    }
  } catch (error) {
    console.error('Direktori staf tidak dapat dimuat', error instanceof Error ? error.message : 'unknown')
  }

  return (
    <DirektoriStafClient staffData={staffData} />
  )
}
