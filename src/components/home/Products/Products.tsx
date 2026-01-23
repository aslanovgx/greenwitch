"use client";

import { useMemo, useState, useCallback } from "react";
import productStyles from "./Products.module.css";
import cardStyles from "@/components/common/ProductCard.module.css";
import type { Product as UIProduct, RawProduct } from "@/types/Product";
import ProductCard from "@/components/common/ProductCard";
import MoreButton from "@/components/ui/MoreButton";
import Link from "next/link";
import { buildImageUrl } from "@/utils/images";

type Props = {
  initialAll?: RawProduct[];
  initialNew?: RawProduct[];
  initialDiscount?: RawProduct[];
};



export default function Products({
  initialAll = [],
  initialNew = [],
  initialDiscount = [],
}: Props) {

    const [activeCardId, setActiveCardId] = useState<number | null>(null);
    const [activeCategory, setActiveCategory] = useState<"all" | "new" | "discount">("all");
    const [visibleCount] = useState<number>(5);

    const adapt = useCallback((p: RawProduct): UIProduct => {
        const thumbs = (p as { thumbnails?: unknown[] }).thumbnails;
        const rawImages = Array.isArray(p.images)
            ? p.images
            : (Array.isArray(thumbs) ? (thumbs as unknown[]) : []);

        const images = rawImages
            .filter((x): x is string => typeof x === "string" && x.trim() !== "")
            .map(buildImageUrl);

        const { title, desc } = p as { title?: string; desc?: string };

        return {
            id: p.id,
            name: p.name ?? title ?? "",
            description: p.description ?? desc ?? "",
            bestSeller: !!p.bestSeller,
            isNew: !!p.isNew,
            price: Number(p.price ?? 0),
            discountPrice: p.discountPrice ?? null,
            brandName: p.brandName ?? "",
            images,
        };
    }, []);

    const selectedRaw = useMemo(() => {
  if (activeCategory === "new") return initialNew;
  if (activeCategory === "discount") return initialDiscount;
  return initialAll;
}, [activeCategory, initialAll, initialNew, initialDiscount]);

const products = useMemo(() => selectedRaw.map(adapt), [selectedRaw, adapt]);


    const visible = useMemo(() => products.slice(0, visibleCount), [products, visibleCount]);


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
                        // activeCardId={activeCardId}
                        // setActiveCardId={setActiveCardId}
                    />
                ))}
            </div>

            {products.length > visibleCount && (
                <Link href="/products" scroll={true}>
                    <MoreButton>Daha çox</MoreButton>
                </Link>
            )}
        </>
    );
}