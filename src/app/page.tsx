// src/app/page.tsx
export const revalidate = 60; // ✅ ISR: 60 saniyədən bir yenilə

import type { Metadata } from "next";
import Banner from "@/components/home/Banner/Banner";
import Products from "@/components/home/Products/Products";
import Olivia from "@/components/home/Olivia/Olivia";
import Brands from "@/components/home/Brands/Brands";
import MostSales from "@/components/home/MostSales/MostSales";
import SpecialOffer from "@/components/home/SpecialOffer/SpecialOffer";
import IconInfo from "@/components/home/IconInfo/IconInfo";
import ImageGrid from "@/components/home/ImageGrid/ImageGrid";
import Contact from "@/components/home/Contact/Contact";

import { getProducts } from "@/lib/api/products";
import { getInfoSections } from "@/lib/api/infoSections";
import type { Product } from "@/types/Product";

const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  title: "SaatAZ – Orijinal Brend Saatların Ünvanı",
  description:
    "SaatAZ – Azərbaycanda orijinal kişi, qadın və uşaq saatlarının rəsmi satış ünvanı. Premium keyfiyyət, zəmanət və sərfəli qiymətlər. Brend saatlar burada!",
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "SaatAZ – Orijinal Brend Saatların Ünvanı",
    description:
      "Orijinal kişi, qadın və uşaq saat modelləri. Premium keyfiyyət və sərfəli qiymət.",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "SaatAZ" }],
    siteName: "SaatAZ",
    locale: "az_AZ",
  },
  twitter: {
    card: "summary_large_image",
    title: "SaatAZ – Orijinal Brend Saatların Ünvanı",
    description:
      "Azərbaycanda premium brend saatlar. Rəsmi zəmanət və sərfəli qiymətlər.",
    images: [`${SITE_URL}/og-image.jpg`],
  },
  robots: { index: true, follow: true },
};

export default async function Home() {
  // SSR: məhsullar
  const allProducts: Product[] = await getProducts();

  // SSR: banner üçün info sections
  const allSections = await getInfoSections();

  const toBool = (v: unknown): boolean => {
    if (typeof v === "boolean") return v;
    if (typeof v === "number") return v === 1;
    if (typeof v === "string") return v.toLowerCase() === "true";
    return false;
  };

  const initialBestSellers: Product[] = (allProducts ?? [])
    .filter((p) => toBool(p.bestSeller as unknown))
    .slice(0, 5);

  return (
    <>
      <section>
        <Banner initialSections={allSections} />
      </section>

      <section>
        <Products initialProducts={allProducts} />
      </section>

      <section><Olivia /></section>
      <section><Brands /></section>

      <section>
        <MostSales initialProducts={initialBestSellers} />
      </section>

      <section><SpecialOffer /></section>
      <section><IconInfo /></section>
      <section><ImageGrid /></section>
      <section><Contact /></section>
    </>
  );
}
