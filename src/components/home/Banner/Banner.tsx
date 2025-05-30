"use client";

import { useState } from 'react';
import Image from 'next/image'
import styles from './Banner.module.css';
import TextSwitcher from "@/components/ui/TextSwitcher";
import { motion, AnimatePresence } from "framer-motion";

const bannerSets = [
    {
        images: [
            { src: "/assets/navbar/banner-11.jpg", alt: "banner-11", width: 302 },
            { src: "/assets/navbar/banner-12.jpg", alt: "banner-12", width: 658 },
            { src: "/assets/navbar/banner-13.jpg", alt: "banner-13", width: 284 },
        ],
    },
    {
        images: [
            { src: "/assets/navbar/banner-21.jpg", alt: "banner-21", width: 302 },
            { src: "/assets/navbar/banner-22.jpg", alt: "banner-22", width: 658 },
            { src: "/assets/navbar/banner-23.jpg", alt: "banner-23", width: 284 },
        ],
    },
    {
        images: [
            { src: "/assets/navbar/banner-31.png", alt: "banner-31", width: 302 },
            { src: "/assets/navbar/banner-32.png", alt: "banner-32", width: 658 },
            { src: "/assets/navbar/banner-33.jpg", alt: "banner-33", width: 284 },
        ],
    },
];

export default function Banner() {
    const [activeIndex, setActiveIndex] = useState(0);
    // const [isFading, setIsFading] = useState(false);
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

            <div className={`${styles.row_4} flex justify-center items-center`}>
                {currentSet.images.map((img, idx) => (
                    <motion.div
                        key={`${activeIndex}-${img.src}`}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        // transition={{ duration: 0.8, ease: "easeInOut" }}
                        transition={{ type: "spring", stiffness: 60, damping: 12 }}
                        // transition={{
                        //     type: "spring",
                        //     stiffness: 40,
                        //     damping: 15,
                        //     mass: 0.8
                        // }}
                        className={`relative ${styles[`banner_${idx + 1}`]}`}
                        style={{ width: img.width, height: 302 }}
                    >
                        <Image
                            src={img.src}
                            alt={img.alt}
                            fill
                            className="object-cover"
                        />
                    </motion.div>
                ))}

                {/* Interval üçün TextSwitcher */}
                <TextSwitcher
                    texts={["", "", ""]}
                    onIndexChange={(i) => {
                        setActiveIndex(i); // artıq fade effekti Framer Motion-da
                    }}
                />

            </div>
        </>
    );
}