// Path: src/app/(public)/profil/staf/page.tsx
import React from 'react'
import { connection } from 'next/server'
import { getStaff } from '@/lib/publicData'
import DirektoriStafClient, { type StaffMember } from './StafClient'

export default async function DirektoriStafPage() {
  await connection()
  const staffData: StaffMember[] = await getStaff()

  return (
    <DirektoriStafClient staffData={staffData} />
  )
}
