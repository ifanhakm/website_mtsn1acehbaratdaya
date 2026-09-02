import { describe, expect, it } from 'vitest'
import { createDatabaseSslConfig } from './databaseSsl'

describe('createDatabaseSslConfig', () => {
  it('menonaktifkan TLS hanya ketika dikonfigurasi false', () => {
    expect(createDatabaseSslConfig('false')).toBe(false)
  })

  it('mengaktifkan TLS require tanpa verifikasi CA', () => {
    expect(createDatabaseSslConfig('require')).toEqual({ rejectUnauthorized: false })
  })

  it('mewajibkan dan menggunakan CA pada mode true', () => {
    expect(() => createDatabaseSslConfig('true')).toThrow(/memerlukan certs/)
    expect(createDatabaseSslConfig('true', 'certificate')).toEqual({
      rejectUnauthorized: true,
      ca: 'certificate',
    })
  })
})
