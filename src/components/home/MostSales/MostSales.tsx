"use client";
import { useMemo, useCallback, useState } from "react";
import styles from "./MostSales.module.css";
import SectionTitle from "@/components/common/SectionTitle";
import ProductCard from "@/components/common/ProductCard";
import type { Product as UIProduct } from "@/types/Product";

type APIProduct = {
  id: number;
  name?: string;
  description?: string;
  images?: string[];
  thumbnails?: string[];
  bestSeller?: boolean | string | number;
  isNew?: boolean | string | number;
  price?: number;
  discountPrice?: number | null;
  brandName?: string;
};

type Props = { initialProducts?: APIProduct[] };

const buildImageUrl = (rel: string) => {
  const API = (process.env.NEXT_PUBLIC_API_URL ?? "").trim();
  const ROOT = API.replace(/\/api\/?$/i, "");
  const clean = String(rel ?? "").replace(/^\/+/, "");
  return `${ROOT}/${encodeURI(clean)}`;
};

export default function MostSales({ initialProducts = [] }: Props) {
  const [activeCardId, setActiveCardId] = useState<number | null>(null);

  const adapt = useCallback((p: APIProduct): UIProduct => {
    const raws = Array.isArray(p.images) ? p.images : (Array.isArray(p.thumbnails) ? p.thumbnails : []);
    const images = raws.filter((x) => typeof x === "string" && x.trim() !== "").map(buildImageUrl);
    return {
      id: p.id,
      name: p.name ?? "",
      description: p.description ?? "",
      bestSeller: !!p.bestSeller,
      isNew: !!p.isNew,
      price: Number(p.price ?? 0),
      discountPrice: p.discountPrice ?? null,
      brandName: p.brandName ?? "",
      images,
    };
  }, []);

  const products = useMemo(() => initialProducts.map(adapt), [initialProducts, adapt]);

  return (
    <div className={styles.brands}>
      <SectionTitle>Ən Çox Satılanlar</SectionTitle>

      <div className={`${styles.cards_container} flex flex-wrap gap-4 justify-center items-stretch`}>
        {products.map((item) => (
          <ProductCard
            key={item.id}
            item={item}
            isMostSales
            forceBestBadge   // <-- MostSales üçün “BEST” prioritet
            activeCategory="all"
            activeCardId={activeCardId}
            setActiveCardId={setActiveCardId}
          />
        ))}
      </div>
    </div>
  );
}