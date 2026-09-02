// Path: next.config.ts
import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'

const isDev = process.env.NODE_ENV === 'development'

const remotePatterns: NonNullable<NextConfig['images']>['remotePatterns'] = []

// Supabase project dan storage endpoint menggunakan subdomain supabase.co.
// Pola ini harus tersedia saat build karena konfigurasi Image tidak berubah saat runtime.
remotePatterns.push({
  protocol: 'https',
  hostname: '**.supabase.co',
  pathname: '/**',
})

if (isDev) {
  remotePatterns.push(
    {
      protocol: 'http',
      hostname: 'localhost',
      port: '3000',
      pathname: '/**',
    },
    {
      protocol: 'http',
      hostname: '127.0.0.1',
      port: '3000',
      pathname: '/**',
    },
  )
}

for (const candidate of [
  process.env.NEXT_PUBLIC_SERVER_URL,
  process.env.SUPABASE_URL,
  process.env.SUPABASE_S3_ENDPOINT,
]) {
  if (!candidate) continue

  try {
    const url = new URL(candidate)
    if (url.protocol !== 'http:' && url.protocol !== 'https:') continue

    const pattern = {
      protocol: url.protocol.slice(0, -1) as 'http' | 'https',
      hostname: url.hostname,
      port: url.port,
      pathname: '/**',
      search: '',
    }

    if (!remotePatterns.some((existing) => JSON.stringify(existing) === JSON.stringify(pattern))) {
      remotePatterns.push(pattern)
    }
  } catch {
    // Environment validation in Payload provides the actionable startup error.
  }
}

const nextConfig: NextConfig = {
  output: 'standalone', 
  images: {
    remotePatterns,
    dangerouslyAllowLocalIP: isDev,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '64kb',
    },
  },
}

export default withPayload(nextConfig)
