"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import styles from "./FilterCards.module.css";
import cardStyles from "@/components/common/ProductCard.module.css";
import ProductCard from "@/components/common/ProductCard";
import MoreButton from "@/components/ui/MoreButton";
import type { Product as UIProduct } from "@/types/Product";
import { getProducts } from "@/lib/api/products";
import type { RawProduct } from "@/types/Product";

// Relative image pathları (images/products/...) tam URL-ə çevir
function buildImageUrl(rel: string) {
  const API = (process.env.NEXT_PUBLIC_API_URL ?? "").trim();
  const ROOT = API.replace(/\/api\/?$/i, ""); // .../api -> ...
  const clean = (rel ?? "").replace(/^\/+/, ""); // başdakı /-ları sil
  return `${ROOT}/${clean}`;
}

const toInt = (v: string | null) => {
  const n = Number(v);
  return Number.isFinite(n) && n > 0 ? n : undefined;
};

export default function FilterCards() {
  const sp = useSearchParams();

  // URL-dən filter id-ləri
  const brandId = toInt(sp.get("brandId"));
  const genderId = toInt(sp.get("genderId"));
  const shapeId = toInt(sp.get("shapeId"));
  const colorId = toInt(sp.get("colorId")); // single-select; BE-də array lazımdırsa colorIds=[id]

  const [activeCardId, setActiveCardId] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(5);
  const [products, setProducts] = useState<UIProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // API məhsulunu UI tipinə uyğunlaşdır
  const adapt = (p: RawProduct): UIProduct => {
    const rawImgs = Array.isArray(p.images) ? p.images : [];
    const images = rawImgs
      .filter((x): x is string => typeof x === "string" && x.trim() !== "")
      .map(buildImageUrl);

    return {
      id: p.id,
      name: p.name,
      description: p.description ?? "",
      bestSeller: !!p.bestSeller,
      isNew: !!p.isNew,
      price: p.price,
      discountPrice: p.discountPrice ?? null,
      brandName: p.brandName ?? "",
      images,
    };
  };


  // Filtr dəyişdikcə datanı çək
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(null);

        type GetProductsArg = Parameters<typeof getProducts>[0];

        const params: GetProductsArg = {
          ...(brandId ? { brandId } : {}),
          ...(genderId ? { genderId } : {}),
          ...(shapeId ? { shapeId } : {}),
          ...(colorId ? { colorId } : {}),
        };

        const list = await getProducts(params);

        setProducts(list.map(adapt));
        setVisibleCount(5); // hər yeni filtrdə “load more” reset
      } catch (e: unknown) {
        console.error(e);
        setError("Məhsulları yükləmək mümkün olmadı.");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    })();
  }, [brandId, genderId, shapeId, colorId]);

  const visibleProducts = useMemo(
    () => products.slice(0, visibleCount),
    [products, visibleCount]
  );

  const handleLoadMore = () => setVisibleCount((prev) => prev + 5);



  if (loading) return <div className="py-10 text-center">Yüklənir...</div>;
  if (error) return <div className="py-10 text-center text-red-600">{error}</div>;
  if (products.length === 0) return <div className="py-10 text-center">Məhsul tapılmadı.</div>;



  return (
    <div className={styles.filterCards}>
      <div className={`${cardStyles.cards_container} ${styles.cards_box} flex justify-center items-center`}>
        {visibleProducts.map((item) => (
          <ProductCard
            key={item.id}
            item={item}
            activeCardId={activeCardId}
            setActiveCardId={setActiveCardId}
          />
        ))}
      </div>

      {visibleCount < products.length && (
        <MoreButton onClick={handleLoadMore}>Daha çox</MoreButton>
      )}
    </div>
  );
}
