"use client";

import React from "react";
import Link from "next/link";
import { 
  Award, 
  BookOpen, 
  ChevronRight, 
  Compass, 
  Target, 
  CheckCircle, 
  Heart, 
  TrendingUp, 
  Sparkles, 
  ShieldCheck, 
  Leaf, 
  Tv, 
  Users, 
  Lightbulb, 
  GraduationCap, 
  Activity 
} from "lucide-react";

export default function VisiMisiPage() {
  const visiText = "Menjadikan Madrasah Berkarakter Inovasi, Bermutu, Unggul, Berkualitas, Kompetitif dalam Imtaq, Iptek, dan Berwawasan lingkungan";

  const misiData = [
    {
      id: 1,
      text: "Menyelenggarakan Pendidikan dan pembelajaran sesuai dengan Sistem pendidikan Nasional.",
      category: "Pendidikan",
      color: "border-emerald-500 bg-emerald-50/30 text-emerald-800"
    },
    {
      id: 2,
      text: "Melaksanakan pembelajaran dan bimbingan yang praktis, inovatif, integratif, aplikatif, efektif, dan efisien.",
      category: "Metode",
      color: "border-brand-green bg-green-50/30 text-brand-green"
    },
    {
      id: 3,
      text: "Melaksanakan Peningkatan Kompetensi Tenaga Pendidik dan Kependidikan sesuai dengan Standar Nasional.",
      category: "Kepegawaian",
      color: "border-blue-500 bg-blue-50/30 text-blue-800"
    },
    {
      id: 4,
      text: "Melaksanakan Pengembangan Institusi Berdasarkan Manajemen Peningkatan Mutu Berbasis Madrasah (MPMBM).",
      category: "Kelembagaan",
      color: "border-purple-500 bg-purple-50/30 text-purple-800"
    },
    {
      id: 5,
      text: "Meningkatkan Budaya Sehat untuk Mewujudkan Generasi yang Kompetitif.",
      category: "Kesehatan",
      color: "border-red-500 bg-red-50/30 text-red-800"
    },
    {
      id: 6,
      text: "Meningkatkan Pengembangan Fasilitas Pendidikan.",
      category: "Fasilitas",
      color: "border-brand-gold bg-amber-50/30 text-amber-900"
    },
    {
      id: 7,
      text: "Mewujudkan Lulusan yang Berakhlakul Karimah, Berkualitas dan Berwawasan Global.",
      category: "Output",
      color: "border-orange-500 bg-orange-50/30 text-orange-800"
    },
    {
      id: 8,
      text: "Mengoptimalkan program kegiatan pembiasaan dan pengembangan diri yang berkarakter islami dan berorientasi prestasi.",
      category: "Karakter",
      color: "border-indigo-500 bg-indigo-50/30 text-indigo-800"
    },
    {
      id: 9,
      text: "Melaksanakan program unggulan dibidang IMTAQ dan IPTEK untuk mempercepat pengembangan mutu madrasah.",
      category: "Program",
      color: "border-teal-500 bg-teal-50/30 text-teal-800"
    },
    {
      id: 10,
      text: "Mengembangkan madrasah berstatus Madrasah Ramah Anak Tingkat Nasional menjadi madrasah rujukan.",
      category: "Sosial",
      color: "border-pink-500 bg-pink-50/30 text-pink-800"
    },
    {
      id: 11,
      text: "Mewujudkan lingkungan madrasah yang hijau, bersih, sehat dan nyaman dalam rangka mendukung madrasah sebagai Wawasan Wiyatamandala.",
      category: "Lingkungan",
      color: "border-emerald-600 bg-emerald-100/20 text-emerald-950"
    },
    {
      id: 12,
      text: "Memberikan pelayanan pendidikan berbasis digital secara bertahap melalui program Pelayanan Terpadu Satu Pintu.",
      category: "Digitalisasi",
      color: "border-sky-500 bg-sky-50/30 text-sky-800"
    },
    {
      id: 13,
      text: "Mengoptimalkan peran serta orang tua dan masyarakat dalam rangka mendukung program Madrasah Mandiri Berprestasi.",
      category: "Sinergi",
      color: "border-fuchsia-500 bg-fuchsia-50/30 text-fuchsia-800"
    },
    {
      id: 14,
      text: "Menyelenggarakan Pendidikan yang Dilandasi Nilai Keislaman serta Karakter Budaya Bangsa dan Berwawasan Lingkungan.",
      category: "Karakter",
      color: "border-lime-600 bg-lime-50/30 text-lime-900"
    },
    {
      id: 15,
      text: "Menumbuhkembangkan sikap cinta alam dan lingkungan.",
      category: "Lingkungan",
      color: "border-green-600 bg-green-50/30 text-green-900"
    },
    {
      id: 16,
      text: "Meningkatkan kesadaran untuk hidup bersih dan sehat.",
      category: "Kesehatan",
      color: "border-cyan-500 bg-cyan-50/30 text-cyan-800"
    }
  ];

  const tujuanData = [
    {
      text: "Terbentuknya siswa yang berakhlak mulia dan cinta akan budaya daerahnya.",
      icon: <Heart className="w-5 h-5 text-red-500" />
    },
    {
      text: "Terwujudnya siswa yang sehat baik fisik, mental maupun sosial sehingga tangguh dalam menghadapi perubahan pada era globalisasi.",
      icon: <Activity className="w-5 h-5 text-emerald-500" />
    },
    {
      text: "Membentuk siswa agar dapat menguasai ilmu pengetahuan, teknologi, dan seni sehingga dapat mewujudkan cita-cita untuk melanjutkan pendidikan ke jenjang yang lebih tinggi.",
      icon: <GraduationCap className="w-5 h-5 text-blue-500" />
    },
    {
      text: "Mengoptimalkan seluruh potensi yang ada pada anak berkebutuhan khusus agar dapat mandiri dan bersosialisasi.",
      icon: <Users className="w-5 h-5 text-purple-500" />
    },
    {
      text: "Menanamkan rasa peduli terhadap lingkungan, sesama teman, dan cinta akan almamaternya.",
      icon: <Leaf className="w-5 h-5 text-green-600" />
    },
    {
      text: "Menanamkan kedisiplinan yang tinggi terhadap diri sendiri dan mengajarkan kepada orang lain.",
      icon: <ShieldCheck className="w-5 h-5 text-amber-500" />
    },
    {
      text: "Melaksanakan Pembelajaran Aktif, Inovatif, Kreatif, Efektif, dan Menyenangkan.",
      icon: <Sparkles className="w-5 h-5 text-brand-gold" />
    },
    {
      text: "Menumbuhkan kesadaran pada peserta didik untuk selalu berkarakter baik di madrasah maupun masyarakat.",
      icon: <CheckCircle className="w-5 h-5 text-sky-500" />
    },
    {
      text: "Memiliki kesadaran yang tinggi terhadap hidup bersih dan sehat.",
      icon: <CheckCircle className="w-5 h-5 text-teal-500" />
    },
    {
      text: "Mampu mewujudkan generasi yang kompetitif.",
      icon: <TrendingUp className="w-5 h-5 text-indigo-500" />
    },
    {
      text: "Melaksanakan pembelajaran bermutu untuk meningkatkan prestasi peserta didik.",
      icon: <Award className="w-5 h-5 text-brand-gold" />
    },
    {
      text: "Mewujudkan madrasah inovasi menuju madrasah unggul.",
      icon: <Lightbulb className="w-5 h-5 text-yellow-500" />
    },
    {
      text: "Melaksanakan pembelajaran yang berkarakter dan akhlak mulia.",
      icon: <BookOpen className="w-5 h-5 text-emerald-600" />
    },
    {
      text: "Menumbuhkembangkan kesadaran para peserta didik dalam menjaga lingkungan yang bersih dan rapi.",
      icon: <Leaf className="w-5 h-5 text-green-500" />
    },
    {
      text: "Menanamkan kesadaran peserta didik dalam meningkatkan pentingnya pembelajaran teknologi informasi.",
      icon: <Tv className="w-5 h-5 text-sky-600" />
    },
    {
      text: "Mewujudkan generasi islami dan qur'ani sehingga bisa menanamkan kepribadian yang berkarakter.",
      icon: <Compass className="w-5 h-5 text-indigo-600" />
    },
    {
      text: "Memperbaiki bacaan Qur'an serta meningkatkan hafalan Qur'an peserta didik sehingga menjadi generasi Qur'ani.",
      icon: <Compass className="w-5 h-5 text-brand-green" />
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50/40">
      {/* 1. HERO SECTION & BREADCRUMB */}
      <div className="relative overflow-hidden bg-brand-green py-20 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(209,187,7,0.15),transparent_45%)]" />
        <div className="absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-white/5 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/70 mb-4">
            <Link href="/" className="hover:text-brand-gold transition-colors">
              Beranda
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-brand-gold">Profil</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white">Visi & Misi</span>
          </nav>

          {/* Judul & Deskripsi */}
          <div className="max-w-3xl">
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
              Visi, Misi & Tujuan <br />
              <span className="text-brand-gold">MTsN 1 Aceh Barat Daya</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-gray-200 leading-relaxed">
              Pernyataan visi strategis, penjabaran misi operasional, serta target tujuan jangka panjang 
              madrasah untuk mendidik generasi Qur'ani yang berdaya saing global dan cinta lingkungan.
            </p>
          </div>
        </div>
      </div>

      {/* 2. VISI MADRASAH SECTION */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-white border border-gray-100 shadow-xl p-8 sm:p-12">
          {/* Hiasan Latar */}
          <div className="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-brand-gold/10 blur-3xl" />
          <div className="absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-brand-green/5 blur-3xl" />

          <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-green/10 text-brand-green mb-6 border border-brand-green/20">
              <Compass className="w-8 h-8 animate-spin-slow" />
            </div>
            
            <span className="text-xs font-extrabold uppercase tracking-widest text-brand-gold mb-3">
              Visi Madrasah
            </span>
            
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-brand-green leading-snug tracking-tight">
              "{visiText}"
            </h2>

            {/* Pemisahan 3 Pilar dari Visi */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 w-full text-left">
              <div className="bg-emerald-50/50 rounded-2xl p-6 border border-emerald-100 hover:border-emerald-300 transition-all duration-300">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500 text-white mb-4">
                  <Heart className="w-5 h-5" />
                </div>
                <h3 className="font-extrabold text-emerald-950 text-md mb-2">Imtaq & Karakter</h3>
                <p className="text-xs text-emerald-800 leading-relaxed font-medium">
                  Membentuk generasi islami yang qur'ani, berakhlak mulia, toleran, dan berpegang teguh pada nilai-nilai keagamaan.
                </p>
              </div>

              <div className="bg-amber-50/50 rounded-2xl p-6 border border-amber-100 hover:border-amber-300 transition-all duration-300">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-gold text-white mb-4">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="font-extrabold text-amber-950 text-md mb-2">Iptek & Inovasi</h3>
                <p className="text-xs text-amber-900 leading-relaxed font-medium">
                  Mendorong penguasaan ilmu pengetahuan, literasi teknologi digital secara bertahap, serta daya saing akademik yang unggul.
                </p>
              </div>

              <div className="bg-green-50/50 rounded-2xl p-6 border border-green-100 hover:border-green-300 transition-all duration-300">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-green text-white mb-4">
                  <Leaf className="w-5 h-5" />
                </div>
                <h3 className="font-extrabold text-brand-green text-md mb-2">Lingkungan Hidup</h3>
                <p className="text-xs text-green-900 leading-relaxed font-medium">
                  Menanamkan sikap peduli lingkungan, budaya hidup bersih, asri, dan nyaman untuk mewujudkan Wawasan Wiyatamandala.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. MISI MADRASAH SECTION (GRID LAYOUT DENGAN WHITESPACE LEGA) */}
      <div className="bg-white border-y border-gray-100 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-3">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-gold/10 text-brand-gold border border-brand-gold/20">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-extrabold text-brand-green tracking-tight sm:text-4xl">
              Misi Mulia Madrasah
            </h2>
            <p className="text-base text-gray-500 font-medium">
              16 butir langkah operasional strategis yang kami laksanakan demi mewujudkan seluruh aspek visi.
            </p>
          </div>

          {/* Grid Misi 2-Kolom yang Bernapas Lega */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {misiData.map((misi) => (
              <div 
                key={misi.id}
                className="flex items-start gap-4 p-6 rounded-2xl bg-gray-50/50 border border-gray-100 hover:border-brand-green/20 hover:bg-white hover:shadow-md transition-all duration-300 group"
              >
                {/* ID / Nomor dengan kategori di atasnya */}
                <div className="flex flex-col items-center">
                  <span className={`inline-flex items-center justify-center text-xs font-black h-10 w-10 rounded-xl border-2 shadow-xs shrink-0 group-hover:scale-105 transition-transform ${misi.color}`}>
                    {String(misi.id).padStart(2, '0')}
                  </span>
                  <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider mt-2 group-hover:text-brand-green transition-colors">
                    {misi.category}
                  </span>
                </div>

                {/* Teks Misi */}
                <div className="flex flex-col gap-1.5 pt-1">
                  <p className="text-sm font-semibold text-gray-700 group-hover:text-gray-900 leading-relaxed transition-colors">
                    {misi.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. TUJUAN MADRASAH SECTION */}
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-3">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50/80 text-emerald-600 border border-emerald-100">
            <CheckCircle className="w-6 h-6" />
          </div>
          <h2 className="text-3xl font-extrabold text-brand-green tracking-tight sm:text-4xl">
            Tujuan Jangka Panjang
          </h2>
          <p className="text-base text-gray-500 font-medium">
            Sasaran konkret pencapaian mutu lulusan, kompetensi guru, serta lingkungan madrasah kami.
          </p>
        </div>

        {/* Grid Card List Tujuan */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {tujuanData.map((tujuan, index) => (
            <div 
              key={index}
              className="relative overflow-hidden p-6 rounded-2xl bg-white border border-gray-100 shadow-xs hover:shadow-md hover:border-brand-gold/30 transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Garis Aksen Emas Hover */}
              <div className="absolute top-0 left-0 w-full h-1 bg-transparent group-hover:bg-brand-gold transition-colors duration-300" />

              <div className="flex gap-4">
                {/* Ikon Khas Masing-masing Tujuan */}
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-50 border border-gray-100 group-hover:bg-brand-green/5 shrink-0 transition-colors">
                  {tujuan.icon}
                </div>
                
                <p className="text-xs sm:text-sm font-bold text-gray-600 group-hover:text-gray-800 leading-relaxed transition-colors">
                  {tujuan.text}
                </p>
              </div>

              {/* Angka indeks subtle di pojok bawah */}
              <span className="text-[10px] text-gray-300 font-extrabold text-right mt-4 select-none uppercase tracking-wider group-hover:text-brand-gold/60 transition-colors">
                Target {String(index + 1).padStart(2, '0')}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 5. BANNER CTA PORTAL LAYANAN */}
      <div className="mx-auto max-w-5xl px-4 pb-20 text-center sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-brand-green to-emerald-950 p-10 sm:p-16 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(209,187,7,0.15),transparent_40%)]" />
          <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center gap-6">
            <Award className="w-12 h-12 text-brand-gold animate-bounce" />
            <h3 className="text-2xl font-extrabold sm:text-3xl">Wujudkan Madrasah Mandiri Berprestasi</h3>
            <p className="text-base text-gray-200 leading-relaxed font-medium">
              Sinergi erat antara kurikulum nasional, pembiasaan karakter Islami, serta dukungan sarana teknologi 
              mendorong MTsN 1 Abdya konsisten mencetak generasi emas masa depan.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
              <Link
                href="/layanan"
                className="inline-flex items-center justify-center rounded-full bg-brand-gold text-brand-green px-6 py-3 text-sm font-extrabold hover:bg-white hover:text-brand-green hover:shadow-lg transition-all duration-300"
              >
                Kunjungi Portal Layanan Sekolah
              </Link>
              <Link
                href="/profil/sejarah"
                className="inline-flex items-center justify-center rounded-full bg-white/10 text-white border border-white/20 px-6 py-3 text-sm font-bold hover:bg-white/20 transition-all duration-300"
              >
                Baca Sejarah Singkat
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
