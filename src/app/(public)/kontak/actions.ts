'use server'

import { headers } from 'next/headers'
import { Resend } from 'resend'
import { checkContactRateLimit, contactSchema, escapeHtml } from '@/lib/contact'

interface ContactSubmitState {
  success: boolean
  message: string
}

export async function sendContactEmail(input: unknown): Promise<ContactSubmitState> {
  const parsed = contactSchema.safeParse(input)

  if (!parsed.success) {
    return { success: false, message: 'Data formulir tidak valid. Periksa kembali isian Anda.' }
  }

  if (parsed.data.website) {
    return { success: true, message: 'Pesan berhasil diterima.' }
  }

  const requestHeaders = await headers()
  const forwardedFor = requestHeaders.get('x-forwarded-for')?.split(',')[0]?.trim()
  const identifier = forwardedFor || requestHeaders.get('x-real-ip') || 'unknown'

  if (!checkContactRateLimit(identifier)) {
    return {
      success: false,
      message: 'Terlalu banyak percobaan. Silakan coba kembali beberapa menit lagi.',
    }
  }

  const apiKey = process.env.RESEND_API_KEY
  const schoolEmail = process.env.SCHOOL_EMAIL || 'website.mtsn1abdya@gmail.com'

  if (!apiKey) {
    console.error('RESEND_API_KEY belum dikonfigurasi')
    return { success: false, message: 'Layanan pesan sedang tidak tersedia.' }
  }

  const form = parsed.data
  const safe = {
    nama: escapeHtml(form.nama),
    email: escapeHtml(form.email),
    kategori: escapeHtml(form.kategori),
    subjek: escapeHtml(form.subjek),
    pesan: escapeHtml(form.pesan),
  }
  const replyHref = `mailto:${encodeURIComponent(form.email)}?subject=${encodeURIComponent(`Re: ${form.subjek}`)}`

  try {
    const resend = new Resend(apiKey)
    const { error } = await resend.emails.send({
      from: 'Website MTsN 1 ABDYA <onboarding@resend.dev>',
      to: schoolEmail,
      replyTo: form.email,
      subject: `[Hubungi Kami] ${form.subjek} - ${form.kategori}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 16px; background: #fff;">
          <div style="background: #014200; padding: 24px; border-radius: 12px 12px 0 0; text-align: center;">
            <h2 style="color: #d1bb07; margin: 0; font-size: 20px;">Pesan Baru</h2>
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
      `,
    })

    if (error) {
      console.error('Resend gagal mengirim pesan kontak', { name: error.name })
      return { success: false, message: 'Pesan belum dapat dikirim. Silakan coba kembali.' }
    }

    return { success: true, message: 'Pesan berhasil terkirim ke Humas madrasah.' }
  } catch (error) {
    console.error('Pengiriman pesan kontak gagal', error instanceof Error ? error.message : 'unknown')
    return { success: false, message: 'Layanan pesan sedang mengalami gangguan.' }
  }
}
