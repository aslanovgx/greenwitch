"use client";

import { useEffect, useState } from "react";
import { Product } from "@/types/Product";
import ProductCard from "@/components/common/ProductCard";
import MoreButton from "@/components/ui/MoreButton";
import { fetcher } from "@/lib/helpers/fetcher";
import styles from "./FilterCards.module.css";
import cardStyles from "@/components/common/ProductCard.module.css";

type Filters = {
  genderId?: number;
  brandId?: number;
  colorId?: number;
  shapeId?: number;
  sort?: string;
};

type Props = {
  filters: Filters;
};

export default function FilterCards({ filters }: Props) {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [activeCardId, setActiveCardId] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(5);

  useEffect(() => {
    async function fetchData() {
      try {
        // ✅ Query string düzəltmək
        const queryParams = new URLSearchParams();

        if (filters.genderId) queryParams.append("genderId", filters.genderId.toString());
        if (filters.brandId) queryParams.append("brandId", filters.brandId.toString());
        // if (filters.colorId) queryParams.append("colorId", filters.colorId.toString()); // ✅ düzəldi
        if (filters.shapeId) queryParams.append("shapeId", filters.shapeId.toString());
        if (filters.sort) queryParams.append("sort", filters.sort);

        const query = queryParams.toString();

        const data = await fetcher<{ products: Product[] }>(
          `/Product/GetProductsByFilter${query ? "?" + query : ""}`
        );

        // ✅ Yalnız bir dəfə yoxlama
        const hasFilters = filters.genderId || filters.brandId || filters.colorId || filters.shapeId;

        setProducts(
          hasFilters ? data.products || [] : data.products?.slice(0, 5) || []
        );



        setError(null);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      }
    }
    fetchData();
  }, [filters]);

  const visibleProducts = products.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 5, products.length));
  };

  if (error) {
    return <div style={{ color: "red" }}>Error: {error}</div>;
  }

  if (products.length === 0) {
    return <p>No products found</p>;
  }

  return (
    <div className={styles.filterCards}>
      <div
        className={`${cardStyles.cards_container} ${styles.cards_box} flex justify-center items-center`}
      >
        {visibleProducts.map((item: Product) => (
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
