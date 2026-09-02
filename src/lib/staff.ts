import type { Staf } from '@/payload-types'

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

export function toPublicStaffMember(member: Staf): PublicStaffMember {
  const photo = typeof member.foto === 'object' && member.foto ? member.foto : null

  return {
    id: member.id,
    namaLengkap: member.namaLengkap || 'Nama Tidak Tersedia',
    nip: member.nip || null,
    jabatan: member.jabatan || 'Pendidik / Staf',
    jenisPtk: member.jenisPtk === 'staf' ? 'staf' : 'guru',
    fotoUrl: photo?.url || null,
    fotoAlt: photo?.alt || member.namaLengkap,
    urutan: typeof member.urutan === 'number' ? member.urutan : 99,
  }
}
