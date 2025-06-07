"use client";

import Image from "next/image";
import styles from "./Banner.module.css";
import { useState, useEffect } from "react";

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
    const [activeIndex, setActiveIndex] = useState(0);
    const [prevIndex, setPrevIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);

    // Mount olduqdan sonra animasiya başlayacaq
    //   useEffect(() => {
    //     const timeout = setTimeout(() => setHasStarted(true), 50);
    //     return () => clearTimeout(timeout);
    //   }, []);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setHasStarted(true); // SSR sonrası client başladı
        }, 0);

        return () => clearTimeout(timeout);
    }, []);

    // Index və keçid intervalı
    useEffect(() => {
        if (!hasStarted) return; // hələ başlamayıbsa interval qurma

        const interval = setInterval(() => {
            setPrevIndex(activeIndex);
            setActiveIndex((prev) => (prev + 1) % bannerSets.length);
            setIsTransitioning(true);
            setTimeout(() => setIsTransitioning(false), 600);
        }, 3000);

        return () => clearInterval(interval);
    }, [activeIndex, hasStarted]);

    const transition = { duration: 0.6, ease: "easeInOut" };

    // Keçid effekti verən funksiya
    const fadeImage = (
        currSrc: string,
        prevSrc: string,
        currTitle: string,
        prevTitle: string
    ) => (
        <div className="relative w-full h-full">
            {/* Əvvəlki şəkil və yazı */}
            {hasStarted && prevSrc !== currSrc && (
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        opacity: isTransitioning ? 1 : 0,
                        transition: `opacity ${transition.duration}s ease-in-out`,
                        zIndex: 0,
                    }}
                >
                    <Image src={prevSrc} alt="" fill className="object-cover" />
                    <div className={styles.img_desc}>
                        <span>{prevTitle}</span>
                    </div>
                </div>
            )}

            {/* Cari şəkil və yazı */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    opacity: isTransitioning ? 0 : 1,
                    transition: `opacity ${transition.duration}s ease-in-out`,
                    zIndex: 10,
                }}
            >
                <Image src={currSrc} alt={currTitle} fill className="object-cover" />
                <div className={styles.img_desc}>
                    <span>{currTitle}</span>
                </div>
            </div>
        </div>
    );

    const curr = bannerSets[activeIndex];
    const prev = bannerSets[prevIndex];

    return (
        <>
            {/* Navigation Row */}
            <div className={styles.row_3}>
                <ul className="flex justify-center items-center">
                    <li>Kişi</li>
                    <li>Qadın</li>
                    <li>Uşaq</li>
                    <li>Aksesuar</li>
                    <li>Saatlar</li>
                    <li>Mağazalar</li>
                </ul>
            </div>

            {/* Banner Row */}
            <div className={`${styles.row_4} max-w-[1262px] mx-auto flex justify-center items-center`}>
                <div className="flex justify-center items-center w-full gap-6">
                    {curr.images.map((img, idx) => (
                        <div
                            key={`${img.src}-${idx}`}
                            className={`relative ${styles[`banner_${idx + 1}`]}`}
                            style={{ width: img.width, height: 302 }}
                        >
                            {fadeImage(
                                curr.images[idx].src,
                                prev.images[idx].src,
                                curr.images[idx].alt,
                                prev.images[idx].alt
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
