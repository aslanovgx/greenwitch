"use client";

// import { useState } from 'react';
import Image from 'next/image'
import styles from './Banner.module.css';
import { motion } from "framer-motion";
// import AutoSwitcher from "@/components/ui/AutoSwitcher"; // yeni komponent
import { useAutoSwitcher } from "@/hooks/useAutoSwitcher";

const bannerSets = [
    {
        images: [
            { src: "/assets/navbar/banner-11.jpg", alt: "banner-11", width: 302 },
            { src: "/assets/navbar/banner-12.jpg", alt: "banner-12", width: 658 },
            { src: "/assets/navbar/banner-13.jpg", alt: "banner-13", width: 302 },
        ],
    },
    {
        images: [
            { src: "/assets/navbar/banner-21.jpg", alt: "banner-21", width: 302 },
            { src: "/assets/navbar/banner-22.jpg", alt: "banner-22", width: 658 },
            { src: "/assets/navbar/banner-23.jpg", alt: "banner-23", width: 302 },
        ],
    },
    {
        images: [
            { src: "/assets/navbar/banner-31.png", alt: "banner-31", width: 302 },
            { src: "/assets/navbar/banner-32.png", alt: "banner-32", width: 658 },
            { src: "/assets/navbar/banner-33.jpg", alt: "banner-33", width: 302 },
        ],
    },
];

export default function Banner() {
    const activeIndex = useAutoSwitcher(bannerSets.length, 3000);
    const currentSet = bannerSets[activeIndex];
    return (
        <>
            <div className={styles.row_3}>
                <ul className='flex justify-center items-center'>
                    <li>Kişi</li>
                    <li>Qadın</li>
                    <li>Uşaq</li>
                    <li>Aksesuar</li>
                    <li>Saatlar</li>
                    <li>Mağazalar</li>
                </ul>
            </div>

            <div className={`${styles.row_4} max-w-[1262px] mx-auto flex justify-center items-center`}>
                <motion.div
                    key={activeIndex}
                    animate={{ opacity: 1 }}
                    initial={false}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="flex justify-center items-center w-full gap-6"
                >
                    {currentSet.images.map((img, idx) => (
                        <div
                            key={img.src}
                            className={`relative ${styles[`banner_${idx + 1}`]}`}
                            style={{ width: img.width, height: 302 }}
                        >
                            <Image
                                src={img.src}
                                alt={img.alt}
                                fill
                                className="object-cover"
                            />
                        </div>
                    ))}
                </motion.div>

            </div>
        </>
    );
}