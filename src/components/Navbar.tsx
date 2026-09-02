"use client";

import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, BookOpen, GraduationCap, Phone, Info, Award, FileText, Newspaper, Image as ImageIcon } from "lucide-react";

// Struktur Menu Navigasi - Maksimal 2 Level sesuai blueprint rancangan-website-sekolah.md
interface NavItem {
  label: string;
  href?: string;
  children?: {
    label: string;
    href: string;
    description?: string;
    icon?: React.ReactNode;
  }[];
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  const navigation: NavItem[] = [
    { label: "Beranda", href: "/" },
    {
      label: "Profil",
      children: [
        {
          label: "Sejarah Madrasah",
          href: "/profil/sejarah",
          description: "Perjalanan historis hingga menjadi Madrasah Inovasi.",
          icon: <BookOpen className="w-5 h-5 text-brand-green" />,
        },
        {
          label: "Visi & Misi",
          href: "/profil/visi-misi",
          description: "Visi karakter Islami, unggul iptek, dan ramah lingkungan.",
          icon: <Award className="w-5 h-5 text-brand-green" />,
        },
        {
          label: "Guru & Staf",
          href: "/profil/staf",
          description: "Direktori interaktif pendidik dan tenaga kependidikan.",
          icon: <GraduationCap className="w-5 h-5 text-brand-green" />,
        },
      ],
    },
    {
      label: "Layanan",
      children: [
        {
          label: "Portal Layanan Terpadu",
          href: "/layanan",
          description: "Akses satu pintu RDM, Absensi, EMIS, Simpatika, dan Pusaka Kemenag.",
          icon: <Info className="w-5 h-5 text-brand-green" />,
        },
        {
          label: "Pusat Unduhan",
          href: "/layanan/unduh",
          description: "Unduh blangko administrasi, surat keterangan aktif, pengganti ijazah, dll.",
          icon: <FileText className="w-5 h-5 text-brand-green" />,
        },
      ],
    },
    {
      label: "Kabar",
      children: [
        {
          label: "Berita & Kegiatan",
          href: "/kabar/berita",
          description: "Informasi terkini mengenai kegiatan, prestasi, dan pengumuman madrasah.",
          icon: <Newspaper className="w-5 h-5 text-brand-green" />,
        },
        {
          label: "Galeri Foto",
          href: "/kabar/galeri",
          description: "Dokumentasi visual kegiatan belajar mengajar dan fasilitas madrasah.",
          icon: <ImageIcon className="w-5 h-5 text-brand-green" />,
        },
      ],
    }
  ];

  const toggleDropdown = (label: string) => {
    if (activeDropdown === label) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(label);
    }
  };

  const isLinkActive = (href?: string) => {
    if (!href) return false;
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const isDropdownActive = (children?: { href: string }[]) => {
    if (!children) return false;
    return children.some((child) => pathname.startsWith(child.href));
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/95 backdrop-blur-md shadow-xs">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* LOGO SEBELAH KIRI */}
          <Link href="/" prefetch={false} className="flex items-center gap-3 group">
            {/* Logo Placeholder - Nanti diganti dengan file SVG asli logo-mtsn.svg */}
            <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white p-0.5 shadow-md border border-gray-100 overflow-hidden">
              <Image 
                src="/logo.jpg" 
                alt="Logo MTsN 1 Aceh Barat Daya" 
                width={40} 
                height={40} 
                className="object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg leading-tight text-brand-green tracking-wide group-hover:text-brand-green/90 transition-colors">
                MTsN 1 Aceh Barat Daya
              </span>
              <span className="text-xs text-gray-500 font-medium tracking-wider uppercase">
                Madrasah Karakter & Inovasi
              </span>
            </div>
          </Link>

          {/* MENU DESKTOP (CENTER/RIGHT) */}
          <div className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => (
              <div key={item.label} className="relative group/menu">
                {item.href ? (
                  // Link Level 1 Langsung (Tanpa Dropdown)
                  <Link
                    href={item.href}
                    prefetch={false}
                    className={`relative py-2 text-sm font-semibold tracking-wide transition-colors ${
                      isLinkActive(item.href)
                        ? "text-brand-green"
                        : "text-gray-600 hover:text-brand-green"
                    }`}
                  >
                    {item.label}
                    {isLinkActive(item.href) && (
                      <span className="absolute bottom-0 left-0 h-0.5 w-full bg-brand-gold rounded-full" />
                    )}
                  </Link>
                ) : (
                  // Menu dengan Dropdown Level 2
                  <>
                    <button
                      className={`flex items-center gap-1.5 py-2 text-sm font-semibold tracking-wide transition-colors focus:outline-none ${
                        isDropdownActive(item.children)
                          ? "text-brand-green"
                          : "text-gray-600 hover:text-brand-green"
                      }`}
                    >
                      {item.label}
                      <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover/menu:rotate-180 text-gray-400 group-hover/menu:text-brand-green" />
                      {isDropdownActive(item.children) && (
                        <span className="absolute bottom-0 left-0 h-0.5 w-full bg-brand-gold rounded-full" />
                      )}
                    </button>

                    {/* DROPDOWN CONTAINER (MEGA-LIGHT) */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-80 rounded-xl border border-gray-100 bg-white p-2 shadow-xl opacity-0 invisible translate-y-2 group-hover/menu:opacity-100 group-hover/menu:visible group-hover/menu:translate-y-0 transition-all duration-300 ease-out">
                      <div className="grid gap-1">
                        {item.children?.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            prefetch={false}
                            className={`flex items-start gap-3 rounded-lg p-3 transition-colors ${
                              pathname === child.href
                                ? "bg-gray-50 text-brand-green"
                                : "hover:bg-gray-50 text-gray-700 hover:text-brand-green"
                            }`}
                          >
                            <div className="flex-shrink-0 mt-0.5 rounded-lg bg-gray-50 p-1.5 border border-gray-100">
                              {child.icon}
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm font-bold leading-none mb-1">
                                {child.label}
                              </span>
                              <span className="text-xs text-gray-400 leading-normal font-medium">
                                {child.description}
                              </span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>

          {/* HUBUNGI KAMI BUTTON (DESKTOP) */}
          <div className="hidden lg:flex items-center">
            <Link
              href="/kontak"
              prefetch={false}
              className="flex items-center gap-2 rounded-full bg-brand-green px-5 py-2.5 text-sm font-bold text-white shadow-md hover:bg-brand-green/90 hover:shadow-lg transition-all duration-300"
            >
              <Phone className="w-4 h-4 text-brand-gold" />
              <span>Hubungi Kami</span>
            </Link>
          </div>

          {/* HAMBURGER TOGGLE (MOBILE) */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-lg p-2 text-gray-500 hover:bg-gray-50 hover:text-brand-green focus:outline-none"
              aria-label={isOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU PANEL */}
      <div
        id="mobile-navigation"
        aria-hidden={!isOpen}
        inert={!isOpen ? true : undefined}
        className={`lg:hidden transition-all duration-300 ease-in-out border-t border-gray-100 bg-white ${
          isOpen ? "max-h-[calc(100vh-80px)] opacity-100 overflow-y-auto" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="space-y-1 px-4 py-4">
          {navigation.map((item) => (
            <div key={item.label} className="border-b border-gray-50 last:border-none pb-2 last:pb-0">
              {item.href ? (
                <Link
                  href={item.href}
                  prefetch={false}
                  onClick={() => setIsOpen(false)}
                  className={`block rounded-lg px-3 py-2 text-base font-bold transition-colors ${
                    isLinkActive(item.href)
                      ? "bg-brand-green/5 text-brand-green"
                      : "text-gray-700 hover:bg-gray-50 hover:text-brand-green"
                  }`}
                >
                  {item.label}
                </Link>
              ) : (
                <div>
                  <button
                    onClick={() => toggleDropdown(item.label)}
                    className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-base font-bold text-gray-700 hover:bg-gray-50 hover:text-brand-green focus:outline-none"
                    aria-expanded={activeDropdown === item.label}
                    aria-controls={`mobile-submenu-${item.label.toLowerCase()}`}
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${
                        activeDropdown === item.label ? "rotate-180 text-brand-green" : ""
                      }`}
                    />
                  </button>
                  <div
                    id={`mobile-submenu-${item.label.toLowerCase()}`}
                    className={`mt-1 pl-4 space-y-1 transition-all duration-300 ${
                      activeDropdown === item.label ? "block" : "hidden"
                    }`}
                  >
                    {item.children?.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        prefetch={false}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors ${
                          pathname === child.href
                            ? "bg-gray-50 text-brand-green"
                            : "text-gray-600 hover:bg-gray-50 hover:text-brand-green"
                        }`}
                      >
                        <div className="flex-shrink-0">{child.icon}</div>
                        <span>{child.label}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* HUBUNGI KAMI BUTTON (MOBILE) */}
          <div className="pt-4">
            <Link
              href="/kontak"
              prefetch={false}
              onClick={() => setIsOpen(false)}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand-green py-3 text-center text-sm font-bold text-white shadow-md hover:bg-brand-green/90 transition-all"
            >
              <Phone className="w-4 h-4 text-brand-gold" />
              <span>Hubungi Kami</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
