import 'server-only'

import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import type { Media } from '@/payload-types'
import config from '@/payload.config'
import { env } from '@/lib/env'
import { toPublicStaffMember, type PublicStaffMember } from '@/lib/staff'
import { withPublicUploadUrl } from '@/lib/storageUrl'

export type { PublicStaffMember } from '@/lib/staff'

const cacheOptions = (tag: string) => ({ revalidate: 300, tags: [tag] })
const publicStorageOptions = {
  supabaseUrl: env.SUPABASE_URL,
  s3Endpoint: env.SUPABASE_S3_ENDPOINT,
  bucket: env.SUPABASE_BUCKET_NAME,
}

type DocumentWithImage = {
  image?: number | Media | null
}

function withPublicImage<T extends DocumentWithImage>(document: T): T {
  if (!document.image || typeof document.image !== 'object') return document

  return {
    ...document,
    image: withPublicUploadUrl(document.image, publicStorageOptions),
  }
}

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
    return result.docs.map(withPublicImage)
  },
  ['home-news-v2'],
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
    return result.docs.map(withPublicImage)
  },
  ['published-news-v2'],
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
    return result.docs[0] ? withPublicImage(result.docs[0]) : null
  },
  ['published-news-by-slug-v2'],
  cacheOptions('berita'),
)

export const getGalleryEntries = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const result = await payload.find({ collection: 'galeri', limit: 100, sort: '-createdAt', depth: 1 })
    return result.docs.map(withPublicImage)
  },
  ['gallery-entries-v2'],
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
  async (): Promise<PublicStaffMember[]> => {
    const payload = await getPayload({ config })
    const staffResult = await payload.find({
      collection: 'staf',
      limit: 100,
      sort: 'urutan',
      depth: 1,
      overrideAccess: false,
    })

    return staffResult.docs.map((member) => toPublicStaffMember(member, publicStorageOptions))
  },
  ['public-staff-v3'],
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
