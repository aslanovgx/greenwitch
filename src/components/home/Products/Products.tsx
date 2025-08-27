"use client";

import { useMemo, useState, useCallback } from "react";
import productStyles from "./Products.module.css";
import cardStyles from "@/components/common/ProductCard.module.css";
import type { Product as UIProduct } from "@/types/Product";
import ProductCard from "@/components/common/ProductCard";
import MoreButton from "@/components/ui/MoreButton";
import Link from "next/link";
// import { getProducts } from "@/lib/api/products";

// Relative image pathları (images/products/...) tam URL-ə çevir
const buildImageUrl = (rel: string) => {
    const API = (process.env.NEXT_PUBLIC_API_URL ?? "").trim();
    const ROOT = API.replace(/\/api\/?$/i, "");
    const clean = String(rel ?? "").replace(/^\/+/, "");
    return `${ROOT}/${encodeURI(clean)}`;
};

type APIProduct = {
  id: number;
  name?: string;
  description?: string;
  images?: string[];
  thumbnails?: string[];
  bestSeller?: boolean;
  isNew?: boolean;
  price?: number;
  discountPrice?: number | null;
  brandName?: string;
};

type Props = { initialProducts?: APIProduct[] };

export default function Products({ initialProducts = [] }: Props) {
    const [activeCardId, setActiveCardId] = useState<number | null>(null);
    const [activeCategory, setActiveCategory] = useState<"all" | "new" | "discount">("all");
    const [visibleCount, setVisibleCount] = useState<number>(5);

    const adapt = useCallback((p: any): UIProduct => {
        const rawImages = Array.isArray(p.images) ? p.images : (Array.isArray(p.thumbnails) ? p.thumbnails : []);
        const images = rawImages.filter((x: string) => typeof x === "string" && x.trim() !== "").map(buildImageUrl);
        return {
            id: p.id,
            name: p.name ?? p.title ?? "",
            description: p.description ?? p.desc ?? "",
            bestSeller: !!p.bestSeller,
            isNew: !!p.isNew,
            price: Number(p.price ?? 0),
            discountPrice: p.discountPrice ?? null,
            brandName: p.brandName ?? "",
            images,
        } as UIProduct;
    }, []);

    const products = useMemo(() => initialProducts.map(adapt), [initialProducts, adapt]);

    const filteredProducts = useMemo(() => {
        if (activeCategory === "new") return products.filter((p) => p.isNew);
        if (activeCategory === "discount") return products.filter((p) => p.discountPrice != null && p.discountPrice < p.price);
        return products;
    }, [products, activeCategory]);

    const visible = useMemo(() => filteredProducts.slice(0, visibleCount), [filteredProducts, visibleCount]);

    return (
        <>
            <div className={productStyles.row_1}>
                <ul className="flex justify-center items-center gap-6">
                    <li onClick={() => setActiveCategory("new")} className={`cursor-pointer ${activeCategory === "new" ? "opacity-100" : "opacity-30"}`}>Yeni Gələnlər</li>
                    <li onClick={() => setActiveCategory("all")} className={`cursor-pointer ${activeCategory === "all" ? "opacity-100" : "opacity-30"}`}>Məhsullar</li>
                    <li onClick={() => setActiveCategory("discount")} className={`cursor-pointer ${activeCategory === "discount" ? "opacity-100" : "opacity-30"}`}>Endirimdə olanlar</li>
                </ul>
            </div>

            <div className={`${productStyles.row_2} flex justify-center items-center`}>
                <p>İlk siz kəşf edin – ən son saat trendləri bu bölmədə</p>
            </div>

            {/* Heç bir “Yüklənir…” yoxdur — ilk renderdə data hazır gəlir */}
            <div className={`${cardStyles.cards_container} flex justify-center items-center`}>
                {visible.map((item) => (
                    <ProductCard
                        key={item.id}
                        item={item}
                        activeCategory={activeCategory}
                        activeCardId={activeCardId}
                        setActiveCardId={setActiveCardId}
                    />
                ))}
            </div>

            {filteredProducts.length > visibleCount && (
                <Link href="/products" scroll={true}>
                    <MoreButton>Daha çox</MoreButton>
                </Link>
            )}
        </>
    );
}