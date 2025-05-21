"use client";
import { useEffect, useState } from 'react';
import Image from 'next/image'
import styles from './Products.module.css';

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
                {products.slice(0,10).map(product => (
                    <div key={product.id} className={`${styles.cards} rounded shadow w-[243px] h-[376px] text-center`}>
                        <div className="relative w-[136px] h-[259px] mx-auto">
                            <Image
                                src={product.image}
                                alt={product.title}
                                fill
                                style={{ objectFit: 'contain' }}
                            />
                        </div>
                        <h3 className="mt-2 font-semibold">{product.title.substring(0,8)}</h3>
                        <p className="text-sm mt-1">{product.description.substring(0, 40)}...</p>
                        {/* <p className="mt-2 font-bold">${product.price}</p> */}
                    </div>
                ))}
                {/* <div className={`${styles.cards}`}>
                    <Image
                        src={'/assets/home/cards/michael.png'}
                        alt='michael'
                        // fill
                        // unoptimized
                        // priority
                        width={400}
                        height={300}
                        objectFit="cover"
                    />
                </div> */}
                {/* <div className={`${styles.cards} `}>
                    <Image
                        src={'/assets/home/cards/olivia-pink.png'}
                        alt='olivia-pink'
                        // fill
                        className={` object-cover`}
                    />
                </div>
                <div className={`${styles.cards} `}>
                    <Image
                        src={'/assets/home/cards/hilfiger.png'}
                        alt='banner-1'
                        fill
                        className={` object-cover`}
                    />
                </div>
                <div className={`${styles.cards} `}>
                    <Image
                        src={'/assets/home/cards/olivia-black.png'}
                        alt='banner-1'
                        fill
                        className={`object-cover`}
                    />
                </div>
                <div className={`${styles.cards} `}>
                    <Image
                        src={'/assets/home/cards/swiss.png'}
                        alt='banner-1'
                        fill
                        className={`object-cover`}
                    />
                </div> */}
            </div>
        </>
    );
}