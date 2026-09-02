// Path: src/app/(public)/profil/staf/page.tsx
import React from 'react'
import { connection } from 'next/server'
import { getStaff } from '@/lib/publicData'
import DirektoriStafClient, { type StaffMember } from './StafClient'

export default async function DirektoriStafPage() {
  await connection()

  let staffData: StaffMember[] = []

  try {
    const rawStaff = await getStaff()
    staffData = (rawStaff || []).map((member) => {
      const fotoObj = typeof member.foto === 'object' && member.foto ? member.foto : null
      const fotoUrl = fotoObj?.url || (typeof member.foto === 'string' ? member.foto : null)
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
  } catch (error) {
    console.error('Direktori staf tidak dapat dimuat', error instanceof Error ? error.message : 'unknown')
  }

  return (
    <DirektoriStafClient staffData={staffData} />
  )
}
