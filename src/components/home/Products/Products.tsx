"use client";
import { useEffect, useState } from 'react';
import Image from 'next/image'
import styles from './Products.module.css';
import mehsullar from '@/components/Mock/Home/mehsullar.json';

interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    image: string;
    // lazım olsa başqa sahələr də əlavə et
}
export default function Products() {

    // const [products, setProducts] = useState([]);
    const [products, setProducts] = useState<Product[]>([]);

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

            <div className={`${styles.row_3} flex justify-center items-center`}>

                {
                    mehsullar.map((item,index) => (<div
                        key={item.id || index}
                        className={`${styles.cards} relative group rounded shadow w-[243px] h-[376px] text-center`}
                    >
                        <div className={`${styles.cards_image} relative w-full h-[259px] mx-auto`}>
                            <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                // unoptimized
                                // priority
                                className='w-full h-full transition-opacity duration-600 group-hover:opacity-0'
                                style={{ objectFit: "cover" }}
                            />
                            <Image
                                src={item.hoverImage}
                                alt={item.hoverImage}
                                fill
                                // unoptimized
                                // priority
                                className='w-full h-full  absolute top-0 left-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100'
                                style={{ objectFit: "cover" }}
                            />

                        </div>
                        <div className={styles.cards_desc}>
                            <h3 className="transition-all duration-700 ">{item.title}</h3>
                            <p>{item.desc}</p>

                            <p className="opacity-0 group-hover:opacity-100 transition-opacity duration-700 !font-bold">
                                {item.price}
                            </p>
                        </div>
                        <div className="absolute top-3 left-3 z-10 cursor-pointer">
                            <Image
                                src="/assets/icons/heart.svg"
                                alt="favorite"
                                width={32}
                                height={32}
                                className="object-contain transition-transform duration-300 hover:scale-110"
                            />
                        </div>
                        <div className={`${styles.new_card} absolute top-3 right-3 z-10 cursor-pointer`}>
                            <span>NEW</span>
                        </div>
                    </div>))
                }


                {/* <div
                    className={`${styles.cards} rounded shadow w-[243px] h-[376px] text-center`}
                >
                    <div className="relative w-full h-[259px] mx-auto">
                        <Image
                            src={'/assets/home/cards/olivia-pink.png'}
                            alt='olivia-pink'
                            fill
                            // unoptimized
                            // priority
                            style={{ objectFit: "cover" }}
                        />
                    </div>
                    <h3>OLIVIA BURTON</h3>
                    <p>Wonderland <br />
                        30mm White & Rose Gold Mesh</p>
                </div>
                <div
                    className={`${styles.cards} rounded shadow w-[243px] h-[376px] text-center`}
                >
                    <div className="relative w-full h-[259px] mx-auto">
                        <Image
                            src={'/assets/home/cards/hilfiger.png'}
                            alt='hilfiger'
                            fill
                            // unoptimized
                            // priority
                            style={{ objectFit: "cover" }}
                        />
                    </div>
                    <h3>HİLFİGER</h3>
                    <p>32MM Monochrome Mesh Bracelet Watch</p>
                </div>
                <div
                    className={`${styles.cards} rounded shadow w-[243px] h-[376px] text-center`}
                >
                    <div className="relative w-full h-[259px] mx-auto">
                        <Image
                            src={'/assets/home/cards/olivia-black.png'}
                            alt='olivia-black'
                            fill
                            // unoptimized
                            // priority
                            style={{ objectFit: "cover" }}
                        />
                    </div>
                    <h3>OLIVIA BURTON</h3>
                    <p>32mm Dimension T-Bar Gold&Black Leather Strap Watch</p>
                </div>
                <div
                    className={`${styles.cards} rounded shadow w-[243px] h-[376px] text-center`}
                >
                    <div className="relative w-full h-[259px] mx-auto">
                        <Image
                            src={'/assets/home/cards/swiss.png'}
                            alt='swiss'
                            fill
                            // unoptimized
                            // priority
                            //  className="w-full h-full object-cover"
                            style={{ objectFit: "cover" }}
                        />
                    </div>
                    <h3>SWISS MILITARY</h3>
                    <p>MAJESTE PIONER</p>
                </div> */}

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