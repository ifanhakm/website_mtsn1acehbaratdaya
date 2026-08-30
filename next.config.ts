// Path: next.config.ts
import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'

const remotePatterns: NonNullable<NextConfig['images']>['remotePatterns'] = []

for (const candidate of [process.env.SUPABASE_URL, process.env.SUPABASE_S3_ENDPOINT]) {
  if (!candidate) continue

  try {
    const url = new URL(candidate)
    remotePatterns.push({
      protocol: 'https',
      hostname: url.hostname,
      port: '',
      pathname: '/**',
      search: '',
    })
  } catch {
    // Environment validation in Payload provides the actionable startup error.
  }
}

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '64kb',
    },
  },
}

export default withPayload(nextConfig)
