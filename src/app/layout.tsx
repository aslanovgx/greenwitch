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
import { Suspense } from "react";
import ConsoleFilters from "@/components/dev/ConsoleFilters";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
// Prod müəyyənləşdirmə: Vercel mühiti + real domen
const isProd =
  process.env.VERCEL_ENV === "production" &&
  /^https?:\/\/(?!.*\.vercel\.app)(?!.*localhost)/i.test(SITE_URL);

export const metadata: Metadata = {
  // Bu baza sayəsində OG URL, canonical və s. səhifə səviyyəsində nisbidir
  metadataBase: new URL(SITE_URL),

  title: {
    default: "SaatAZ | Saat Dünyası, Brand Watches",
    template: "%s | SaatAZ",
  },
  description:
    "SaatAZ – Azərbaycanda orijinal brend saatların rəsmi satış ünvanı. Premium keyfiyyət, zəmanət və sərfəli qiymətlər. | SaatAZ – Official destination for brand watches in Azerbaijan. Premium quality, warranty, and best prices.",

  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/favicon.png", type: "image/png" },
    ],
  },

  openGraph: {
    // OG üçün url vermirik ki, hər səhifə öz yolu ilə generasiya olunsun (metadataBase əsasında)
    title: "SaatAZ | Saat Dünyası, Brand Watches",
    description:
      "SaatAZ – Azərbaycanda orijinal brend saatların rəsmi satış ünvanı. Premium keyfiyyət, zəmanət və sərfəli qiymətlər. | SaatAZ – Official destination for brand watches in Azerbaijan. Premium quality, warranty, and best prices.",
    type: "website",
    locale: "az_AZ",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "SaatAZ" }],
    siteName: "SaatAZ",
  },

  twitter: {
    card: "summary_large_image",
    title: "SaatAZ | Saat Dünyası, Brand Watches",
    description: "Orijinal brend saatlar. Rəsmi zəmanət və sərfəli qiymətlər.",
    images: ["/og-image.jpg"],
  },

  // **VACİB:** Canonical-ı layout-da vermirik ki, hər səhifə öz canonical-ını qoya bilsin
  // alternates: { canonical: SITE_URL },

  robots: { index: isProd, follow: isProd },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="az">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </head>
      <body className={`${montserrat.variable} ${lato.variable} antialiased min-h-screen flex flex-col`}>
        <ConsoleFilters />

        <SearchProvider>
          <FavoriteProvider>
            <BagProvider>
              <Suspense fallback={<div className="h-16 md:h-20" aria-hidden="true" />}>
                <Navbar />
              </Suspense>

              <main className="flex-1">{children}</main>

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

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
