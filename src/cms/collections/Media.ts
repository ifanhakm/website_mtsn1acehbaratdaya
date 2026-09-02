// Path: src/cms/collections/Media.ts
import { CollectionConfig } from 'payload';
import { revalidatePublicTags } from '../../lib/revalidate';

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Media',
    plural: 'Pusat Media', // Menyesuaikan label
  },
  access: {
    read: () => true, // Gambar/dokumen bebas diakses publik lewat URL
    create: ({ req: { user } }) => !!user, // Hanya admin/humas yang login yang bisa upload
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  hooks: {
    afterChange: [({ doc }) => { revalidatePublicTags('berita', 'galeri', 'staf'); return doc }],
    afterDelete: [({ doc }) => { revalidatePublicTags('berita', 'galeri', 'staf'); return doc }],
  },
  // Mengaktifkan fitur Upload berkas bawaan Payload CMS v3
  upload: {
    staticDir: 'public/media', // Lokasi penyimpanan lokal fisik file yang diunggah
    // Catatan: di Payload v3 tidak ada opsi staticURL; file dilayani otomatis lewat /api/media/file/<namafile>
    
    // SINKRONISASI KOMPRESI WEBP LANGSUNG DI MEMORI (RAM)
    formatOptions: {
      format: 'webp',
      options: {
        quality: 80, // Kompresi ideal: sangat ringan di storage, tetap tajam di mata pengunjung
      },
    },

    // PEMBATAS DIMENSI MAKSIMAL GAMBAR
    resizeOptions: {
      width: 1200,
      height: 1200,
      fit: 'inside', // Menjaga rasio foto asli agar tetap proporsional (tidak gepeng)
      withoutEnlargement: true, // Jangan diperbesar jika ukuran aslinya sudah di bawah 1200px
    },

    // BEBAS DUPLIKASI UKURAN
    // Dikosongkan agar Payload tidak membuat duplikat file berukuran kecil lainnya di cloud.
    imageSizes: [],

    // PRATINJAU ADMIN OTOMATIS

    mimeTypes: ['image/*'], // Membatasi pustaka media ini hanya untuk format gambar
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
