'use server'

import { headers } from 'next/headers'
import { Resend } from 'resend'
import { buildContactEmailHtml, checkContactRateLimit, contactSchema } from '@/lib/contact'
import { env } from '@/lib/env'

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

  if (!env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY belum dikonfigurasi')
    return { success: false, message: 'Layanan pesan sedang tidak tersedia.' }
  }

  const form = parsed.data

  try {
    const resend = new Resend(env.RESEND_API_KEY)
    const { error } = await resend.emails.send({
      from: `Website MTsN 1 ABDYA <${env.RESEND_FROM_EMAIL}>`,
      to: env.SCHOOL_EMAIL,
      replyTo: form.email,
      subject: `[Hubungi Kami] ${form.subjek} - ${form.kategori}`,
      html: buildContactEmailHtml(form),
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
