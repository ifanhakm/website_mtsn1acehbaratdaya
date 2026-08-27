import { CollectionConfig } from 'payload';

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Media',
    plural: 'Pusat Media',
  },
  access: {
    read: () => true, // Gambar/dokumen bebas diakses publik lewat URL
    create: ({ req: { user } }) => !!user, // Hanya admin/humas yang login yang bisa upload
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  // Mengaktifkan fitur Upload berkas bawaan Payload CMS v3
  upload: {
    staticDir: 'public/media', // Lokasi penyimpanan lokal fisik file yang diunggah
    // Catatan: di Payload v3 tidak ada opsi staticURL; file dilayani otomatis lewat /api/media/file/<namafile>
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
        formatOptions: { format: 'webp', options: { quality: 80 } },
      },
      {
        name: 'card',
        width: 768,
        height: 432, // Rasio 16:9 ideal untuk kartu berita
        position: 'centre',
        formatOptions: { format: 'webp', options: { quality: 85 } },
      },
      {
        name: 'tablet',
        width: 1024,
        position: 'centre',
      },
    ],
    adminThumbnail: 'thumbnail', // Gunakan thumbnail berukuran kecil saat memuat gambar di panel admin
    mimeTypes: ['image/*'],      // Membatasi pustaka media ini hanya untuk format gambar
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'Teks Alternatif (Alt Text)',
      required: true,
      admin: {
        description: 'Deskripsi singkat isi gambar untuk aksesibilitas pembaca layar dan optimasi SEO.',
      },
    },
  ],
};

export default Media;
