"use client";

import styles from "./Banner.module.css";
import { useState, useEffect } from "react";
import FadeImage from "@/components/FadeImage"; // path düzgün olmalıdır

const bannerSets = [
  {
    images: [
      { src: "/assets/navbar/banner-11.jpg", alt: "banner-11" },
      { src: "/assets/navbar/banner-12.jpg", alt: "banner-12" },
      { src: "/assets/navbar/banner-13.jpg", alt: "banner-13" },
    ],
  },
  {
    images: [
      { src: "/assets/navbar/banner-21.jpg", alt: "banner-21" },
      { src: "/assets/navbar/banner-22.jpg", alt: "banner-22" },
      { src: "/assets/navbar/banner-23.jpg", alt: "banner-23" },
    ],
  },
  {
    images: [
      { src: "/assets/navbar/banner-31.png", alt: "banner-31" },
      { src: "/assets/navbar/banner-32.png", alt: "banner-32" },
      { src: "/assets/navbar/banner-33.jpg", alt: "banner-33" },
    ],
  },
];

export default function Banner() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setHasStarted(true), 0);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!hasStarted) return;
    const interval = setInterval(() => {
      setPrevIndex(activeIndex);
      setActiveIndex((prev) => (prev + 1) % bannerSets.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [activeIndex, hasStarted]);

  const curr = bannerSets[activeIndex];
  const prev = bannerSets[prevIndex];

  return (
    <div className={`${styles.row_4} max-w-[1262px] mx-auto flex justify-center items-center`}>
      <div className="flex justify-center items-center w-full">
        {curr.images.map((img, idx) => (
          <div
            key={`${img.src}-${idx}`}
            className={`relative ${styles[`banner_${idx + 1}`]}`}
          >
            <FadeImage
              current={{ src: curr.images[idx].src, title: curr.images[idx].alt }}
              previous={{ src: prev.images[idx].src, title: prev.images[idx].alt }}
              activeIndex={activeIndex}
              prevIndex={prevIndex}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
