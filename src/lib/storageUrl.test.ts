import { describe, expect, it } from 'vitest'
import { getPublicUploadUrl, withPublicUploadUrl } from './storageUrl'

const storageOptions = {
  supabaseUrl: 'https://hwvcfplrligtefwazxkt.supabase.co',
  bucket: 'media',
}

describe('public upload URLs', () => {
  it('mengganti URL lokal Payload dengan URL publik Supabase', () => {
    expect(getPublicUploadUrl({
      filename: 'Logo Resmi.webp',
      prefix: null,
      url: '/api/media/file/Logo%20Resmi.webp',
    }, storageOptions)).toBe(
      'https://hwvcfplrligtefwazxkt.supabase.co/storage/v1/object/public/media/media/Logo%20Resmi.webp',
    )
  })

  it('mempertahankan metadata upload saat menormalisasi URL', () => {
    expect(withPublicUploadUrl({
      id: 1,
      alt: 'Logo madrasah',
      filename: 'Logo Resmi.webp',
      url: '/api/media/file/Logo%20Resmi.webp',
    }, storageOptions)).toMatchObject({
      id: 1,
      alt: 'Logo madrasah',
      url: 'https://hwvcfplrligtefwazxkt.supabase.co/storage/v1/object/public/media/media/Logo%20Resmi.webp',
    })
  })

  it('memakai URL semula jika filename tidak tersedia', () => {
    expect(getPublicUploadUrl({ url: '/logo.jpg' }, storageOptions)).toBe('/logo.jpg')
  })
})
