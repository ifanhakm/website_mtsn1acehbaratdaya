"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle2, 
  HelpCircle, 
  ChevronDown,
  ExternalLink,
  MessageSquare,
  AlertCircle
} from "lucide-react";
import { sendContactEmail } from "./actions"; // 👈 Impor Server Action Resend baru kita!

// Tipe untuk Formulir Kontak
interface ContactForm {
  nama: string;
  email: string;
  kategori: string;
  subjek: string;
  pesan: string;
  website: string;
}

// Data FAQ (Pertanyaan yang Sering Diajukan)
interface FAQItem {
  question: string;
  answer: string;
}

export default function KontakPage() {
  // State untuk Formulir
  const [form, setForm] = useState<ContactForm>(({
    nama: "",
    email: "",
    kategori: "Wali Murid",
    subjek: "",
    pesan: "",
    website: "",
  }));

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // 👈 State penampung eror pengiriman

  // State untuk Akordion FAQ
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: "Bagaimana cara meminta Surat Keterangan Aktif Siswa?",
      answer: "Anda dapat mengunduh Blangko Surat Keterangan Aktif Siswa terlebih dahulu di menu 'Layanan > Pusat Unduh Dokumen'. Setelah diisi, serahkan berkas tersebut ke bagian Tata Usaha (TU) madrasah pada jam kerja untuk ditandatangani dan dicap resmi oleh Kepala Madrasah.",
    },
    {
      question: "Kapan jam kerja operasional pelayanan Tata Usaha?",
      answer: "Pelayanan administrasi Tata Usaha MTsN 1 Aceh Barat Daya buka setiap hari Senin s.d. Kamis pukul 08:00 - 15:00 WIB, dan hari Jumat pukul 08:00 - 11:30 WIB. Kantor libur pada hari Sabtu, Minggu, dan hari libur nasional.",
    },
    {
      question: "Apakah alumni bisa meminta legalisir ijazah secara online?",
      answer: "Untuk saat ini, proses legalisir ijazah harus dilakukan secara langsung dengan membawa dokumen asli ke bagian Tata Usaha madrasah guna verifikasi keabsahan. Namun, Anda dapat mengunduh formulir pendukung seperti Surat Pengganti Ijazah atau Surat Kuasa di portal unduhan kami terlebih dahulu.",
    },
    {
      question: "Bagaimana alur pendaftaran siswa baru (PPDB) di madrasah ini?",
      answer: "Pendaftaran Peserta Didik Baru (PPDB) biasanya dibuka secara online sekitar bulan Maret-April setiap tahunnya. Alur lengkap pendaftaran, syarat berkas, dan jadwal ujian seleksi akan diterbitkan secara resmi melalui halaman Berita & Pengumuman website ini saat masa pendaftaran telah dibuka.",
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // 🌟 PENGIRIMAN DATA MENGGUNAKAN SERVER ACTION RESEND
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await sendContactEmail(form);

      if (response.success) {
        setIsSuccess(true);
        // Kosongkan isi form setelah sukses
        setForm({
          nama: "",
          email: "",
          kategori: "Wali Murid",
          subjek: "",
          pesan: "",
          website: "",
        });
      } else {
        setErrorMessage(response.message);
      }
    } catch (err) {
      console.error("Gagal mengirim pesan kontak:", err);
      setErrorMessage("Terjadi kendala jaringan server. Silakan pastikan koneksi internet Anda aktif.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* 1. HERO HEADER */}
      <div className="relative overflow-hidden bg-brand-green py-20 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(209,187,7,0.15),transparent_45%)]" />
        <div className="absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-white/5 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/70 mb-4">
            <Link href="/" className="hover:text-brand-gold transition-colors">
              Beranda
            </Link>
            <span className="text-white/40">/</span>
            <span className="text-white">Hubungi Kami</span>
          </nav>

          <div className="max-w-3xl">
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
              Hubungi Madrasah <br />
              <span className="text-brand-gold">MTsN 1 Aceh Barat Daya</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-gray-200 leading-relaxed">
              Punya pertanyaan mengenai administrasi, pendaftaran siswa baru, atau ingin memberikan masukan? 
              Tim humas kami siap melayani Anda sepenuh hati.
            </p>
          </div>
        </div>
      </div>

      {/* 2. AREA UTAMA: INFO KONTAK & FORMULIR */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-start">
          
          {/* SISI KIRI: KARTU-KARTU INFORMASI KONTAK (5 Kolom) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Judul Seksi */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-gold bg-brand-green/10 px-3.5 py-1.5 rounded-full">
                Informasi Kontak
              </span>
              <h2 className="text-2xl font-extrabold text-brand-green mt-3 tracking-tight">
                Pusat Pelayanan Terpadu
              </h2>
              <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                Silakan datang langsung ke gedung madrasah atau hubungi kami melalui saluran resmi di bawah ini.
              </p>
            </div>

            {/* Kartu Detail Kontak */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              
              {/* Alamat */}
              <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs hover:shadow-md transition-all duration-300 flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-green/10 text-brand-green">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="flex flex-col gap-1">
                  <h4 className="text-sm font-extrabold text-gray-800">Alamat Fisik</h4>
                  <p className="text-xs text-gray-500 leading-relaxed font-semibold">
                    Jl. Pendidikan No. 56, Desa Pantai Perak, Kecamatan Susoh, Kabupaten Aceh Barat Daya, Provinsi Aceh (Kode Pos: 23765)
                  </p>
                  <a 
                    href="https://maps.app.goo.gl/eUbW4UMju2G4kHfj6" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-brand-gold hover:text-brand-green transition-colors mt-1.5"
                  >
                    <span>Buka Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Kontak Telefon */}
              <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs hover:shadow-md transition-all duration-300 flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-green/10 text-brand-green">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="flex flex-col gap-1">
                  <h4 className="text-sm font-extrabold text-gray-800">Telepon & WhatsApp</h4>
                  <p className="text-xs text-gray-500 leading-relaxed font-semibold">
                    +62 811-XXXX-XXXX (Humas Madrasah)
                  </p>
                  <span className="text-[10px] text-gray-400 font-bold">
                    Melayani telepon & pesan singkat selama jam kerja.
                  </span>
                </div>
              </div>

              {/* Email */}
              <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs hover:shadow-md transition-all duration-300 flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-green/10 text-brand-green">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="flex flex-col gap-1">
                  <h4 className="text-sm font-extrabold text-gray-800">Email</h4>
                  <p className="text-xs text-gray-500 leading-relaxed font-semibold break-all">
                    mtsn1acehbaratdaya@gmail.com
                  </p>
                  <span className="text-[10px] text-gray-400 font-bold">
                    Gunakan email untuk persuratan formal kedinasan.
                  </span>
                </div>
              </div>

              {/* Jam Operasional */}
              <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs hover:shadow-md transition-all duration-300 flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-green/10 text-brand-green">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="flex flex-col gap-1">
                  <h4 className="text-sm font-extrabold text-gray-800">Waktu Pelayanan</h4>
                  <p className="text-xs text-gray-500 leading-relaxed font-semibold">
                    Senin - Jumat: 08.00 - 16.00 WIB
                  </p>
                  <span className="text-[10px] text-brand-green font-bold mt-1">
                    *Sabtu, Minggu & Hari Libur Nasional Tutup.
                  </span>
                </div>
              </div>

            </div>

          </div>

          {/* SISI KANAN: FORMULIR INBOX ELEGAN (7 Kolom) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-10 shadow-xl relative overflow-hidden">
              {/* Garis Dekorasi Atas */}
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-brand-green to-brand-gold" />
              
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-green text-white shadow-md">
                  <MessageSquare className="w-5 h-5 text-brand-gold" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">Kirim Pesan Langsung</h3>
                  <p className="text-xs text-gray-400 font-medium">Pesan Anda akan diteruskan otomatis ke email Humas kami.</p>
                </div>
              </div>

              {isSuccess ? (
                /* Tampilan Sukses Kirim Pesan */
                <div className="py-12 flex flex-col items-center text-center gap-4 animate-fade-in">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 border-4 border-emerald-50">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-extrabold text-brand-green">Pesan Berhasil Terkirim!</h4>
                  <p className="text-sm text-gray-500 max-w-md leading-relaxed font-semibold">
                    Terima kasih telah menghubungi kami. Tim Humas MTsN 1 Aceh Barat Daya akan mempelajari 
                    pesan Anda dan segera memberikan tanggapan melalui email yang Anda cantumkan.
                  </p>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="mt-4 inline-flex items-center justify-center rounded-full bg-brand-green text-white px-6 py-2.5 text-sm font-extrabold hover:bg-emerald-950 hover:shadow-lg transition-all duration-300 cursor-pointer"
                  >
                    Kirim Pesan Lainnya
                  </button>
                </div>
              ) : (
                /* Tampilan Formulir Pesan */
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="website">Website</label>
                    <input
                      id="website"
                      name="website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={form.website}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  {/* Banner Eror Kustom */}
                  {errorMessage && (
                    <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs font-bold leading-relaxed flex items-start gap-2.5 animate-fade-in">
                      <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    {/* Input Nama */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="nama" className="text-xs font-bold text-gray-700 uppercase tracking-wide">
                        Nama Lengkap
                      </label>
                      <input
                        type="text"
                        id="nama"
                        name="nama"
                        required
                        maxLength={100}
                        placeholder="Contoh: Muhammad Farhan"
                        value={form.nama}
                        onChange={handleInputChange}
                        className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm font-semibold text-gray-800 outline-none focus:border-brand-green focus:bg-white focus:ring-4 focus:ring-brand-green/10 transition-all duration-300"
                      />
                    </div>

                    {/* Input Email */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="email" className="text-xs font-bold text-gray-700 uppercase tracking-wide">
                        Alamat Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        maxLength={254}
                        placeholder="Contoh: farhan@email.com"
                        value={form.email}
                        onChange={handleInputChange}
                        className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm font-semibold text-gray-800 outline-none focus:border-brand-green focus:bg-white focus:ring-4 focus:ring-brand-green/10 transition-all duration-300"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    {/* Selektor Hubungan/Kategori */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="kategori" className="text-xs font-bold text-gray-700 uppercase tracking-wide">
                        Status Anda
                      </label>
                      <select
                        id="kategori"
                        name="kategori"
                        value={form.kategori}
                        onChange={handleInputChange}
                        className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm font-semibold text-gray-700 outline-none focus:border-brand-green focus:bg-white transition-all duration-300"
                      >
                        <option value="Wali Murid">Wali Murid</option>
                        <option value="Alumni">Alumni</option>
                        <option value="Siswa">Siswa</option>
                        <option value="Guru/Pegawai">Guru / Staf Kepegawaian</option>
                        <option value="Masyarakat Umum">Masyarakat Umum / Instansi Luar</option>
                      </select>
                    </div>

                    {/* Input Subjek */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="subjek" className="text-xs font-bold text-gray-700 uppercase tracking-wide">
                        Subjek Pesan
                      </label>
                      <input
                        type="text"
                        id="subjek"
                        name="subjek"
                        required
                        maxLength={150}
                        placeholder="Contoh: Tanya Berkas PPDB 2027"
                        value={form.subjek}
                        onChange={handleInputChange}
                        className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm font-semibold text-gray-800 outline-none focus:border-brand-green focus:bg-white focus:ring-4 focus:ring-brand-green/10 transition-all duration-300"
                      />
                    </div>
                  </div>

                  {/* Input Detail Pesan */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="pesan" className="text-xs font-bold text-gray-700 uppercase tracking-wide">
                      Isi Pesan Anda
                    </label>
                    <textarea
                      id="pesan"
                      name="pesan"
                      rows={5}
                      required
                      minLength={10}
                      maxLength={5000}
                      placeholder="Tuliskan pertanyaan, aduan, atau masukan Anda secara jelas dan santun..."
                      value={form.pesan}
                      onChange={handleInputChange}
                      className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3.5 text-sm font-semibold text-gray-800 outline-none focus:border-brand-green focus:bg-white focus:ring-4 focus:ring-brand-green/10 transition-all duration-300 resize-none"
                    />
                  </div>

                  {/* Tombol Kirim */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-brand-green text-white px-6 py-3.5 text-sm font-extrabold hover:bg-emerald-950 hover:shadow-lg disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-300 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        <span>Sedang Mengirim Pesan...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-brand-gold" />
                        <span>Kirim Pesan Sekarang</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* 3. SECTION: AKORDION FAQ INSTAN */}
      <div className="bg-white border-t border-gray-100 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-10 flex flex-col gap-2">
            <div className="flex h-11 w-11 mx-auto items-center justify-center rounded-full bg-brand-green/10 text-brand-green">
              <HelpCircle className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-extrabold text-brand-green mt-2">Pertanyaan yang Sering Diajukan (FAQ)</h3>
            <p className="text-sm text-gray-500 max-w-md mx-auto">
              Mungkin jawaban atas pertanyaan Anda sudah kami rangkum di bawah ini sebelum Anda menghubungi kami.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div 
                  key={index}
                  className="border border-gray-100 rounded-2xl bg-gray-50/30 overflow-hidden transition-all duration-300 hover:border-brand-green/20"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between p-5 text-left font-extrabold text-gray-800 text-sm sm:text-base focus:outline-none focus:bg-gray-50"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown 
                      className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-brand-green" : ""
                      }`} 
                    />
                  </button>
                  
                  <div 
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      isOpen ? "max-h-[500px] border-t border-gray-100" : "max-h-0"
                    }`}
                  >
                    <div className="p-5 text-sm text-gray-600 leading-relaxed font-semibold">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>

      {/* 4. MAPS EMPOWERMENT SECTION */}
      <div className="bg-gray-50/50 py-16 border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-xl font-extrabold text-brand-green">Lokasi Geografis Madrasah</h3>
          <p className="text-sm text-gray-500 max-w-md mx-auto mt-1 mb-8">
            Peta lokasi MTsN 1 Aceh Barat Daya untuk mempermudah navigasi perjalanan.
          </p>
          
          {/* Iframe Maps Wrapper */}
          <div className="w-full max-w-4xl mx-auto h-96 rounded-3xl overflow-hidden border border-gray-200 shadow-md bg-white p-2">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1990.6882038420117!2d96.8223238!3d3.7278472!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x303961efedbcebd1%3A0x82c3df9a3c136a20!2sMTsN%20Unggul%20Susoh!5e0!3m2!1sid!2sid!4v1787846784146!5m2!1sid!2sid" 
              className="w-full h-full rounded-2xl border-0"
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              title="Peta Lokasi Resmi MTsN 1 Aceh Barat Daya"
            />
          </div>
        </div>
      </div>

    </div>
  );
}
