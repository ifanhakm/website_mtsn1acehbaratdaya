// Path: src/app/(public)/profil/staf/page.tsx
import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import DirektoriStafClient, { type StaffMember } from './StafClient'

// Cache halaman ini di server selama 1 jam demi performa loading kilat
export const revalidate = 3600

export default async function DirektoriStafPage() {
  const payload = await getPayload({ config })  
  
  const result = await payload.find({
    collection: 'staf',
    sort: 'urutan',
  })

  return (
    <DirektoriStafClient staffData={result.docs as unknown as StaffMember[]} />
  )
}
