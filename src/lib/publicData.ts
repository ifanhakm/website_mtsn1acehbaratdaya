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

export const getStaff = unstable_cache(
  async () => {
    const payload = await getPayload({ config })

    const staffResult = await payload.find({
      collection: 'staf',
      limit: 100,
      sort: 'urutan',
      depth: 0,
      overrideAccess: true,
    })

    const mediaResult = await payload.find({
      collection: 'media',
      limit: 300,
      depth: 0,
      overrideAccess: true,
    })

    const mediaMap = new Map(
      mediaResult.docs.map((m) => [
        String(m.id),
        m.filename
          ? `https://hwvcfplrligtefwazxkt.supabase.co/storage/v1/object/public/media/media/${encodeURIComponent(m.filename)}`
          : (m.url || null),
      ]),
    )

    return staffResult.docs.map((member) => {
      const fotoId = typeof member.foto === 'object' && member.foto ? member.foto.id : member.foto
      const resolvedUrl = fotoId ? mediaMap.get(String(fotoId)) : null

      const finalFotoUrl =
        resolvedUrl ||
        (member.namaLengkap
          ? `https://hwvcfplrligtefwazxkt.supabase.co/storage/v1/object/public/media/media/${encodeURIComponent(member.namaLengkap.trim())}.webp`
          : null)

      return {
        id: member.id,
        namaLengkap: member.namaLengkap || 'Nama Tidak Tersedia',
        nip: member.nip || null,
        jabatan: member.jabatan || 'Pendidik / Staf',
        jenisPtk: (member.jenisPtk === 'staf' ? 'staf' : 'guru') as 'guru' | 'staf',
        fotoUrl: finalFotoUrl,
        fotoAlt: member.namaLengkap,
        urutan: typeof member.urutan === 'number' ? member.urutan : 99,
      }
    })
  },
  ['public-staff-v7-final'],
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
