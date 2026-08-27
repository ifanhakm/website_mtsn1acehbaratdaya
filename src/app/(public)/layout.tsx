import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar"; 
import Footer from "@/components/Footer"; 

export const metadata: Metadata = {
  title: "MTsN 1 Aceh Barat Daya",
  description: "Website resmi Madrasah Tsanawiyah Negeri 1 Aceh Barat Daya, Provinsi Aceh. Unggul dalam Imtaq, Iptek, dan Berwawasan Lingkungan.",
  icons: {
    icon: "/logo.jpg",        
    shortcut: "/logo.jpg",
    apple: "/logo.jpg",
  },
  openGraph: {
    title: "MTsN 1 Aceh Barat Daya",
    description: "Unggul dalam Imtaq, Iptek, dan Berwawasan Lingkungan.",
    url: "mtsn1acehbaratdaya.sch.id", 
    siteName: "MTsN 1 Abdya",
    images: [
      {
        url: "/logo.jpg",   
        width: 800,
        height: 800,
        alt: "Logo MTsN 1 Aceh Barat Daya",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col antialiased">
        {/* Header Navigasi Global */}
        <Navbar />
        
        {/* Area Konten Utama Halaman */}
        <main className="flex-grow">
          {children}
        </main>
        
        {/* Kaki Halaman Global */}
        <Footer />
      </body>
    </html>
  );
}