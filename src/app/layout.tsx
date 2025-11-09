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
import Script from "next/script";
import { RightClickBlocker } from "./RightClickBlocker";

const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

// Production check
const isProd =
  process.env.VERCEL_ENV === "production" &&
  /^https?:\/\/(?!.*\.vercel\.app)(?!.*localhost)/i.test(SITE_URL);

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "SaatAZ | Qol Saatları, Brend Watches",
    template: "%s | SaatAZ",
  },
  description:
    "SaatAZ – Azərbaycanda orijinal qol saatlarının rəsmi satış ünvanı. Premium keyfiyyət, zəmanət və sərfəli qiymətlər. | SaatAZ – Official destination for brand watches in Azerbaijan. Premium quality, warranty, and best prices.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/favicon.png", type: "image/png" },
    ],
  },
  openGraph: {
    title: "SaatAZ | Qol Saatları, Brend Watches",
    description:
      "SaatAZ – Azərbaycanda orijinal qol saatlarının rəsmi satış ünvanı. Premium keyfiyyət, zəmanət və sərfəli qiymətlər.",
    type: "website",
    locale: "az_AZ",
    images: [
      {
        url: `${SITE_URL}/api/og-screenshot?path=/&v=1`, // cache-buster
        width: 1200,
        height: 630,
        alt: "SaatAZ",
      },
    ],
    siteName: "SaatAZ",
  },
  twitter: {
    card: "summary_large_image",
    title: "SaatAZ | Qol Saatları, Brend Watches",
    description:
      "Orijinal qol saatları. Rəsmi zəmanət və sərfəli qiymətlər.",
    images: [`${SITE_URL}/api/og-screenshot?path=/&v=1`],
  },
  robots: { index: isProd, follow: isProd },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="az">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

        {/* ✅ Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                name: "SaatAZ",
                url: SITE_URL,
                logo: `${SITE_URL}/logo.png`, // daha dəqiq loqo faylı
                image: `${SITE_URL}/api/og-screenshot?path=/&v=1`,
                description:
                  "SaatAZ – Azərbaycanda orijinal qol saatlarının rəsmi satış ünvanı.",
                sameAs: [
                  "https://www.instagram.com/saat_az",
                  // "https://www.facebook.com/saat.az",
                  // "https://www.linkedin.com/company/saat-az",
                ],
              },
              null,
              2
            ),
          }}
        />

        {/* ✅ WebSite Schema + SearchAction */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: "SaatAZ",
                url: SITE_URL,
                inLanguage: "az-AZ",
                potentialAction: {
                  "@type": "SearchAction",
                  target: `${SITE_URL}/search?q={search_term_string}`, // lazım gəlsə /products?search= ilə dəyiş
                  "query-input": "required name=search_term_string",
                },
              },
              null,
              2
            ),
          }}
        />
        {isProd && GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GA_ID}');
      `}
            </Script>
          </>
        )}
      </head>
      <body
        className={`${montserrat.variable} ${lato.variable} antialiased min-h-screen flex flex-col`}
      >
        <RightClickBlocker />
        <ConsoleFilters />
        <SearchProvider>
          <FavoriteProvider>
            <BagProvider>
              <Suspense
                fallback={
                  <div className="h-16 md:h-20" aria-hidden="true" />
                }
              >
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
