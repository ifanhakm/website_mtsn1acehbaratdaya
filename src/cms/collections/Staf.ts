import { CollectionConfig } from 'payload'
import { revalidatePublicTags } from '../../lib/revalidate'

export const Staf: CollectionConfig = {
  slug: 'staf',
  labels: {
    singular: 'Guru & Staf',
    plural: 'Direktori Guru & Staf',
  },
  admin: {
    useAsTitle: 'namaLengkap',
    defaultColumns: ['namaLengkap', 'jabatan', 'jenisPtk', 'urutan'],
  },
  access: {
    read: () => true, // Mengizinkan semua pengunjung melihat data guru & staf
  },
  hooks: {
    afterChange: [({ doc }) => { revalidatePublicTags('staf'); return doc }],
    afterDelete: [({ doc }) => { revalidatePublicTags('staf'); return doc }],
  },
  fields: [
    {
      name: 'namaLengkap',
      type: 'text',
      label: 'Nama Lengkap & Gelar',
      required: true,
    },
    {
      name: 'nip',
      type: 'text',
      label: 'NIP / NUPTK (Kosongkan jika tidak ada)',
    },
    {
      name: 'jabatan',
      type: 'text',
      label: 'Jabatan (misal: Kepala Madrasah, Guru Bahasa Indonesia, Staf Tata Usaha)',
      required: true,
    },
    {
      name: 'jenisPtk',
      type: 'select',
      label: 'Kategori Kepegawaian',
      required: true,
      options: [
        {
          label: 'Guru / Tenaga Pendidik',
          value: 'guru',
        },
        {
          label: 'Tenaga Kependidikan / Staf TU',
          value: 'staf',
        },
      ],
      defaultValue: 'guru',
    },
    {
      name: 'foto',
      type: 'upload',
      relationTo: 'media', // Menghubungkan ke koleksi Media (Supabase Storage)
      label: 'Foto Resmi',
      required: true,
    },
    {
      name: 'urutan',
      type: 'number',
      label: 'Urutan Tampilan (Angka kecil muncul lebih atas, misal: Kepala Madrasah = 1, Waka = 2)',
      required: true,
      defaultValue: 99,
    },
  ],
}

export default Staf
