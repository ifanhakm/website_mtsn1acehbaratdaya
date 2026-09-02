import type { Staf } from '@/payload-types'
import { getSupabasePublicUrl, type SupabasePublicUrlOptions } from './storageUrl'

export interface PublicStaffMember {
  id: string | number
  namaLengkap: string
  nip?: string | null
  jabatan: string
  jenisPtk: 'guru' | 'staf'
  fotoUrl?: string | null
  fotoAlt?: string | null
  urutan: number
}

export function toPublicStaffMember(
  member: Staf,
  storageOptions?: SupabasePublicUrlOptions,
): PublicStaffMember {
  const photo = typeof member.foto === 'object' && member.foto ? member.foto : null
  const publicPhotoUrl = photo?.filename && storageOptions
    ? getSupabasePublicUrl(photo.filename, photo.prefix, {
        ...storageOptions,
        defaultPrefix: 'media',
      })
    : null

  return {
    id: member.id,
    namaLengkap: member.namaLengkap || 'Nama Tidak Tersedia',
    nip: member.nip || null,
    jabatan: member.jabatan || 'Pendidik / Staf',
    jenisPtk: member.jenisPtk === 'staf' ? 'staf' : 'guru',
    fotoUrl: publicPhotoUrl || photo?.url || null,
    fotoAlt: photo?.alt || member.namaLengkap,
    urutan: typeof member.urutan === 'number' ? member.urutan : 99,
  }
}
