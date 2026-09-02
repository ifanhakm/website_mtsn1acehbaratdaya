// Path: src/app/(public)/profil/staf/page.tsx
import React from 'react'
import { connection } from 'next/server'
import { getStaff } from '@/lib/publicData'
import DirektoriStafClient, { type StaffMember } from './StafClient'

const getSupabasePhotoUrl = (fileName: string) =>
  `https://hwvcfplrligtefwazxkt.supabase.co/storage/v1/object/public/media/media/${encodeURIComponent(fileName)}.webp`

// Daftar Guru & Tenaga Kependidikan Resmi dari Supabase Storage
const defaultStaffList: StaffMember[] = [
  {
    id: 'staf-1',
    namaLengkap: 'Afrizah, S. Ag.',
    nip: '197008151998032002',
    jabatan: 'Kepala Madrasah',
    jenisPtk: 'guru',
    fotoUrl: getSupabasePhotoUrl('Afrizah, S. Ag.'),
    fotoAlt: 'Afrizah, S. Ag. - Kepala MTsN 1 Aceh Barat Daya',
    urutan: 1,
  },
  {
    id: 'staf-2',
    namaLengkap: 'Akmal, S. Pd. I.',
    nip: '197505122005011003',
    jabatan: 'Wakil Kepala Bidang Kurikulum',
    jenisPtk: 'guru',
    fotoUrl: getSupabasePhotoUrl('Akmal, S. Pd. I.'),
    fotoAlt: 'Akmal, S. Pd. I. - Waka Kurikulum',
    urutan: 2,
  },
  {
    id: 'staf-3',
    namaLengkap: 'Zulkifli, S. Pd.',
    nip: '197803102007011015',
    jabatan: 'Wakil Kepala Bidang Kesiswaan',
    jenisPtk: 'guru',
    fotoUrl: getSupabasePhotoUrl('Zulkifli, S. Pd.'),
    fotoAlt: 'Zulkifli, S. Pd. - Waka Kesiswaan',
    urutan: 3,
  },
  {
    id: 'staf-4',
    namaLengkap: 'Cut Maulidian, S. Pd.',
    jabatan: 'Guru Mata Pelajaran',
    jenisPtk: 'guru',
    fotoUrl: getSupabasePhotoUrl('Cut Maulidian, S. Pd.'),
    fotoAlt: 'Cut Maulidian, S. Pd.',
    urutan: 4,
  },
  {
    id: 'staf-5',
    namaLengkap: 'Cut Safrina, S. Pd.',
    jabatan: 'Guru Mata Pelajaran',
    jenisPtk: 'guru',
    fotoUrl: getSupabasePhotoUrl('Cut Safrina, S. Pd.'),
    fotoAlt: 'Cut Safrina, S. Pd.',
    urutan: 5,
  },
  {
    id: 'staf-6',
    namaLengkap: 'Herza Isman, SA, S. Pd.',
    jabatan: 'Guru Mata Pelajaran',
    jenisPtk: 'guru',
    fotoUrl: getSupabasePhotoUrl('Herza Isman, SA, S. Pd.'),
    fotoAlt: 'Herza Isman, SA, S. Pd.',
    urutan: 6,
  },
  {
    id: 'staf-7',
    namaLengkap: 'Husri Mulyatina, S. Pd.',
    jabatan: 'Guru Mata Pelajaran',
    jenisPtk: 'guru',
    fotoUrl: getSupabasePhotoUrl('Husri Mulyatina, S. Pd.'),
    fotoAlt: 'Husri Mulyatina, S. Pd.',
    urutan: 7,
  },
  {
    id: 'staf-8',
    namaLengkap: 'Mawardi, S. Pd.',
    jabatan: 'Guru Mata Pelajaran',
    jenisPtk: 'guru',
    fotoUrl: getSupabasePhotoUrl('Mawardi, S. Pd.'),
    fotoAlt: 'Mawardi, S. Pd.',
    urutan: 8,
  },
  {
    id: 'staf-9',
    namaLengkap: 'Maya Audina, S. Pd.',
    jabatan: 'Guru Mata Pelajaran',
    jenisPtk: 'guru',
    fotoUrl: getSupabasePhotoUrl('Maya Audina, S. Pd.'),
    fotoAlt: 'Maya Audina, S. Pd.',
    urutan: 9,
  },
  {
    id: 'staf-10',
    namaLengkap: 'Mila Karmila, S. Pd.',
    jabatan: 'Guru Mata Pelajaran',
    jenisPtk: 'guru',
    fotoUrl: getSupabasePhotoUrl('Mila Karmila, S. Pd.'),
    fotoAlt: 'Mila Karmila, S. Pd.',
    urutan: 10,
  },
  {
    id: 'staf-11',
    namaLengkap: 'Misnaiyah, S. Pd.',
    jabatan: 'Guru Mata Pelajaran',
    jenisPtk: 'guru',
    fotoUrl: getSupabasePhotoUrl('Misnaiyah, S. Pd.'),
    fotoAlt: 'Misnaiyah, S. Pd.',
    urutan: 11,
  },
  {
    id: 'staf-12',
    namaLengkap: 'Mulyani, S. Pd. I.',
    jabatan: 'Guru Pendidikan Agama Islam',
    jenisPtk: 'guru',
    fotoUrl: getSupabasePhotoUrl('Mulyani, S. Pd. I.'),
    fotoAlt: 'Mulyani, S. Pd. I.',
    urutan: 12,
  },
  {
    id: 'staf-13',
    namaLengkap: 'Putriani, S. Pd.',
    jabatan: 'Guru Mata Pelajaran',
    jenisPtk: 'guru',
    fotoUrl: getSupabasePhotoUrl('Putriani, S. Pd.'),
    fotoAlt: 'Putriani, S. Pd.',
    urutan: 13,
  },
  {
    id: 'staf-14',
    namaLengkap: 'Rahmi Hayati, S. Pd.',
    jabatan: 'Guru Mata Pelajaran',
    jenisPtk: 'guru',
    fotoUrl: getSupabasePhotoUrl('Rahmi Hayati, S. Pd.'),
    fotoAlt: 'Rahmi Hayati, S. Pd.',
    urutan: 14,
  },
  {
    id: 'staf-15',
    namaLengkap: 'Rahmiati yusra, S. Pd.',
    jabatan: 'Guru Mata Pelajaran',
    jenisPtk: 'guru',
    fotoUrl: getSupabasePhotoUrl('Rahmiati yusra, S. Pd.'),
    fotoAlt: 'Rahmiati yusra, S. Pd.',
    urutan: 15,
  },
  {
    id: 'staf-16',
    namaLengkap: 'Sarwan, S. Pd. I.',
    jabatan: 'Guru Pendidikan Agama Islam',
    jenisPtk: 'guru',
    fotoUrl: getSupabasePhotoUrl('Sarwan, S. Pd. I.'),
    fotoAlt: 'Sarwan, S. Pd. I.',
    urutan: 16,
  },
  {
    id: 'staf-17',
    namaLengkap: 'Sarwati, S. Pd.',
    jabatan: 'Guru Mata Pelajaran',
    jenisPtk: 'guru',
    fotoUrl: getSupabasePhotoUrl('Sarwati, S. Pd.'),
    fotoAlt: 'Sarwati, S. Pd.',
    urutan: 17,
  },
  {
    id: 'staf-18',
    namaLengkap: 'Siti Riffa Resa, S. Pd.',
    jabatan: 'Guru Mata Pelajaran',
    jenisPtk: 'guru',
    fotoUrl: getSupabasePhotoUrl('Siti Riffa Resa, S. Pd.'),
    fotoAlt: 'Siti Riffa Resa, S. Pd.',
    urutan: 18,
  },
  {
    id: 'staf-19',
    namaLengkap: 'Suredna, S. Pd.',
    jabatan: 'Guru Mata Pelajaran',
    jenisPtk: 'guru',
    fotoUrl: getSupabasePhotoUrl('Suredna, S. Pd.'),
    fotoAlt: 'Suredna, S. Pd.',
    urutan: 19,
  },
  {
    id: 'staf-20',
    namaLengkap: 'Tirta Jannah, S. Pd.',
    jabatan: 'Guru Mata Pelajaran',
    jenisPtk: 'guru',
    fotoUrl: getSupabasePhotoUrl('Tirta Jannah, S. Pd.'),
    fotoAlt: 'Tirta Jannah, S. Pd.',
    urutan: 20,
  },
  {
    id: 'staf-21',
    namaLengkap: 'Fikri',
    jabatan: 'Guru / Tenaga Pengajar',
    jenisPtk: 'guru',
    fotoUrl: getSupabasePhotoUrl('Fikri'),
    fotoAlt: 'Fikri',
    urutan: 21,
  },
  {
    id: 'staf-22',
    namaLengkap: 'Karimul, A.',
    jabatan: 'Guru / Tenaga Pengajar',
    jenisPtk: 'guru',
    fotoUrl: getSupabasePhotoUrl('Karimul, A.'),
    fotoAlt: 'Karimul, A.',
    urutan: 22,
  },
  {
    id: 'staf-23',
    namaLengkap: 'Mursal',
    jabatan: 'Tenaga Kependidikan / Staf Administrasi',
    jenisPtk: 'staf',
    fotoUrl: getSupabasePhotoUrl('Mursal'),
    fotoAlt: 'Mursal',
    urutan: 23,
  },
  {
    id: 'staf-24',
    namaLengkap: 'Mulyadi, S. Kom.',
    nip: '198509152011011008',
    jabatan: 'Kepala Tata Usaha / Tenaga Kependidikan',
    jenisPtk: 'staf',
    fotoUrl: getSupabasePhotoUrl('Mulyadi, S. Kom.'),
    fotoAlt: 'Mulyadi, S. Kom. - Kepala Tata Usaha',
    urutan: 24,
  },
]

export default async function DirektoriStafPage() {
  await connection()

  let staffData: StaffMember[] = []

  try {
    // Proteksi timeout 1.5 detik agar halaman TIDAK AKAN PERNAH menggantung jika koneksi database sedang lambat
    const rawStaff = await Promise.race([
      getStaff(),
      new Promise<null>((resolve) => setTimeout(() => resolve(null), 1500)),
    ])

    if (rawStaff && Array.isArray(rawStaff) && rawStaff.length > 0) {
      staffData = rawStaff.map((member) => {
        let fotoUrl: string | null = null
        if (typeof member.foto === 'object' && member.foto && 'url' in member.foto && typeof member.foto.url === 'string') {
          fotoUrl = member.foto.url
        } else if (member.namaLengkap) {
          fotoUrl = getSupabasePhotoUrl(member.namaLengkap.trim())
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
    console.error('Direktori staf fallback aktif:', error instanceof Error ? error.message : 'unknown')
  }

  // Gunakan data guru resmi Supabase jika database sedang query lambat atau masih kosong
  const finalStaffData = staffData.length > 0 ? staffData : defaultStaffList

  return (
    <DirektoriStafClient staffData={finalStaffData} />
  )
}
