import { CollectionConfig } from 'payload'
import { revalidatePublicTags } from '../../lib/revalidate'

export const Galeri: CollectionConfig = {
  slug: 'galeri',
  labels: {
    singular: 'Galeri',
    plural: 'Galeri (Dokumentasi Foto)',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'date', 'image'],
  },
  access: {
    read: () => true, // Publik bisa melihat galeri
    create: ({ req: { user } }) => !!user, // Hanya admin yang login bisa mengelola
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  hooks: {
    afterChange: [({ doc }) => { revalidatePublicTags('galeri'); return doc }],
    afterDelete: [({ doc }) => { revalidatePublicTags('galeri'); return doc }],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Judul Dokumentasi',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Deskripsi Lengkap Kegiatan',
      required: true,
    },
    {
      name: 'category',
      type: 'select',
      label: 'Kategori Kegiatan',
      required: true,
      defaultValue: 'kegiatan',
      options: [
        { label: 'Kegiatan Siswa', value: 'kegiatan' },
        { label: 'Sarana & Prasarana', value: 'fasilitas' },
        { label: 'Prestasi & Penghargaan', value: 'prestasi' },
        { label: 'Keagamaan & Imtaq', value: 'keagamaan' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'date',
      type: 'text',
      label: 'Tanggal Kegiatan (misal: 12 Agustus 2026)',
      required: true,
      admin: {
        position: 'sidebar',
        placeholder: '12 Agustus 2026',
      },
    },
    {
      name: 'aspectRatio',
      type: 'select',
      label: 'Rasio Foto Tampilan (untuk Layout Masonry)',
      required: true,
      defaultValue: 'aspect-video',
      options: [
        { label: 'Square (1:1)', value: 'aspect-square' },
        { label: 'Video (16:9)', value: 'aspect-video' },
        { label: 'Standard (4:3)', value: 'aspect-[4/3]' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Foto Dokumentasi',
      required: true,
    },
  ],
}

export default Galeri
