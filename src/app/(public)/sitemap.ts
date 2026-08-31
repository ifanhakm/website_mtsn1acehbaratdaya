import type { MetadataRoute } from 'next'
import { connection } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

const staticRoutes = [
  '',
  '/profil/sejarah',
  '/profil/visi-misi',
  '/profil/staf',
  '/kabar/berita',
  '/kabar/galeri',
  '/layanan',
  '/layanan/unduh',
  '/kontak',
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  await connection()

  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
  const routes: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.7,
  }))

  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'berita',
      where: { status: { equals: 'published' } },
      limit: 1_000,
      pagination: false,
      select: { slug: true, updatedAt: true },
    })

    routes.push(
      ...result.docs.flatMap((news) =>
        news.slug
          ? [{
              url: `${baseUrl}/kabar/berita/${news.slug}`,
              lastModified: typeof news.updatedAt === 'string' ? news.updatedAt : undefined,
              changeFrequency: 'monthly' as const,
              priority: 0.8,
            }]
          : [],
      ),
    )
  } catch (error) {
    console.error('Sitemap berita tidak dapat dimuat', error instanceof Error ? error.message : 'unknown')
  }

  return routes
}
