"use client";

import Link from "next/link";
import styles from './Brands.module.css';
import '@/components/home/Brands/Brands.css'
import AutoSwiper from '@/components/common/AutoSwiper';
import SectionTitle from '@/components/common/SectionTitle';


const logos = [
  { image: "/assets/home/brands/frederique.png", alt: "FREDERIQUE CONSTANT", href: "/products?brandId=8" },
  { image: "/assets/home/brands/armani.png", alt: "EMPORIO ARMANI", href: "/products?brandId=5" },
  { image: "/assets/home/brands/calvin.png", alt: "CALVIN KLEIN", href: "/products?brandId=6" },
  { image: "/assets/home/brands/michael.png", alt: "MICHAEL KORS", href: "/products?brandId=1" },
  { image: "/assets/home/brands/hilfiger.png", alt: "TOMMY HILFIGER", href: "/products?brandId=9" },
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