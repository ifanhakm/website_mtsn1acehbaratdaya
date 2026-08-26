// Path: src/payload.config.ts
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'

// Impor skema koleksi dan globals yang sudah kita buat sebelumnya
import { ProfilSekolah } from './cms/globals/ProfilSekolah'
import { Berita } from './cms/collections/Berita'
import { Media } from './cms/collections/Media'
import { Staf } from './cms/collections/Staf'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: 'users',
    meta: {
      titleSuffix: ' - MTsN 1 Abdya',
    },
  },
  // Daftarkan koleksi data dinamis kita
  collections: [
    {
      slug: 'users',
      auth: true,
      fields: [],
    },
    Berita,
    Media,
    Staf,
  ],
  // Daftarkan halaman global (singleton) kita
  globals: [
    ProfilSekolah,
  ],
  editor: lexicalEditor({}), // Editor teks modern Lexical
  secret: process.env.PAYLOAD_SECRET || 'SECRET_UNTUK_DEVELOPMENT_LOKAL_SAJA_12345',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  // Hubungkan ke Supabase PostgreSQL melalui Variabel Lingkungan (.env.local)
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
      ssl: {
        rejectUnauthorized: false,
      },
      max: 4  ,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 30000,
    },
    push: false,
  }),
})