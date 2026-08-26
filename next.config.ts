// Path: next.config.ts
import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* Di sini Anda bisa memasukkan konfigurasi Next.js bawaan Anda kelak */
  images: {
    // Contoh persiapan jika nanti Anda ingin memuat gambar dari domain luar / database
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
}

export default withPayload(nextConfig)