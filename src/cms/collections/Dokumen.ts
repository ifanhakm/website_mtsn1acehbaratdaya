import { CollectionConfig } from 'payload';

export const Dokumen: CollectionConfig = {
  slug: 'dokumen',
  labels: {
    singular: 'Dokumen',
    plural: 'Pusat Unduh Dokumen ',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'badge', 'filename', 'filesize'],
  },
  access: {
    read: () => true, // Semua orang bisa download dokumen
    create: ({ req: { user } }) => !!user, // Hanya admin/Humas yang login yang bisa upload
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  // Mengaktifkan fitur upload berkas khusus dokumen
  upload: {
    staticDir: 'public/documents', // Tempat menyimpan file fisik secara lokal di laptop
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Judul Dokumen (Nama Tampilan)',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Deskripsi Singkat Dokumen',
      required: true,
      admin: {
        description: 'Jelaskan kegunaan blangko/surat ini agar memudahkan wali murid atau guru.',
      },
    },
    {
      name: 'category',
      type: 'select',
      label: 'Kategori Dokumen',
      required: true,
      defaultValue: 'siswa',
      options: [
        { label: 'Siswa & Alumni', value: 'siswa' },
        { label: 'Guru & Kepegawaian', value: 'kepegawaian' },
        { label: 'Umum', value: 'umum' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'badge',
      type: 'text',
      label: 'Lencana / Label Singkat (misal: Siswa Aktif, Keuangan)',
      required: false,
      admin: {
        position: 'sidebar',
        placeholder: 'Siswa Aktif',
      },
    },
  ],
};

export default Dokumen;
