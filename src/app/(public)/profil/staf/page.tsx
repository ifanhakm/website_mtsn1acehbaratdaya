// Path: src/app/(public)/profil/staf/page.tsx
import React from 'react'
import { connection } from 'next/server'
import { getStaff } from '@/lib/publicData'
import { env } from '@/lib/env'
import DirektoriStafClient, { type StaffMember } from './StafClient'

function getDirectStaffPhotoUrl(namaLengkap: string, foto: unknown): string | null {
  if (typeof foto === 'object' && foto && 'url' in foto && typeof (foto as { url?: string }).url === 'string') {
    return (foto as { url: string }).url
  }
  if (typeof foto === 'string' && (foto.startsWith('http://') || foto.startsWith('https://') || foto.startsWith('/'))) {
    return foto
  }
  
  // Supabase CDN direct URL based on staff name (matches Supabase Storage bucket root)
  const endpoint = env.SUPABASE_S3_ENDPOINT || ''
  const derivedBaseUrl = endpoint.includes('.storage.supabase.co/storage/v1/s3')
    ? endpoint.replace('.storage.supabase.co/storage/v1/s3', '.supabase.co')
    : endpoint.replace(/\/storage\/v1\/s3\/?$/, '')
  const baseUrl = (env.SUPABASE_URL || derivedBaseUrl).replace(/\/+$/, '')
  const bucket = env.SUPABASE_BUCKET_NAME || 'media'

  if (baseUrl && namaLengkap) {
    return `${baseUrl}/storage/v1/object/public/${bucket}/${encodeURIComponent(namaLengkap.trim())}.webp`
  }

  return null
}

export default async function DirektoriStafPage() {
  await connection()

  let staffData: StaffMember[] = []

  try {
    const rawStaff = await getStaff()

    if (rawStaff && Array.isArray(rawStaff)) {
      staffData = rawStaff.map((member) => {
        const fotoUrl = getDirectStaffPhotoUrl(member.namaLengkap, member.foto)

        return {
          id: member.id,
          namaLengkap: member.namaLengkap || 'Nama Tidak Tersedia',
          nip: member.nip || null,
          jabatan: member.jabatan || 'Pendidik / Staf',
          jenisPtk: (member.jenisPtk === 'staf' ? 'staf' : 'guru') as 'guru' | 'staf',
          fotoUrl: fotoUrl,
          fotoAlt: `${member.namaLengkap} - ${member.jabatan}`,
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
