import type { Metadata } from "next";
import "./globals.css";
import { Montserrat } from 'next/font/google';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";


const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['400', '700'], // Lazım olan weight-ləri əlavə edə bilərsən
});

export const metadata: Metadata = {
  title: "greenwitch",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} antialiased`}
      >
        <Navbar />
        <main className="container mx-auto max-w-[1440px]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
