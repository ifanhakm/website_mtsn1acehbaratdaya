// Path: src/app/(public)/kabar/berita/[slug]/page.tsx
import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ChevronRight, Calendar, User, Clock, ArrowLeft } from 'lucide-react'
import { getPublishedNewsBySlug } from '@/lib/publicData'

interface RouteParams {
  params: Promise<{
    slug: string
  }>
}

// =========================================================================
// SERIALIZER LEXICAL RICH TEXT UNTUK MENAMPILKAN "ISI LENGKAP" BERITA
// =========================================================================
interface LexicalNode {
  type: string
  text?: string
  format?: number
  tag?: 'h1' | 'h2' | 'h3'
  listType?: string
  children?: LexicalNode[]
}

export async function generateMetadata({ params }: RouteParams): Promise<Metadata> {
  const { slug } = await params
  let berita = null
  try {
    berita = await getPublishedNewsBySlug(slug)
  } catch (error) {
    console.error('Metadata berita tidak dapat dimuat', error instanceof Error ? error.message : 'unknown')
  }

  if (!berita) return { title: 'Berita tidak ditemukan' }

  const imageRecord = typeof berita.image === 'object' ? berita.image : null
  const image = imageRecord?.url
  return {
    title: berita.title,
    description: berita.excerpt,
    openGraph: {
      title: berita.title,
      description: berita.excerpt,
      type: 'article',
      images: image ? [{ url: image, alt: imageRecord?.alt || berita.title }] : undefined,
    },
  }
}

interface LexicalContent {
  root: { children: LexicalNode[] }
}

function RichTextRenderer({ content }: { content: string | LexicalContent }) {
  if (!content) return null

  // 🌟 JALUR PENYELAMAT: Jika isinya berupa teks biasa/string (dari textarea)
  if (typeof content === 'string') {
    return (
      <div className="space-y-5">
        {content.split('\n').map((paragraph, index) => {
          if (paragraph.trim() === '') return null // Abaikan baris kosong
          return (
            <p key={index} className="text-gray-600 leading-relaxed text-sm sm:text-base font-medium">
              {paragraph}
            </p>
          )
        })}
      </div>
    )
  }

  // JALUR CADANGAN: Jika di kemudian hari Anda kembali menggunakan JSON Lexical asli
  if (!content.root || !content.root.children) return null  

  const renderNode = (node: LexicalNode, index: number): React.ReactNode => {
    if (!node) return null

    // 1. Jika ini adalah node teks biasa
    if (node.type === 'text') {
      const text = node.text || ''
      const format = node.format || 0
      let element: React.ReactNode = text

      // Penanganan format bitwise Lexical (Bold, Italic, Underline, dll)
      if (format & 1) { // Bold
        element = <strong key={index}>{element}</strong>
      }
      if (format & 2) { // Italic
        element = <em key={index}>{element}</em>
      }
      if (format & 8) { // Underline
        element = <span key={index} className="underline">{element}</span>
      }
      if (format & 16) { // Strikethrough
        element = <span key={index} className="line-through">{element}</span>
      }
      return <span key={index}>{element}</span>
    }

    // 2. Jika ini adalah parent node yang memiliki anak (children)
    const children = node.children ? node.children.map((child, idx) => renderNode(child, idx)) : []

    switch (node.type) {
      case 'paragraph':
        return <p key={index} className="mb-5 text-gray-600 leading-relaxed text-sm sm:text-base font-medium">{children}</p>
      case 'heading':
        const Tag = node.tag || 'h2'
        const headingClasses: Record<string, string> = {
          h1: 'text-2xl sm:text-3xl font-extrabold text-brand-green mt-8 mb-4 tracking-tight',
          h2: 'text-xl sm:text-2xl font-bold text-brand-green mt-6 mb-3 tracking-tight',
          h3: 'text-lg sm:text-xl font-semibold text-brand-green mt-5 mb-2',
        }
        return <Tag key={index} className={headingClasses[Tag] || 'text-xl font-bold mb-3'}>{children}</Tag>
      case 'list':
        const ListTag = node.listType === 'number' ? 'ol' : 'ul'
        const listClass = node.listType === 'number' 
          ? 'list-decimal pl-6 mb-5 space-y-1.5 text-gray-600 text-sm sm:text-base font-medium' 
          : 'list-disc pl-6 mb-5 space-y-1.5 text-gray-600 text-sm sm:text-base font-medium'
        return <ListTag key={index} className={listClass}>{children}</ListTag>
      case 'listitem':
        return <li key={index} className="pl-1">{children}</li>
      case 'quote':
        return (
          <blockquote key={index} className="border-l-4 border-brand-gold bg-brand-gold/5 pl-5 pr-3 py-4 my-6 rounded-r-2xl text-gray-700 italic text-sm sm:text-base font-semibold leading-relaxed">
            {children}
          </blockquote>
        )
      default:
        return <span key={index}>{children}</span>
    }
  }

  return (
    <div className="rich-text-content">
      {content.root.children.map((child, idx) => renderNode(child, idx))}
    </div>
  )
}

// =========================================================================
// HALAMAN DETAIL UTAMA (SERVER COMPONENT)
// =========================================================================
export default async function DetailBeritaPage({ params }: RouteParams) {
  const { slug } = await params
  const berita = await getPublishedNewsBySlug(slug)

  if (!berita) {
    notFound()
  }

  const formatTanggalIndo = (dateStr: string) => {
    try {
      const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(dateStr).toLocaleDateString('id-ID', options)
    } catch {
      return dateStr
    }
  }

  // Helper untuk mendapatkan gambar utama
  const getImageUrl = () => {
    if (berita.image && typeof berita.image === 'object' && berita.image.url) {
      return berita.image.url
    }
    return '/logo.jpg'
  }

  return (
    <div className="min-h-screen bg-gray-50/50 pb-24">
      {/* 1. HERO HEADER */}
      <div className="bg-brand-green py-12 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(209,187,7,0.1),transparent_40%)]" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
          
          {/* Breadcrumb */}
          <nav className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/70 mb-6">
            <Link href="/" className="hover:text-brand-gold transition-colors">Beranda</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-brand-gold">Kabar</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/kabar/berita" className="hover:text-brand-gold transition-colors">Berita</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white truncate max-w-[200px]">{berita.title}</span>
          </nav>

          {/* Judul Berita */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight text-white mb-6">
            {berita.title}
          </h1>

          {/* Meta Bar */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-gray-200 border-t border-white/10 pt-4">
            <span className="bg-brand-gold text-brand-green px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-extrabold">
              {berita.category}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-brand-gold" />
              {formatTanggalIndo(berita.date)}
            </span>
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-brand-gold" />
               Humas Madrasah
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-brand-gold" />
              {berita.readTime || '3 Menit'}
            </span>
          </div>

        </div>
      </div>

      {/* 2. BODY KONTEN */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 mt-8">
        <div className="overflow-hidden rounded-3xl bg-white border border-gray-100 shadow-sm p-6 sm:p-10">
          
          {/* Tombol Kembali */}
          <Link
            href="/kabar/berita"
            className="inline-flex items-center gap-2 text-xs font-bold text-brand-green hover:text-brand-gold transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Kembali ke Daftar Berita</span>
          </Link>

          {/* Gambar Sampul Berita */}
          <div className="relative h-64 sm:h-96 md:h-[450px] w-full overflow-hidden rounded-2xl bg-gray-100 mb-8 flex items-center justify-center">
            <Image
              src={getImageUrl()}
              alt={typeof berita.image === 'object' ? berita.image.alt || berita.title : berita.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Ringkasan Berita (Excerpt Bar) */}
          <div className="border-l-4 border-brand-green bg-brand-green/5 px-6 py-4 rounded-r-xl mb-8">
            <p className="text-sm sm:text-base font-bold text-gray-700 leading-relaxed italic">{berita.excerpt}</p>
          </div>

          {/* Teks Isi Lengkap Berita */}
          <article className="prose max-w-none">
            <RichTextRenderer content={berita.content} />
          </article>

        </div>
      </div>
    </div>
  )
}
