import 'server-only'

import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import config from '@/payload.config'

const cacheOptions = (tag: string) => ({ revalidate: 300, tags: [tag] })

export const getHomeNews = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'berita',
      where: { status: { equals: 'published' } },
      sort: '-date',
      limit: 3,
      depth: 1,
    })
    return result.docs
  },
  ['home-news'],
  cacheOptions('berita'),
)

export const getPublishedNews = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'berita',
      where: { status: { equals: 'published' } },
      sort: '-date',
      depth: 1,
      limit: 1_000,
    })
    return result.docs
  },
  ['published-news'],
  cacheOptions('berita'),
)

export const getPublishedNewsBySlug = unstable_cache(
  async (slug: string) => {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'berita',
      where: {
        and: [
          { slug: { equals: slug } },
          { status: { equals: 'published' } },
        ],
      },
      depth: 1,
      limit: 1,
    })
    return result.docs[0] ?? null
  },
  ['published-news-by-slug'],
  cacheOptions('berita'),
)

export const getGalleryEntries = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const result = await payload.find({ collection: 'galeri', limit: 100, sort: '-createdAt', depth: 1 })
    return result.docs
  },
  ['gallery-entries'],
  cacheOptions('galeri'),
)

export const getServiceCategories = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const result = await payload.find({ collection: 'kategori-layanan', limit: 50, sort: 'createdAt' })
    return result.docs
  },
  ['service-categories'],
  cacheOptions('kategori-layanan'),
)

export const getDocuments = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const result = await payload.find({ collection: 'dokumen', limit: 100 })
    return result.docs
  },
  ['public-documents'],
  cacheOptions('dokumen'),
)

export interface PublicStaffMember {
  id: string | number
  namaLengkap: string
  nip?: string | null
  jabatan: string
  jenisPtk: 'guru' | 'staf'
  fotoUrl?: string | null
  fotoAlt?: string | null
  urutan: number
}

export const getStaff = unstable_cache(
  async (): Promise<PublicStaffMember[]> => {
    // 1. CARA UTAMA: Coba ambil langsung lewat Supabase REST API (Super Cepat ~15ms via CDN)
    try {
      const supabaseUrl = (process.env.SUPABASE_URL || 'https://hwvcfplrligtefwazxkt.supabase.co').replace(/\/+$/, '')
      const anonKey = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

      const headers: Record<string, string> = {
        Accept: 'application/json',
      }
      if (anonKey) {
        headers['apikey'] = anonKey
        headers['Authorization'] = `Bearer ${anonKey}`
      }

      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 3000)

      const response = await fetch(`${supabaseUrl}/rest/v1/staf?select=*&order=urutan.asc`, {
        headers,
        signal: controller.signal,
      }).finally(() => clearTimeout(timeoutId))

      if (response.ok) {
        const rows = (await response.json()) as Record<string, unknown>[]
        if (Array.isArray(rows) && rows.length > 0) {
          return rows.map((row) => {
            const nama = String(row.nama_lengkap || row.namaLengkap || row.name || 'Nama Tidak Tersedia')
            const rawJenis = String(row.jenis_ptk || row.jenisPtk || 'guru')
            const fotoUrl = `https://hwvcfplrligtefwazxkt.supabase.co/storage/v1/object/public/media/media/${encodeURIComponent(nama.trim())}.webp`

            return {
              id: (row.id as string | number) || Math.random(),
              namaLengkap: nama,
              nip: row.nip ? String(row.nip) : null,
              jabatan: String(row.jabatan || 'Pendidik / Staf'),
              jenisPtk: (rawJenis === 'staf' ? 'staf' : 'guru') as 'guru' | 'staf',
              fotoUrl: fotoUrl,
              fotoAlt: nama,
              urutan: typeof row.urutan === 'number' ? row.urutan : 99,
            }
          })
        }
      }
    } catch {
      // Jika REST API Supabase tidak merespon, lanjutkan ke fallback lokal
    }

    // 2. CARA FALLBACK: Ambil lewat Payload Local API
    try {
      const payload = await getPayload({ config })

      const staffResult = await payload.find({
        collection: 'staf',
        limit: 100,
        sort: 'urutan',
        depth: 0,
        overrideAccess: true,
      })

      if (staffResult.docs.length > 0) {
        return staffResult.docs.map((member) => ({
          id: member.id,
          namaLengkap: member.namaLengkap || 'Nama Tidak Tersedia',
          nip: member.nip || null,
          jabatan: member.jabatan || 'Pendidik / Staf',
          jenisPtk: (member.jenisPtk === 'staf' ? 'staf' : 'guru') as 'guru' | 'staf',
          fotoUrl: `https://hwvcfplrligtefwazxkt.supabase.co/storage/v1/object/public/media/media/${encodeURIComponent((member.namaLengkap || '').trim())}.webp`,
          fotoAlt: member.namaLengkap,
          urutan: typeof member.urutan === 'number' ? member.urutan : 99,
        }))
      }
    } catch {
      // Abaikan jika database lokal gagal
    }

    return []
  },
  ['public-staff-rest-v1'],
  cacheOptions('staf'),
)

export const getSchoolProfile = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    return payload.findGlobal({ slug: 'profil-sekolah' })
  },
  ['school-profile'],
  cacheOptions('profil-sekolah'),
)
