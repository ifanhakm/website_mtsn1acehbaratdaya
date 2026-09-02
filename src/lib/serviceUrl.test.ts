import { describe, expect, it } from 'vitest'
import { validateServiceHref } from './serviceUrl'

describe('validateServiceHref', () => {
  it('menerima path internal dan URL web eksternal', () => {
    expect(validateServiceHref('/layanan/unduh', false)).toBe(true)
    expect(validateServiceHref('https://example.com/layanan', true)).toBe(true)
  })

  it('menolak protokol berbahaya dan path internal ambigu', () => {
    expect(validateServiceHref('javascript:alert(1)', true)).not.toBe(true)
    expect(validateServiceHref('//example.com', false)).not.toBe(true)
    expect(validateServiceHref('layanan/unduh', false)).not.toBe(true)
  })
})
