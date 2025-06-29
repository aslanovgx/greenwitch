"use client";
import { useState } from 'react';

import productStyles from './Products.module.css';
import cardStyles from '@/components/common/ProductCard.module.css';

import mehsullar from '@/components/Mock/Home/mehsullar.json';

import { Product } from '@/types/Product';
import ProductCard from '@/components/common/ProductCard';
import MoreButton from '@/components/ui/MoreButton';
import Link from 'next/link';

export default function Products() {
    // export default function Products({ products }: { products: Product[] }) {

    // const [products, setProducts] = useState([]);
    // const [products, setProducts] = useState<Product[]>([]);
    // console.log(products);

    // const { toggleFavorite } = useFavorite();


    // useEffect(() => {
    //     fetch('https://fakestoreapi.com/products')
    //         .then(res => res.json())
    //         .then(data => {
    //             // console.log(data);        // bütün array-i göstərir
    //             // console.log(data[0].id);  // array-in 1-ci elementinin id-sini göstərir
    //             setProducts(data);
    //         })
    //         .catch(console.error);
    // }, []);

    // useEffect(() => {
    //     fetch('https://fakestoreapi.com/products')
    //         .then(res => res.json())
    //         .then(data => {
    //             // console.log(data);        // bütün array-i göstərir
    //             // console.log(data[0].id);  // array-in 1-ci elementinin id-sini göstərir
    //             setProducts(data);
    //         })
    //         .catch(console.error);
    // }, []);
    const [activeCardId, setActiveCardId] = useState<number | null>(null);
    const [activeCategory, setActiveCategory] = useState<string>("all");
    const filteredProducts = mehsullar.filter((item) => {
        if (activeCategory === "new") return item.isNew;
        if (activeCategory === "discount") return item.coupon && item.coupon > 0;
        return true; // "all" üçün hamısı
    });
    return (
        <>
            <div className={productStyles.row_1}>
                <ul className='flex justify-center items-center'>
                    <li
                        onClick={() => setActiveCategory("new")}
                        className={`cursor-pointer ${activeCategory === "new" ? "opacity-100" : "opacity-30"
                            }`}
                    >
                        Yeni Gələnlər
                    </li>
                    <li
                        onClick={() => setActiveCategory("all")}
                        className={`cursor-pointer ${activeCategory === "all" ? "opacity-100" : "opacity-30"
                            }`}
                    >
                        Məhsullar
                    </li>
                    <li
                        onClick={() => setActiveCategory("discount")}
                        className={`cursor-pointer ${activeCategory === "discount" ? "opacity-100" : "opacity-30"
                            }`}
                    >
                        Endirimdə olanlar
                    </li>
                </ul>
            </div>

            <div className={`${productStyles.row_2} flex justify-center items-center`}>
                <p>İlk siz kəşf edin – ən son saat trendləri bu bölmədə</p>
            </div>

            {/* <HeartIcon className="text-red-500" fill="red" /> */}

            <div className={`${cardStyles.cards_container} flex justify-center items-center`}>
                {filteredProducts.slice(0, 5).map((item: Product) => (
                    <ProductCard
                        key={item.id}
                        item={item}
                        activeCategory={activeCategory}
                        activeCardId={activeCardId}
                        setActiveCardId={setActiveCardId}
                    />
                ))}
            </div>

            <Link href="/products" scroll={true}>
                <MoreButton>Daha çox</MoreButton>
            </Link>
        </>
    );
}