"use client";

import { useState } from 'react';
import styles from './FilterCards.module.css';
// import Image from "next/image";
import cardStyles from '@/components/common/ProductCard.module.css';
import ProductCard from '@/components/common/ProductCard';
import mehsullar from '@/components/Mock/Home/mehsullar.json';
import { Product } from '@/types/Product';
import MoreButton from '@/components/ui/MoreButton';

export default function FilterCards() {
    const [activeCardId, setActiveCardId] = useState<number | null>(null);
    const [visibleCount, setVisibleCount] = useState<number>(5);

    const visibleProducts = mehsullar.slice(0, visibleCount);

    const handleLoadMore = () => {
        setVisibleCount(prev => prev + 5);
    };
    return (
        <>
            <div className={`${styles.filterCards}`}>
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
                {visibleCount < mehsullar.length && (
                    <MoreButton onClick={handleLoadMore}>Daha çox</MoreButton>
                )}

            </div>
        </>
    );
}