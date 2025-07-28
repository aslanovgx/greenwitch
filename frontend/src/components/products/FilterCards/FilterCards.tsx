"use client";

import { useEffect, useState } from "react";
import styles from "./FilterCards.module.css";
import cardStyles from "@/components/common/ProductCard.module.css";
import ProductCard from "@/components/common/ProductCard";
import { Product } from "@/types/Product";
import MoreButton from "@/components/ui/MoreButton";

type Filters = {
  cins?: string;
  brendler?: string;
  reng?: string;
  forma?: string;
  sirala?: string;
};

type Props = {
  filters: Filters;
};

export default function FilterCards({ filters }: Props) {
  const [products, setProducts] = useState<Product[]>([]);
  const [visibleCount, setVisibleCount] = useState<number>(5);
  const [activeCardId, setActiveCardId] = useState<number | null>(null);

  useEffect(() => {
    const query = new URLSearchParams();

    if (filters.cins) query.append("gender", filters.cins);
    if (filters.brendler) query.append("brand", filters.brendler);
    if (filters.reng) query.append("color", filters.reng);
    if (filters.forma) query.append("shape", filters.forma);
    if (filters.sirala) query.append("sort", filters.sirala); // Backend bunu başa düşməlidir

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Product/GetAllProductsWith?${query.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        const productList = data.products.map((p: any) => ({
          ...p,
          image: `${process.env.NEXT_PUBLIC_API_URL}/${p.images?.[0] ?? "fallback.jpg"}`,
          hoverImage: p.images?.[1] ? `${process.env.NEXT_PUBLIC_API_URL}/${p.images[1]}` : undefined,
          title: p.name,
          desc: p.description,
          originalPrice: p.price,
          price: p.discountPrice || p.price,
          coupon: p.discountPrice ? 100 - Math.floor((p.discountPrice / p.price) * 100) : 0,
        }));

        setProducts(productList);
      });
  }, [filters]);

  const visibleProducts = products.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 5);
  };

  return (
    <div className={styles.filterCards}>
      <div className={`${cardStyles.cards_container} ${styles.cards_box} flex justify-center items-center`}>
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
