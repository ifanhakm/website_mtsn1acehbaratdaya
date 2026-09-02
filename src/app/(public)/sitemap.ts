import type { MetadataRoute } from 'next'
import { connection } from 'next/server'
import { getPublishedNews } from '@/lib/publicData'

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

  const baseUrl = (process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000').replace(/\/+$/, '')
  const routes: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.7,
  }))

  try {
    routes.push(
      ...(await getPublishedNews()).flatMap((news) =>
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
