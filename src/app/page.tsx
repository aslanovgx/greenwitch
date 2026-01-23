// src/app/page.tsx
export const revalidate = 60;

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

const isProd =
  process.env.VERCEL_ENV === "production" &&
  /^https?:\/\/(?!.*\.vercel\.app)(?!.*localhost)/i.test(
    process.env.NEXT_PUBLIC_BASE_URL || ""
  );

export const metadata: Metadata = {
  title: "SaatAZ – Orijinal Brend Saatların Ünvanı",
  description:
    "SaatAZ – Azərbaycanda orijinal kişi, qadın və uşaq saatlarının rəsmi satış ünvanı. Premium keyfiyyət, zəmanət və sərfəli qiymətlər. Brend saatlar burada!",
  // ✅ Home üçün canonical yol kimi verilir
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    title: "SaatAZ – Orijinal Brend Saatların Ünvanı",
    description:
      "Orijinal kişi, qadın və uşaq saat modelləri. Premium keyfiyyət və sərfəli qiymət.",
    // ✅ metadataBase (layout.tsx) sayəsində nisbi yol işləyir
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "SaatAZ" }],
    siteName: "SaatAZ",
    locale: "az_AZ",
  },
  twitter: {
    card: "summary_large_image",
    title: "SaatAZ – Orijinal Brend Saatların Ünvanı",
    description:
      "Azərbaycanda premium brend saatlar. Rəsmi zəmanət və sərfəli qiymətlər.",
    images: ["/og-image.jpg"],
  },
  // ✅ yalnız prod-da index/follow
  robots: { index: isProd, follow: isProd },
};

export default async function Home() {
  const allProducts: Product[] = await getProducts();
  const allSections = await getInfoSections();

  const toBool = (v: unknown): boolean => {
    if (typeof v === "boolean") return v;
    if (typeof v === "number") return v === 1;
    if (typeof v === "string") return v.toLowerCase() === "true";
    return false;
  };

  const initialBestSellers = await getProducts({
    bestSeller: true,
    size: 5, // əgər backend dəstəkləyirsə
  });

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
