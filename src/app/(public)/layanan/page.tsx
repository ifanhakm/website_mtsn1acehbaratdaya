// Path: src/app/(public)/layanan/page.tsx
import React from 'react'
import { connection } from 'next/server'
import LayananClient, { type LayananCategory, type LayananItem } from './LayananClient'
import { validateServiceHref } from '@/lib/serviceUrl'
import { getServiceCategories } from '@/lib/publicData'

interface ServiceItemRecord {
  title: string
  description: string
  href: string
  isExternal?: boolean | null
  icon: LayananItem['icon']
  badge?: string | null
}

export default async function LayananPortalPage() {
  await connection()

  const dbLayanan: LayananCategory[] = (await getServiceCategories()).map((doc) => ({
      categoryName: doc.name,
      categoryDesc: doc.description,
      items: (doc.items || []).flatMap((item: ServiceItemRecord) => {
        const isExternal = item.isExternal ?? true
        if (validateServiceHref(item.href, isExternal) !== true) return []

        return [{
          title: item.title,
          description: item.description,
          href: item.href,
          isExternal,
          icon: item.icon,
          badge: item.badge || undefined,
        }]
      })
    }))

  return (
    // 4. Kirimkan data ke Client Component (dengan smart fallback di dalamnya jika data db kosong)
    <LayananClient dbLayanan={dbLayanan} />
  )
}
