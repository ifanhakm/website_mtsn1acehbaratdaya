import { GlobalConfig } from 'payload';

export const ProfilSekolah: GlobalConfig = {
  slug: 'profil-sekolah',
  label: 'Profil & Sejarah Sekolah',
  access: {
    read: () => true, // Semua pengunjung umum dapat membaca data ini
    update: ({ req: { user } }) => !!user, // Hanya admin yang login yang bisa edit
  },
  fields: [
    {
      name: 'sambutanKepala',
      type: 'textarea', // 
      label: 'Sambutan Kepala Madrasah',
      required: false,
    },
    {
      name: 'sejarahPanjang',
      type: 'textarea', // 
      label: 'Sejarah Lengkap Madrasah',
      required: false,
    },
    // Lini Masa Sejarah (Timeline) Interaktif
    {
      name: 'liniMasa',
      type: 'array',
      label: 'Lini Masa Sejarah (Timeline)',
      labels: {
        singular: 'Momen Sejarah',
        plural: 'Momen-Momen Sejarah',
      },
      fields: [
        {
          name: 'tahun',
          type: 'text',
          label: 'Tahun (misal: 1969)',
          required: true,
        },
        {
          name: 'judulPeristiwa',
          type: 'text',
          label: 'Judul Peristiwa (misal: Penegerian MTsAIN Susoh)',
          required: true,
        },
        {
          name: 'deskripsiPeristiwa',
          type: 'textarea',
          label: 'Deskripsi Singkat Kejadian',
          required: true,
        },
      ],
    },
    {
      name: 'visi',
      type: 'text',
      label: 'Visi Madrasah',
      required: true,
    },
    {
      name: 'misi',
      type: 'array',
      label: 'Misi Madrasah',
      labels: {
        singular: 'Poin Misi',
        plural: 'Poin-Poin Misi',
      },
      fields: [
        {
          name: 'teksMisi',
          type: 'text',
          label: 'Pernyataan Misi',
          required: true,
        },
      ],
    },
    {
      name: 'tujuan',
      type: 'array',
      label: 'Tujuan Madrasah',
      labels: {
        singular: 'Poin Tujuan',
        plural: 'Poin-Poin Tujuan',
      },
      fields: [
        {
          name: 'teksTujuan',
          type: 'text',
          label: 'Tujuan Kegiatan Madrasah',
          required: true,
        },
      ],
    },
  ],
};

export default ProfilSekolah;
