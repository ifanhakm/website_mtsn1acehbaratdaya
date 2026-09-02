// Path: src/payload.config.ts
import { postgresAdapter } from '@payloadcms/db-postgres'
import { resendAdapter } from '@payloadcms/email-resend'
import { s3Storage } from '@payloadcms/storage-s3'
import path from 'path'
import fs from 'fs'
import sharp from 'sharp'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'

// Impor skema koleksi dan globals yang sudah kita buat sebelumnya
import { ProfilSekolah } from './cms/globals/ProfilSekolah'
import { Berita } from './cms/collections/Berita'
import { Media } from './cms/collections/Media'
import { Staf } from './cms/collections/Staf'
import { Dokumen } from './cms/collections/Dokumen'
import { KategoriLayanan } from './cms/collections/KategoriLayanan'
import { Galeri } from './cms/collections/Galeri'
import { cloudStorageEnabled, env } from './lib/env'
import { createDatabaseSslConfig } from './lib/databaseSsl'
import { migrations } from './migrations'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const certificateAuthority = env.DATABASE_SSL === 'true'
  ? fs.readFileSync(path.join(process.cwd(), 'certs', 'supabase-ca.crt'), 'utf8')
  : undefined
const sslConfig = createDatabaseSslConfig(env.DATABASE_SSL, certificateAuthority)

export default buildConfig({
  serverURL: env.NEXT_PUBLIC_SERVER_URL,
  email: env.RESEND_API_KEY
    ? resendAdapter({
        defaultFromAddress: env.RESEND_FROM_EMAIL,
        defaultFromName: 'MTsN 1 Aceh Barat Daya',
        apiKey: env.RESEND_API_KEY,
      })
    : undefined,
  admin: {
    user: 'users',
    suppressHydrationWarning: true,
    meta: {
      titleSuffix: ' - MTsN 1 Abdya',
      icons: [
        {
          rel: 'icon',
          type: 'image/jpeg',
          url: '/logo.jpg',   
        },
      ],
    },
  },
  sharp,
  // Daftarkan koleksi data dinamis kita
  collections: [
    {
      slug: 'users',
      auth: true,
      fields: [],
    },
    Staf,
    Berita,
    Media,
    Dokumen,
    KategoriLayanan,
    Galeri,
  ],
  // Daftarkan halaman global (singleton) kita
  globals: [
    ProfilSekolah,
  ],
  secret: env.PAYLOAD_SECRET,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  // Hubungkan ke Supabase PostgreSQL melalui Variabel Lingkungan (.env.local)
  db: postgresAdapter({
    push: env.ALLOW_DEV_SCHEMA_PUSH === 'true',
    prodMigrations: env.RUN_DATABASE_MIGRATIONS === 'true' ? migrations : undefined,
    pool: {
      connectionString: env.DATABASE_URI,
      ssl: sslConfig,
    },
  }),
  plugins: [
    s3Storage({
      enabled: cloudStorageEnabled,
      bucket: env.SUPABASE_BUCKET_NAME || 'local-development',
      collections: {
        media: { prefix: 'media' },
        dokumen: { prefix: 'documents' },
      },
      config: {
        endpoint: env.SUPABASE_S3_ENDPOINT,
        forcePathStyle: true,
        region: env.SUPABASE_S3_REGION,
        credentials: {
          accessKeyId: env.SUPABASE_S3_ACCESS_KEY_ID || '',
          secretAccessKey: env.SUPABASE_S3_SECRET_ACCESS_KEY || '',
        },
      },
    }),
  ],
})
