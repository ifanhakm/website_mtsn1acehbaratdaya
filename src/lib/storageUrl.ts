export interface SupabasePublicUrlOptions {
  supabaseUrl?: string
  s3Endpoint?: string
  bucket?: string
  defaultPrefix?: string
}

export function getSupabasePublicUrl(
  filename: string,
  prefix: string | null | undefined,
  options: SupabasePublicUrlOptions,
): string | null {
  if (!filename) return null

  const endpoint = options.s3Endpoint || ''
  const derivedBaseUrl = endpoint.includes('.storage.supabase.co/storage/v1/s3')
    ? endpoint.replace('.storage.supabase.co/storage/v1/s3', '.supabase.co')
    : endpoint.replace(/\/storage\/v1\/s3\/?$/, '')
  const baseUrl = (options.supabaseUrl || derivedBaseUrl).replace(/\/+$/, '')

  if (!baseUrl) return null

  const bucket = options.bucket || 'media'
  const effectivePrefix = prefix || options.defaultPrefix || 'media'
  const cleanPrefix = effectivePrefix ? `${effectivePrefix.replace(/^\/+|\/+$/g, '')}/` : ''

  return `${baseUrl}/storage/v1/object/public/${encodeURIComponent(bucket)}/${cleanPrefix}${encodeURIComponent(filename)}`
}
