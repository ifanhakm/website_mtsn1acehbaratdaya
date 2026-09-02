// Path: src/app/(public)/profil/staf/page.tsx
import React from 'react'
import { connection } from 'next/server'
import { getStaff } from '@/lib/publicData'
import DirektoriStafClient, { type StaffMember } from './StafClient'

export default async function DirektoriStafPage() {
  await connection()

  let staffData: StaffMember[] = []

  try {
    staffData = await getStaff()
  } catch (error) {
    console.error('Direktori staf gagal dimuat dari database Supabase:', error instanceof Error ? error.message : 'unknown')
  }

  return (
    <DirektoriStafClient staffData={staffData} />
  )
}
