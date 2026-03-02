"use client";

import styles from './Brands.module.css';
import '@/components/home/Brands/Brands.css'
import AutoSwiper from '@/components/common/AutoSwiper';
import SectionTitle from '@/components/common/SectionTitle';


const logos = [
  { image: "/assets/home/brands/frederique.png", alt: "FREDERIQUE CONSTANT", href: "/products?categoryId=1&brandId=8" },
  { image: "/assets/home/brands/armani.png", alt: "EMPORIO ARMANI", href: "/products?categoryId=1&brandId=5" },
  { image: "/assets/home/brands/calvin.png", alt: "CALVIN KLEIN", href: "/products?categoryId=1&brandId=6" },
  { image: "/assets/home/brands/michael.png", alt: "MICHAEL KORS", href: "/products?categoryId=1&brandId=1" },
  { image: "/assets/home/brands/hilfiger.png", alt: "TOMMY HILFIGER", href: "/products?categoryId=1&brandId=9" },
];

export default function Brands() {

    return (
        <>
            <div className={`${styles.brands}`}>
                <SectionTitle>Brendlər</SectionTitle>
                <AutoSwiper slides={logos} />
            </div>
        </>
    );
}