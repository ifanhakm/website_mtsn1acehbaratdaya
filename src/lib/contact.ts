import { z } from 'zod'

const singleLine = (max: number) =>
  z.string().trim().min(1).max(max).refine((value) => !/[\r\n]/.test(value), {
    message: 'Harus berupa satu baris',
  })

export const contactSchema = z.object({
  nama: singleLine(100),
  email: z.string().trim().email().max(254),
  kategori: z.enum(['Wali Murid', 'Alumni', 'Siswa', 'Guru/Pegawai', 'Masyarakat Umum']),
  subjek: singleLine(150),
  pesan: z.string().trim().min(10).max(5_000),
  website: z.string().max(200).optional().default(''),
})

export function escapeHtml(value: string): string {
  return value.replace(/[&<>'"]/g, (character) => {
    const entities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;',
    }
    return entities[character]
  })
}

type RateLimitEntry = { count: number; resetAt: number }

const globalRateLimit = globalThis as typeof globalThis & {
  contactRateLimits?: Map<string, RateLimitEntry>
}

const rateLimits = globalRateLimit.contactRateLimits ?? new Map<string, RateLimitEntry>()
globalRateLimit.contactRateLimits = rateLimits

const rateLimitWindowMs = 15 * 60 * 1_000
const maximumRequests = 5
const maximumIdentifiers = 10_000

function removeExpiredRateLimits(now: number) {
  for (const [identifier, entry] of rateLimits) {
    if (entry.resetAt <= now) rateLimits.delete(identifier)
  }
}

export function checkContactRateLimit(identifier: string, now = Date.now()): boolean {
  const current = rateLimits.get(identifier)

  if (!current || current.resetAt <= now) {
    if (rateLimits.size >= maximumIdentifiers) removeExpiredRateLimits(now)
    if (rateLimits.size >= maximumIdentifiers && !current) return false

    rateLimits.set(identifier, { count: 1, resetAt: now + rateLimitWindowMs })
    return true
  }

  if (current.count >= maximumRequests) return false

  current.count += 1
  return true
}
