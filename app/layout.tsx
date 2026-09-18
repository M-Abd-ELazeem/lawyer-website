import "./globals.css";
import type { Metadata } from "next";
import { Tajawal } from "next/font/google";
import { Navbar } from "@/widgets/navbar";
import { Footer } from "@/widgets/footer";
import { siteConfig } from "@/entities/office";

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
  variable: "--font-tajawal",
});

export const metadata: Metadata = {
  verification: {
    google: "BcLq8PEAdgx9hCW-lCqMahc-APceLwbcT3t85VQvcAc",
  },

  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.title}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "المستشار محمود حسن",
    "محمود حسن مستشار قانوني",
    "مستشار قانوني في أبوظبي",
    "مكتب محاماة أبوظبي",
    "استشارات قانونية الإمارات",
  ],
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.legalName,
    title: `${siteConfig.name} — ${siteConfig.title}`,
    description: siteConfig.description,
    url: siteConfig.url,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${tajawal.variable} ${tajawal.className}`}>
      <body className="min-h-full flex flex-col w-full overflow-x-hidden bg-dark-section">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
