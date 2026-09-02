// Path: src/app/(public)/kabar/berita/page.tsx
import React from 'react'
import { connection } from 'next/server'
import { getPublishedNews } from '@/lib/publicData'
import BeritaClient, { type Post } from './BeritaClient'

export default async function BeritaPage() {
  await connection()

  let beritaData: Post[] = []

  try {
    beritaData = (await getPublishedNews()).flatMap((news) =>
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
