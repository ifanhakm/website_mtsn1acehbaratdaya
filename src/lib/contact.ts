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

type ValidContact = z.infer<typeof contactSchema>

export function buildContactEmailHtml(form: ValidContact): string {
  const safe = {
    nama: escapeHtml(form.nama),
    email: escapeHtml(form.email),
    kategori: escapeHtml(form.kategori),
    subjek: escapeHtml(form.subjek),
    pesan: escapeHtml(form.pesan),
  }
  const replyHref = `mailto:${encodeURIComponent(form.email)}?subject=${encodeURIComponent(`Re: ${form.subjek}`)}`

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 16px; background: #fff;">
      <div style="background: #014200; padding: 24px; border-radius: 12px 12px 0 0; text-align: center;">
        <h2 style="color: #d1bb07; margin: 0; font-size: 20px;">Pesan Baru dari Website</h2>
        <p style="color: #fff; margin: 5px 0 0; font-size: 13px;">MTsN 1 Aceh Barat Daya</p>
      </div>
      <div style="padding: 24px; color: #1f2937;">
        <p><strong>Nama:</strong> ${safe.nama}</p>
        <p><strong>Email:</strong> ${safe.email}</p>
        <p><strong>Status:</strong> ${safe.kategori}</p>
        <p><strong>Subjek:</strong> ${safe.subjek}</p>
        <p><strong>Waktu:</strong> ${new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })} WIB</p>
        <div style="background: #f9fafb; border-left: 4px solid #014200; padding: 16px; white-space: pre-wrap;">${safe.pesan}</div>
        <p style="margin-top: 24px; text-align: center;"><a href="${replyHref}" style="background: #014200; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 8px;">Balas melalui email</a></p>
      </div>
    </div>
  `
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
