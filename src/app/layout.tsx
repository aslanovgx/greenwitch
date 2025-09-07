// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { montserrat, lato } from "./../fonts";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { FavoriteProvider } from "@/context/FavoritesContext";
import { SearchProvider } from "@/context/SearchContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BagProvider } from "@/context/BagContext";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "@/components/common/ScrollToTop";
import { Suspense } from "react"; // ✅ əlavə et

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const robots = { index: false, follow: false };

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Greenwitch | Sustainable Lifestyle",
  description: "Discover eco-friendly products with Greenwitch.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/favicon.png", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Greenwitch",
    description: "Discover eco-friendly products with Greenwitch.",
    type: "website",
    locale: "en_US",
    url: "/",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Greenwitch" }],
  },
  alternates: { canonical: "/" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="az">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </head>
      <body className={`${montserrat.variable} ${lato.variable} antialiased`}>
        <SearchProvider>
          <FavoriteProvider>
            <BagProvider>
              {/* ✅ useSearchParams istifadə edən Navbar üçün Suspense */}
              <Suspense fallback={null}>
                <Navbar />
              </Suspense>

              <main>{children}</main>
              <ScrollToTop />
              <Footer />

              <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                closeOnClick
                pauseOnHover
                draggable
                theme="light"
              />
              <Toaster position="top-center" reverseOrder={false} />
            </BagProvider>
          </FavoriteProvider>
        </SearchProvider>
      </body>
    </html>
  );
}
