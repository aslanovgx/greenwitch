// src/components/home/MostSales/SimilarProducts.tsx
"use client";

import { useMemo, useCallback, useState } from "react";
import styles from "@/components/home/MostSales/MostSales.module.css";
import SectionTitle from "@/components/common/SectionTitle";
import ProductCard from "@/components/common/ProductCard";
import type { Product, RawProduct } from "@/types/Product";
import MoreButton from "@/components/ui/MoreButton";
import Link from "next/link";

const buildImageUrl = (rel: string) => {
  const API = (process.env.NEXT_PUBLIC_API_URL ?? "").trim();
  const ROOT = API.replace(/\/api\/?$/i, "");
  const clean = String(rel ?? "").replace(/^\/+/, "");
  return `${ROOT}/${encodeURI(clean)}`;
};

type Props = {
  initialProducts?: RawProduct[];
  /** Səhifədəki əsas məhsulun brend id-si (detail gəlmirsə, listdən/brand-lardan götürüb ötürürük) */
  brandId?: number;
};

export default function SimilarProducts({ initialProducts = [], brandId }: Props) {
  const [activeCardId, setActiveCardId] = useState<number | null>(null);

  const adapt = useCallback((p: RawProduct): Product => {
  // 1) images yoxdursa thumbnails-dan istifadə et
  const thumbs = (p as { thumbnails?: unknown[] }).thumbnails;
  const rawImages = Array.isArray(p.images)
    ? p.images
    : (Array.isArray(thumbs) ? (thumbs as unknown[]) : []);

  const images = rawImages
    .filter((x): x is string => typeof x === "string" && x.trim() !== "")
    .map(buildImageUrl);

  // 2) rəqəmləri normalizə et
  const toNum = (v: unknown) => (Number.isFinite(Number(v)) ? Number(v) : 0);

  // 3) ad/descr fallback (Products.tsx ilə eyni)
  const { title, desc } = p as { title?: string; desc?: string };

  return {
    id: Number(p.id),
    name: (p.name ?? title ?? "").trim(),
    description: (p.description ?? desc ?? "").trim(),
    bestSeller: !!p.bestSeller,
    isNew: !!p.isNew,
    price: toNum(p.price),
    discountPrice: p.discountPrice == null ? null : toNum(p.discountPrice),
    brandName: p.brandName ?? "",
    images,
    // optional sahələr UI type-də opsional olduğuna görə verməyə ehtiyac yoxdur
    // brandId-ə toxunmuruq
  };
}, []);


  const products = useMemo(() => initialProducts.map(adapt), [initialProducts, adapt]);

  const MAX = 5;
  const visible = products.slice(0, MAX);

  const hasValidBrand = Number.isFinite(Number(brandId)) && Number(brandId) > 0;
  const canShowMore = hasValidBrand && products.length >= MAX;

  const href = hasValidBrand
    ? { pathname: "/products", query: { brandId: String(brandId), page: "1" } }
    : null;

  return (
    <div className={styles.brands}>
      <SectionTitle>Oxşar Məhsullar</SectionTitle>

      <div className={`${styles.cards_container} flex flex-wrap gap-4 justify-center items-stretch`}>
        {visible.map((item) => (
          <ProductCard
            key={item.id}
            item={item}
            activeCategory="all"
            activeCardId={activeCardId}
            setActiveCardId={setActiveCardId}
          />
        ))}
      </div>

      {canShowMore && href && (
        <div className="mt-6 flex justify-center">
          <Link href={href} scroll>
            <MoreButton>Daha çox</MoreButton>
          </Link>
        </div>
      )}
    </div>
  );
}
