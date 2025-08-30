// src/app/page.tsx
// ❌ Bunu çıxart: export const dynamic = "force-dynamic";
export const revalidate = 60; // ✅ ISR: 60 saniyədən bir yenilə

import Banner from "@/components/home/Banner/Banner";
import Products from "@/components/home/Products/Products";
import Olivia from "@/components/home/Olivia/Olivia";
import Brands from "@/components/home/Brands/Brands";
import MostSales from "@/components/home/MostSales/MostSales";
import SpecialOffer from "@/components/home/SpecialOffer/SpecialOffer";
import IconInfo from "@/components/home/IconInfo/IconInfo";
import ImageGrid from "@/components/home/ImageGrid/ImageGrid";
import Contact from "@/components/home/Contact/Contact";

import { getProductsServer } from "@/lib/api/products-server";
import { getInfoSections } from "@/lib/api/infoSections";
import type { Product } from "@/types/Product";

export default async function Home() {
  // SSR: məhsullar
  const allProducts: Product[] = await getProductsServer();

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
