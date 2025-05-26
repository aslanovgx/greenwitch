"use client";
import { useEffect, useState } from 'react';
import Image from 'next/image'
import styles from './Products.module.css';
import mehsullar from '@/components/Mock/Home/mehsullar.json';
import { useFavorites } from "@/context/FavoritesContext";
// import HeartIcon from './../../../../public/assets/icons/heart.svg';
import { Heart } from "lucide-react";

interface Product {
    id: number;
    title: string;
    desc?: string; // optional etmək daha uyğundur
    price: number | string;
    image: string;
    hoverImage?: string; // optional etmək daha uyğundur
    originalPrice?: number;
    coupon?: number;
}



export default function Products() {
    // export default function Products({ products }: { products: Product[] }) {

    // const [products, setProducts] = useState([]);
    const [products, setProducts] = useState<Product[]>([]);
    // console.log(products);

    // const { toggleFavorite } = useFavorite();
    const { favorites, toggleFavorite } = useFavorites();


    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(data => {
                // console.log(data);        // bütün array-i göstərir
                // console.log(data[0].id);  // array-in 1-ci elementinin id-sini göstərir
                setProducts(data);
            })
            .catch(console.error);
    }, []);

    return (
        <>
            <div className={styles.row_1}>
                <ul className='flex justify-center items-center'>
                    <li>Yeni Gələnlər</li>
                    <li>Məhsullar</li>
                    <li>Endirimdə olanlar</li>
                </ul>
            </div>

            <div className={`${styles.row_2} flex justify-center items-center`}>
                <p>İlk siz kəşf edin – ən son saat trendləri bu bölmədə</p>
            </div>

            {/* <HeartIcon className="text-red-500" fill="red" /> */}

            <div className={`${styles.row_3} flex justify-center items-center`}>

                {
                    mehsullar.map((item: Product) => (
                        <div
                            key={item.id}
                            className={`${styles.cards} relative group rounded shadow w-[243px] h-[376px] text-center`}
                        >
                            <div className={`${styles.cards_image} relative w-full h-[259px] mx-auto`}>
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className='w-full h-full transition-opacity duration-600 group-hover:opacity-0'
                                    style={{ objectFit: "cover" }}
                                />
                                {item.hoverImage && (
                                    <Image
                                        src={item.hoverImage}
                                        alt={item.title}
                                        fill
                                        className='w-full h-full absolute top-0 left-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100'
                                        style={{ objectFit: "cover" }}
                                    />
                                )}
                            </div>
                            <div className={styles.cards_desc}>
                                <h3 className="transition-all duration-700 ">{item.title}</h3>
                                <p>{item.desc}</p>
                                <p className="opacity-0 group-hover:opacity-100 transition-opacity duration-700 !font-bold">
                                    {item.price}
                                </p>
                            </div>
                            <div
                                onClick={() =>
                                    toggleFavorite({
                                        id: item.id,
                                        title: item.title,
                                        price: Number(String(item.price).replace(/\D/g, '')),
                                        image: item.image,
                                        originalPrice: item.originalPrice,
                                        coupon: item.coupon,
                                    })
                                }
                                className="absolute top-3 left-3 z-10 cursor-pointer"
                            >
                                {favorites.some((fav) => fav.id === item.id) ? <Heart fill="black" /> : <Heart />}
                            </div>
                            <div className={`${styles.new_card} absolute top-3 right-3 z-10 cursor-pointer`}>
                                <span>NEW</span>
                            </div>
                        </div>
                    ))};


                {/* {
                        products.slice(0, 10).map((product) => {
                            return (
                                <div
                                    key={product.id}
                                    className={`${styles.cards} rounded shadow w-[243px] h-[376px] text-center`}
                                >
                                    <div className="relative w-[136px] h-[259px] mx-auto">
                                        <Image
                                            src={product.image}
                                            alt={product.title}
                                            fill
                                            style={{ objectFit: "contain" }}
                                        />
                                    </div>
                                    <h3 className="mt-2 font-semibold">{product.title.substring(0, 8)}</h3>
                                    <p className="text-sm mt-1">{product.description.substring(0, 40)}...</p>
                                </div>
                            );
                        })
                    } */}
            </div>
        </>
    );
}