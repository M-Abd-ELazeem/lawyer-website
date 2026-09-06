import "./globals.css";
import { Tajawal } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
  variable: "--font-tajawal",
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${tajawal.variable} ${tajawal.className}`}>
      <body className="min-h-full flex flex-col bg-dark">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
