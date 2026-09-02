"use server"

import { Resend } from 'resend'

// Inisialisasi Resend dengan API Key dari environment variable .env.local
const resend = new Resend(process.env.RESEND_API_KEY)

interface ContactSubmitState {
  success: boolean
  message: string
}

export async function sendContactEmail(formData: {
  nama: string
  email: string
  kategori: string
  subjek: string
  pesan: string
}): Promise<ContactSubmitState> {
  // 1. Validasi sederhana di sisi server
  if (!formData.nama || !formData.email || !formData.subjek || !formData.pesan) {
    return {
      success: false,
      message: 'Seluruh kolom wajib diisi dengan benar.',
    }
  }

  try {
    // Alamat email dinamis tujuan (email resmi humas madrasah)
    const schoolEmail = process.env.SCHOOL_EMAIL || 'mtsn1acehbaratdaya@gmail.com'

    // 2. Kirim email menggunakan Resend API
    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL 
        ? `Website MTsN 1 Abdya <${process.env.RESEND_FROM_EMAIL}>`
        : 'Website MTsN 1 Abdya <humas@mtsn1acehbaratdaya.sch.id>',
      to: schoolEmail,
      replyTo: formData.email, // Mempermudah sekolah membalas langsung ke pengirim
      subject: `[Hubungi Kami] ${formData.subjek} - ${formData.kategori}`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 16px; background-color: #ffffff;">
          <!-- Header Logo / Tema Kemenag Hijau Emas -->
          <div style="background-color: #014200; padding: 24px; border-radius: 12px 12px 0 0; text-align: center;">
            <h2 style="color: #D1BB07; margin: 0; font-size: 20px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px;">
              Pesan Baru dari Website
            </h2>
            <p style="color: #ffffff; margin: 5px 0 0 0; font-size: 13px; font-weight: 500;">
              Portal Hubungi Kami - MTsN 1 Aceh Barat Daya
            </p>
          </div>

          <!-- Konten Utama -->
          <div style="padding: 24px; color: #1f2937;">
            <p style="font-size: 14px; line-height: 1.6; margin-bottom: 20px; color: #4b5563;">
              Halo Tim Humas MTsN 1 Abdya, Anda menerima pesan baru dari pengunjung website resmi sekolah dengan rincian sebagai berikut:
            </p>

            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
              <tr style="border-bottom: 1px solid #f3f4f6;">
                <td style="padding: 10px 0; font-size: 11px; font-weight: bold; color: #9ca3af; text-transform: uppercase; width: 30%;">Nama Pengirim</td>
                <td style="padding: 10px 0; font-size: 14px; font-weight: 600; color: #1f2937;">${formData.nama}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f3f4f6;">
                <td style="padding: 10px 0; font-size: 11px; font-weight: bold; color: #9ca3af; text-transform: uppercase;">Email</td>
                <td style="padding: 10px 0; font-size: 14px; font-weight: 600; color: #014200;">
                  <a href="mailto:${formData.email}" style="color: #014200; text-decoration: none;">${formData.email}</a>
                </td>
              </tr>
              <tr style="border-bottom: 1px solid #f3f4f6;">
                <td style="padding: 10px 0; font-size: 11px; font-weight: bold; color: #9ca3af; text-transform: uppercase;">Status / Hubungan</td>
                <td style="padding: 10px 0; font-size: 14px; font-weight: 600; color: #D1BB07;">${formData.kategori}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f3f4f6;">
                <td style="padding: 10px 0; font-size: 11px; font-weight: bold; color: #9ca3af; text-transform: uppercase;">Subjek</td>
                <td style="padding: 10px 0; font-size: 14px; font-weight: 700; color: #1f2937;">${formData.subjek}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-size: 11px; font-weight: bold; color: #9ca3af; text-transform: uppercase; vertical-align: top;">Waktu Kirim</td>
                <td style="padding: 10px 0; font-size: 14px; font-weight: 600; color: #1f2937;">${new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })} WIB</td>
              </tr>
            </table>

            <!-- Detail Pesan -->
            <div style="background-color: #f9fafb; border-left: 4px solid #014200; padding: 16px; border-radius: 0 8px 8px 0; margin-bottom: 24px;">
              <h4 style="margin: 0 0 8px 0; font-size: 11px; text-transform: uppercase; color: #9ca3af; font-weight: 800; letter-spacing: 0.5px;">
                Isi Pesan:
              </h4>
              <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #374151; white-space: pre-wrap; font-style: italic;">
                "${formData.pesan}"
              </p>
            </div>

            <!-- Tombol Balas Instan -->
            <div style="text-align: center; margin-top: 30px;">
              <a href="mailto:${formData.email}?subject=Re: ${encodeURIComponent(formData.subjek)}" style="display: inline-block; background-color: #014200; color: #ffffff; text-decoration: none; padding: 12px 24px; font-size: 14px; font-weight: bold; border-radius: 8px; box-shadow: 0 4px 6px rgba(1, 66, 0, 0.15);">
                Balas Langsung via Email
              </a>
            </div>
          </div>

          <!-- Footer Email -->
          <div style="border-top: 1px solid #f3f4f6; padding-top: 16px; text-align: center; color: #9ca3af; font-size: 11px; font-weight: 500;">
            Pesan ini dikirim otomatis oleh sistem formulir kontak website resmi <br>
            <strong style="color: #014200;">MTsN 1 Aceh Barat Daya</strong>.
          </div>
        </div>
      `,
    })

    if (error) {
      console.error('Error dari API Resend:', error)
      return {
        success: false,
        message: `Gagal mengirim email: ${error.message}`,
      }
    }

    return {
      success: true,
      message: 'Pesan berhasil terkirim ke email Humas madrasah!',
    }
  } catch (error) {
    console.error('Gagal memproses pengiriman email kontak:', error)
    return {
      success: false,
      message: 'Terjadi kesalahan sistem internal saat mengirim pesan.',
    }
  }
}
