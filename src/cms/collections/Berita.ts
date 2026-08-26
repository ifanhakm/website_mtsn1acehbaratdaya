import { CollectionConfig } from 'payload';

// Fungsi bantuan sederhana untuk membuat slug dari teks judul (Slugify)
const slugify = (val: string): string => {
  return val
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Hapus karakter non-alphanumeric kecuali strip dan spasi
    .replace(/[\s_]+/g, '-') // Ganti spasi/underscore dengan strip
    .replace(/^-+|-+$/g, ''); // Potong strip di awal/akhir
};

export const Berita: CollectionConfig = {
  slug: 'berita',
  labels: {
    singular: 'Berita',
    plural: 'Berita & Kegiatan',
  },
  admin: {
    useAsTitle: 'title', // Kolom utama yang ditampilkan di daftar panel admin
    defaultColumns: ['title', 'category', 'date', 'status', 'isFeatured'],
  },
  access: {
    read: () => true, // Siapa saja (publik) bisa membaca berita
    create: ({ req: { user } }) => {
      // Hanya user yang login (Admin/Humas) yang bisa membuat berita
      return !!user;
    },
    update: ({ req: { user } }) => {
      // Hanya user yang login yang bisa memperbarui berita
      return !!user;
    },
    delete: ({ req: { user } }) => {
      // Hanya user yang login yang bisa menghapus berita
      return !!user;
    },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Judul Berita',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Slug (URL Unik)',
      unique: true,
      admin: {
        position: 'sidebar',
        description: 'Akan terisi otomatis berdasarkan Judul Berita jika dikosongkan.',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            // Jika kolom slug kosong, buat otomatis dari Title
            if (!value && data && data.title) {
              return slugify(data.title);
            }
            // Jika diisi manual, pastikan formatnya rapi sebagai slug
            if (value) {
              return slugify(value);
            }
            return value;
          },
        ],
      },
    },
    {
      name: 'category',
      type: 'select',
      label: 'Kategori Berita',
      required: true,
      defaultValue: 'Akademik',
      options: [
        { label: 'Akademik', value: 'Akademik' },
        { label: 'Kesiswaan', value: 'Kesiswaan' },
        { label: 'Pengumuman', value: 'Pengumuman' },
        { label: 'Prestasi', value: 'Prestasi' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      label: 'Ringkasan Berita (Excerpt)',
      required: true,
      admin: {
        description: 'Teks pendek (1-2 kalimat) yang akan tampil sebagai ringkasan pada kartu berita.',
      },
    },
    {
      name: 'content',
      type: 'textarea',
      label: 'Isi Lengkap Berita',
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media', // Menghubungkan ke koleksi media upload
      label: 'Gambar Utama',
      required: true,
      admin: {
        description: 'Gambar utama untuk sampul kartu berita (rekomendasi rasio 16:9).',
      },
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      label: 'Penulis (Author)',
      required: true,
      defaultValue: ({ user }) => user?.id, // Otomatis mengisi dengan ID admin yang sedang login
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'readTime',
      type: 'text',
      label: 'Estimasi Waktu Baca (misal: 3 Menit)',
      required: true,
      defaultValue: '3 Menit',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'date',
      type: 'date',
      label: 'Tanggal Terbit',
      required: true,
      defaultValue: () => new Date(), // Otomatis terisi tanggal hari ini
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'yyyy-MM-dd',
        },
      },
    },
    {
      name: 'isFeatured',
      type: 'checkbox',
      label: 'Jadikan Berita Utama (Featured)',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Centang jika berita ini ingin ditampilkan sebagai banner utama paling atas di halaman Kabar.',
      },
    },
    {
      name: 'status',
      type: 'select',
      label: 'Status Publikasi',
      required: true,
      defaultValue: 'draft',
      options: [
        { label: 'Draft (Konsep)', value: 'draft' },
        { label: 'Published (Terbit)', value: 'published' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
  ],
};

export default Berita;
