// Path: src/collections/KategoriLayanan.ts
import { CollectionConfig } from 'payload'

export const KategoriLayanan: CollectionConfig = {
  slug: 'kategori-layanan',
  labels: {
    singular: 'Kategori Layanan',
    plural: 'Daftar Layanan Publik',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'description'],
  },
  access: {
    read: () => true, // Publik bisa melihat daftar layanan
    create: ({ req: { user } }) => !!user, // Hanya admin yang login bisa mengelola
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Nama Kategori Layanan',
      required: true,
      admin: {
        description: 'Contoh: Layanan Akademik & Kemenag, Administrasi & Pusat Unduh',
      },
    },
    {
      name: 'description',
      type: 'text',
      label: 'Deskripsi Kategori',
      required: true,
      admin: {
        description: 'Penjelasan singkat kelompok layanan ini.',
      },
    },
    {
      name: 'items',
      type: 'array',
      label: 'Daftar Layanan Terkait',
      required: true,
      labels: {
        singular: 'Item Layanan',
        plural: 'Item-Item Layanan',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Nama Layanan / Tombol',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Penjelasan Singkat Layanan',
          required: true,
        },
        {
          name: 'href',
          type: 'text',
          label: 'Alamat Link Tujuan (URL)',
          required: true,
          admin: {
            description: 'Bisa link internal (seperti "/layanan/unduh") atau eksternal (seperti "https://rdm.kemenag.go.id")',
          },
        },
        {
          name: 'isExternal',
          type: 'checkbox',
          label: 'Buka di Tab Baru (External Link)?',
          defaultValue: true,
        },
        {
          name: 'icon',
          type: 'select',
          label: 'Ikon Layanan',
          required: true,
          defaultValue: 'pusaka',
          options: [
            { label: 'Graduation Cap (Rapor/RDM)', value: 'rdm' },
            { label: 'File Text (EMIS)', value: 'emis' },
            { label: 'Shield Check (Pusaka)', value: 'pusaka' },
            { label: 'Download Symbol (Unduhan)', value: 'download' },
            { label: 'Book Open (Surat Aktif)', value: 'aktif' },
            { label: 'Users Group (ASN Portal)', value: 'asn' },
            { label: 'Building (PPDB Online)', value: 'ppdb' },
            { label: 'Phone Call (Kontak/Saran)', value: 'saran' },
            { label: 'Clock/Time (Absensi/LMS)', value: 'absensi' },
          ],
        },
        {
          name: 'badge',
          type: 'text',
          label: 'Lencana / Label Pojok (Opsional)',
          admin: {
            placeholder: 'Utama, Baru, Kemenag',
          },
        },
      ],
    },
  ],
}

export default KategoriLayanan
