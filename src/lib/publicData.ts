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
      sort: 'urutan',
      depth: 0,
      limit: 100,
      overrideAccess: true,
    })
    const mediaResult = await payload.find({
      collection: 'media',
      depth: 0,
      limit: 300,
      overrideAccess: true,
    })

    const mediaMap = new Map(mediaResult.docs.map((m) => [String(m.id), m]))

    return staffResult.docs.map((member) => {
      const fotoId = typeof member.foto === 'object' && member.foto ? member.foto.id : member.foto
      const resolvedMedia = fotoId ? mediaMap.get(String(fotoId)) : null
      return {
        ...member,
        foto: resolvedMedia ?? member.foto,
      }
    })
  },
  ['public-staff-v5'],
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
