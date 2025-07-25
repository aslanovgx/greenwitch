"use client";
import { useState, useEffect } from "react";
import styles from "@/components/home/MostSales/MostSales.module.css";
import SectionTitle from "@/components/common/SectionTitle";
import { Product } from "@/types/Product";
import ProductCard from "@/components/common/ProductCard";
import MoreButton from "@/components/ui/MoreButton";

export default function SimilarProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeCardId, setActiveCardId] = useState<number | null>(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Product/GetAllProductsWith`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched data:", data);

        const productList = Array.isArray(data.products)
          ? data.products.map((p: any) => {
              const rawImage = p.images?.[0];
              const rawHover = p.images?.[1];

              const image = rawImage
                ? `${process.env.NEXT_PUBLIC_API_URL}/${rawImage}`
                : "/fallback.jpg";

              const hoverImage = rawHover
                ? `${process.env.NEXT_PUBLIC_API_URL}/${rawHover}`
                : undefined;

              return {
                ...p,
                image,
                hoverImage,
                coupon: p.discountPrice
                  ? 100 - Math.floor((p.discountPrice / p.price) * 100)
                  : 0,
                title: p.name,
                desc: p.description,
                originalPrice: p.price,
                price: p.discountPrice || p.price,
              };
            })
          : [];

        setProducts(productList);
      })
      .catch(console.error);
  }, []);

  return (
    <div className={styles.brands}>
      <SectionTitle>Oxşar Məhsullar</SectionTitle>
      <div className={`${styles.cards_container} flex justify-center items-center`}>
        {products.map((item: Product) => (
          <ProductCard
            key={item.id}
            item={item}
            isMostSales={true}
            activeCardId={activeCardId}
            setActiveCardId={setActiveCardId}
          />
        ))}
      </div>
      <MoreButton>Daha çox</MoreButton>
    </div>
  );
}