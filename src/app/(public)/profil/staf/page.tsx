// Path: src/app/(public)/profil/staf/page.tsx
import React from 'react'
import { connection } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'
import DirektoriStafClient, { type StaffMember } from './StafClient'

export default async function DirektoriStafPage() {
  await connection()

  let staffData: StaffMember[] = []

  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'staf',
      sort: 'urutan',
      depth: 1,
      overrideAccess: false,
    })
    staffData = result.docs.map((member) => ({
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
