"use client";
import { useEffect, useState } from 'react';
import styles from './MostSales.module.css';
import SectionTitle from '@/components/common/SectionTitle';
import mehsullar from '@/components/Mock/Home/mehsullar.json';
import { Product } from '@/types/Product';
import ProductCard from '@/components/common/ProductCard';

export default function MostSales() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(console.error);
    }, []);


    return (
        <>
            <div className={`${styles.brands} py-10`}>
                <SectionTitle>Ən Çox Satılanlar</SectionTitle>
                <div className={`${styles.cards_container} flex justify-center items-center`}>
                    {mehsullar.map((item: Product) => (
                        <ProductCard key={item.id} item={item} />
                    ))}
                </div>
            </div>
        </>
    );
}