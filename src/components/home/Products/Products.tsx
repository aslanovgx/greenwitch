"use client";
import { useState } from 'react';
import Image from 'next/image'

import productStyles from './Products.module.css';
import cardStyles from '@/components/common/ProductCard.module.css';

import mehsullar from '@/components/Mock/Home/mehsullar.json';

import { useFavorites } from "@/context/FavoritesContext";
import { Heart } from "lucide-react";
import { Product } from '@/types/Product';

export default function Products() {
    // export default function Products({ products }: { products: Product[] }) {

    // const [products, setProducts] = useState([]);
    // const [products, setProducts] = useState<Product[]>([]);
    // console.log(products);

    // const { toggleFavorite } = useFavorite();
    const { favorites, toggleFavorite } = useFavorites();


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

                {
                    filteredProducts.map((item: Product) => (
                        <div
                            key={item.id}
                            className={`${cardStyles.cards} relative group rounded shadow text-center`}
                        >
                            <div className={`${cardStyles.cards_image} relative mx-auto`}>
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className='w-full h-full scale-105 transition-opacity duration-600 group-hover:opacity-0'
                                    style={{ objectFit: "cover" }}
                                />
                                {item.hoverImage && (
                                    <Image
                                        src={item.hoverImage}
                                        alt={item.title}
                                        fill
                                        className={`${cardStyles.hoverImage} scale-95 w-full h-full absolute top-0 left-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100`}
                                        style={{ objectFit: "cover" }}
                                    />
                                )}
                            </div>
                            <div className={`${cardStyles.cards_desc}`}>
                                <h3 className="transition-all duration-700 ">{item.title}</h3>
                                <p>{item.desc}</p>
                                <p className="opacity-0 group-hover:opacity-100 transition-opacity duration-700 !font-bold">
                                    {item.price}
                                </p>
                                <div className={`${cardStyles.card_buttons} absolute bottom-0 left-0 flex justify-between opacity-0 transition-opacity duration-700 group-hover:opacity-100`}>
                                    <button>al</button>
                                    <button>səbətə at</button>
                                </div>
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
                            {activeCategory === "new" && item.isNew && (
                                <div className={`${cardStyles.new_card} absolute top-3 right-3 z-10 cursor-pointer`}>
                                    <span>NEW</span>
                                </div>
                            )}

                            {activeCategory === "discount" && item.coupon > 0 && (
                                <div className={`${cardStyles.new_card} ${cardStyles.discountBadge}  absolute top-3 right-3 z-10 cursor-pointer`}>
                                    <span>ENDİRİM</span>
                                </div>
                            )}

                            {activeCategory === "all" && (
                                <>
                                    {item.isNew && (
                                        <div className={`${cardStyles.new_card} absolute top-3 right-3 z-10 cursor-pointer`}>
                                            <span>NEW</span>
                                        </div>
                                    )}
                                    {!item.isNew && item.coupon > 0 && (
                                        <div className={`${cardStyles.new_card} ${cardStyles.discountBadge} absolute top-3 right-3 z-10 cursor-pointer`}>
                                            <span>ENDİRİM</span>
                                        </div>
                                    )}
                                </>
                            )}

                        </div>
                    ))}


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

            <div className={`${productStyles.moreButton} w-full mx-auto text-center`}>
                <button className=" bg-black text-white cursor-pointer hover:bg-white hover:text-black hover:font-semibold transition-all duration-300">
                    Daha çox
                </button>
            </div>


            {/* <VirtualProductList products={extendedProducts} /> */}
        </>
    );
}