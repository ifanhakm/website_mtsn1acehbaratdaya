import { describe, expect, it } from 'vitest'
import { buildContactEmailHtml, checkContactRateLimit, contactSchema, escapeHtml } from './contact'

const validContact = {
  nama: 'Budi Santoso',
  email: 'budi@example.com',
  kategori: 'Wali Murid' as const,
  subjek: 'Pertanyaan administrasi',
  pesan: 'Mohon informasi mengenai persyaratan administrasi.',
  website: '',
}

describe('contactSchema', () => {
  it('menerima dan merapikan input yang valid', () => {
    const result = contactSchema.parse({ ...validContact, nama: '  Budi Santoso  ' })
    expect(result.nama).toBe('Budi Santoso')
  })

  it('menolak kategori, email, dan pesan yang tidak valid', () => {
    expect(contactSchema.safeParse({ ...validContact, kategori: 'Admin' }).success).toBe(false)
    expect(contactSchema.safeParse({ ...validContact, email: 'bukan-email' }).success).toBe(false)
    expect(contactSchema.safeParse({ ...validContact, pesan: 'pendek' }).success).toBe(false)
  })
})

describe('escapeHtml', () => {
  it('menetralisasi markup dari pengguna', () => {
    expect(escapeHtml('<a href="x">O\'Reilly & teman</a>')).toBe(
      '&lt;a href=&quot;x&quot;&gt;O&#39;Reilly &amp; teman&lt;/a&gt;',
    )
  })
})

describe('buildContactEmailHtml', () => {
  it('tidak menyisipkan markup pengguna ke email', () => {
    const html = buildContactEmailHtml({
      ...validContact,
      nama: '<img src=x onerror=alert(1)>',
      pesan: '<script>alert(1)</script>',
    })

    expect(html).not.toContain('<script>')
    expect(html).not.toContain('<img src=x')
    expect(html).toContain('&lt;script&gt;alert(1)&lt;/script&gt;')
  })
})

describe('checkContactRateLimit', () => {
  it('membatasi permintaan keenam dalam jendela waktu yang sama', () => {
    const id = `test-${Math.random()}`
    const now = 1_000
    for (let index = 0; index < 5; index += 1) {
      expect(checkContactRateLimit(id, now)).toBe(true)
    }
    expect(checkContactRateLimit(id, now)).toBe(false)
    expect(checkContactRateLimit(id, now + 15 * 60 * 1_000)).toBe(true)
  })
})
