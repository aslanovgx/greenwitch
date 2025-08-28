// src/app/page.tsx
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
import type { Product } from "@/types/Product";

export default async function Home() {
  // 1) Məhsulları serverdə çək
  const allProducts: Product[] = await getProductsServer();

  // 2) bestSeller-i etibarlı boolean-a çevirən helper
  const toBool = (v: unknown): boolean => {
    if (typeof v === "boolean") return v;
    if (typeof v === "number") return v === 1;
    if (typeof v === "string") return v.toLowerCase() === "true";
    return false;
  };

  // 3) İlk 5 best seller
  const initialBestSellers: Product[] = (allProducts ?? [])
    .filter((p) => toBool(p.bestSeller as unknown))
    .slice(0, 5);

  return (
    <>
      <section><Banner /></section>

      <section>
        {/* Home Products grid-inə bütün məhsulları ötürürük */}
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
