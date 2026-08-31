// Path: src/app/(public)/kabar/berita/page.tsx
import React from 'react'
import { connection } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'
import BeritaClient, { type Post } from './BeritaClient'

export default async function BeritaPage() {
  await connection()

  let beritaData: Post[] = []

  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'berita',
      where: {
        status: {
          equals: 'published',
        },
      },
      sort: '-date',
      depth: 1,
      select: {
        slug: true,
        title: true,
        excerpt: true,
        date: true,
        category: true,
        readTime: true,
        image: true,
        isFeatured: true,
      },
    })

    beritaData = result.docs.flatMap((news) =>
      news.slug
        ? [{ id: news.id, slug: news.slug, title: news.title, excerpt: news.excerpt, date: news.date, category: news.category, readTime: news.readTime, image: news.image, authorName: 'Humas Madrasah', isFeatured: news.isFeatured }]
        : [],
    )
  } catch (error) {
    console.error('Daftar berita tidak dapat dimuat', error instanceof Error ? error.message : 'unknown')
  }

  return (
    <BeritaClient beritaData={beritaData} />
  )
}
