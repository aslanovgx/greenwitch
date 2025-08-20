"use client";
import { useState } from 'react';
import styles from '@/components/home/MostSales/MostSales.module.css';
import SectionTitle from '@/components/common/SectionTitle';
import mehsullar from '@/components/Mock/Home/mehsullar.json';
import { Product } from '@/types/Product';
import ProductCard from '@/components/common/ProductCard';
import MoreButton from '@/components/ui/MoreButton';

export default function SimilarProducts() {
    // const [products, setProducts] = useState<Product[]>([]);

    // useEffect(() => {
    //     fetch('https://fakestoreapi.com/products')
    //         .then(res => res.json())
    //         .then(data => setProducts(data))
    //         .catch(console.error);
    // }, []);
    const [activeCardId, setActiveCardId] = useState<number | null>(null);

    return (
        <>
            <div className={`${styles.brands}`}>
                <SectionTitle>Oxşar Məhsullar</SectionTitle>
                <div className={`${styles.cards_container} flex justify-center items-center`}>
                    {mehsullar.slice(0,5).map((item: Product) => (
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
        </>
    );
}