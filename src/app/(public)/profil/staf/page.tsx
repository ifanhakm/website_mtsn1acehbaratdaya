// Path: src/app/(public)/profil/staf/page.tsx
import React from 'react'
import { connection } from 'next/server'
import { getStaff } from '@/lib/publicData'
import DirektoriStafClient, { type StaffMember } from './StafClient'

// Data guru & staf fallback (dengan tautan fisik Supabase Storage)
const defaultStaffList: StaffMember[] = [
  {
    id: 'staf-1',
    namaLengkap: 'Afrizah, S. Ag.',
    nip: '197008151998032002',
    jabatan: 'Kepala Madrasah',
    jenisPtk: 'guru',
    fotoUrl: 'https://hwvcfplrligtefwazxkt.supabase.co/storage/v1/object/public/media/media/Afrizah,%20S.%20Ag.webp',
    fotoAlt: 'Afrizah, S. Ag. - Kepala MTsN 1 Aceh Barat Daya',
    urutan: 1,
  },
  {
    id: 'staf-2',
    namaLengkap: 'Akmal, S. Pd. I.',
    nip: '197505122005011003',
    jabatan: 'Wakil Kepala Bidang Kurikulum',
    jenisPtk: 'guru',
    fotoUrl: 'https://hwvcfplrligtefwazxkt.supabase.co/storage/v1/object/public/media/media/Akmal,%20S.%20Pd.%20I.webp',
    fotoAlt: 'Akmal, S. Pd. I. - Waka Kurikulum',
    urutan: 2,
  },
  {
    id: 'staf-3',
    namaLengkap: 'Zulkifli, S. Pd.',
    nip: '197803102007011015',
    jabatan: 'Wakil Kepala Bidang Kesiswaan',
    jenisPtk: 'guru',
    fotoUrl: 'https://hwvcfplrligtefwazxkt.supabase.co/storage/v1/object/public/media/media/Zulkifli,%20S.%20Pd.webp',
    fotoAlt: 'Zulkifli, S. Pd. - Waka Kesiswaan',
    urutan: 3,
  },
  {
    id: 'staf-4',
    namaLengkap: 'Cut Maulidian, S. Pd.',
    nip: '198211042009122001',
    jabatan: 'Guru Pengajar',
    jenisPtk: 'guru',
    fotoUrl: 'https://hwvcfplrligtefwazxkt.supabase.co/storage/v1/object/public/media/media/Cut%20Maulidian,%20S.%20Pd.webp',
    fotoAlt: 'Cut Maulidian, S. Pd. - Dewan Guru',
    urutan: 4,
  },
  {
    id: 'staf-5',
    namaLengkap: 'Cut Safrina, S. Pd.webp',
    nip: '198406182010012012',
    jabatan: 'Guru Pengajar',
    jenisPtk: 'guru',
    fotoUrl: 'https://hwvcfplrligtefwazxkt.supabase.co/storage/v1/object/public/media/media/Cut%20Safrina,%20S.%20Pd.webp',
    fotoAlt: 'Cut Safrina, S. Pd. - Dewan Guru',
    urutan: 5,
  },
  {
    id: 'staf-6',
    namaLengkap: 'Mulyadi, S. Kom.',
    nip: '198509152011011008',
    jabatan: 'Kepala Tata Usaha / Staf TU',
    jenisPtk: 'staf',
    fotoUrl: 'https://hwvcfplrligtefwazxkt.supabase.co/storage/v1/object/public/media/media/Mulyadi,%20S.%20Kom.webp',
    fotoAlt: 'Mulyadi, S. Kom. - Staf Tata Usaha',
    urutan: 6,
  },
]

export default async function DirektoriStafPage() {
  await connection()

  let staffData: StaffMember[] = []

  try {
    const rawStaff = await getStaff()

    if (rawStaff && Array.isArray(rawStaff) && rawStaff.length > 0) {
      staffData = rawStaff.map((member) => {
        let fotoUrl: string | null = null
        if (typeof member.foto === 'object' && member.foto && 'url' in member.foto && typeof member.foto.url === 'string') {
          fotoUrl = member.foto.url
        } else if (member.namaLengkap) {
          fotoUrl = `https://hwvcfplrligtefwazxkt.supabase.co/storage/v1/object/public/media/media/${encodeURIComponent(member.namaLengkap.trim())}.webp`
        }

        return {
          id: member.id,
          namaLengkap: member.namaLengkap || 'Nama Tidak Tersedia',
          nip: member.nip || null,
          jabatan: member.jabatan || 'Pendidik / Staf',
          jenisPtk: (member.jenisPtk === 'staf' ? 'staf' : 'guru') as 'guru' | 'staf',
          fotoUrl: fotoUrl,
          fotoAlt: member.namaLengkap,
          urutan: typeof member.urutan === 'number' ? member.urutan : 99,
        }
      })
    }
  } catch (error) {
    console.error('Direktori staf tidak dapat dimuat dari database:', error instanceof Error ? error.message : 'unknown')
  }

  // Jika database masih kosong / belum ada data, gunakan daftar dewan guru resmi dari Supabase
  const finalStaffData = staffData.length > 0 ? staffData : defaultStaffList

  return (
    <DirektoriStafClient staffData={finalStaffData} />
  )
}
