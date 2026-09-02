// Path: src/app/(public)/profil/staf/page.tsx
import React from 'react'
import { connection } from 'next/server'
import { getStaff } from '@/lib/publicData'
import DirektoriStafClient, { type StaffMember } from './StafClient'

export default async function DirektoriStafPage() {
  await connection()

  let staffData: StaffMember[] = []

  try {
    staffData = (await getStaff()).map((member) => ({
      id: member.id,
      namaLengkap: member.namaLengkap,
      nip: member.nip,
      jabatan: member.jabatan,
      jenisPtk: member.jenisPtk,
      foto: member.foto,
      urutan: member.urutan,
    }))
  } catch (error) {
    console.error('Direktori staf tidak dapat dimuat', error instanceof Error ? error.message : 'unknown')
  }

  return (
    <DirektoriStafClient staffData={staffData} />
  )
}
