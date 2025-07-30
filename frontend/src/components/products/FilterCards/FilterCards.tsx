"use client";

import { useEffect, useState } from "react";
import { Product } from "@/types/Product";

import ProductCard from "@/components/common/ProductCard";
import MoreButton from "@/components/ui/MoreButton";

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
        // Burada filters əsasında backend API çağırışı optimallaşdırıla bilər
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Product`);
        if (!res.ok) {
          throw new Error(`API error: ${res.status}`);
        }
        const data = await res.json();
        setProducts(data.products || []);
        setError(null);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      }
    }
    fetchData();
  }, [filters]); // filters dəyişdikcə yenidən çağırır

  const visibleProducts = products.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 5, products.length));
  };

  if (error) {
    return <div style={{ color: "red" }}>Error: {error}</div>;
  }

  if (products.length === 0) {
    return <p>Loading products...</p>;
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