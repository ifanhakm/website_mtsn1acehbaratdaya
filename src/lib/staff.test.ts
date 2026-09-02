import { describe, expect, it } from 'vitest'
import type { Media, Staf } from '@/payload-types'
import { toPublicStaffMember } from './staff'

const baseStaff: Staf = {
  id: 1,
  namaLengkap: 'Siti Aminah, S.Pd.',
  nip: null,
  jabatan: 'Guru',
  jenisPtk: 'guru',
  foto: 10,
  urutan: 2,
  createdAt: '2026-09-02T00:00:00.000Z',
  updatedAt: '2026-09-02T00:00:00.000Z',
}

describe('toPublicStaffMember', () => {
  it('menggunakan URL dan alt dari relasi media, bukan nama staf', () => {
    const photo: Media = {
      id: 10,
      alt: 'Foto resmi Siti Aminah',
      url: 'https://hwvcfplrligtefwazxkt.supabase.co/storage/v1/object/public/media/media/Afrizah,%20S.%20Ag.webp',
      createdAt: baseStaff.createdAt,
      updatedAt: baseStaff.updatedAt,
    }

    expect(toPublicStaffMember({ ...baseStaff, foto: photo })).toMatchObject({
      fotoUrl: photo.url,
      fotoAlt: photo.alt,
    })
  })

  it('tidak menebak URL ketika relasi media belum dipopulasi', () => {
    expect(toPublicStaffMember(baseStaff)).toMatchObject({
      fotoUrl: null,
      fotoAlt: baseStaff.namaLengkap,
    })
  })

  it('membentuk URL publik Supabase dari filename meskipun URL Payload masih lokal', () => {
    const photo: Media = {
      id: 10,
      alt: 'Foto resmi Siti Aminah',
      url: '/api/media/file/Afrizah%2C%20S.%20Ag.webp',
      filename: 'Afrizah, S. Ag.webp',
      prefix: null,
      createdAt: baseStaff.createdAt,
      updatedAt: baseStaff.updatedAt,
    }

    expect(toPublicStaffMember(
      { ...baseStaff, foto: photo },
      {
        supabaseUrl: 'https://hwvcfplrligtefwazxkt.supabase.co',
        bucket: 'media',
      },
    )).toMatchObject({
      fotoUrl: 'https://hwvcfplrligtefwazxkt.supabase.co/storage/v1/object/public/media/media/Afrizah%2C%20S.%20Ag.webp',
    })
  })
})
