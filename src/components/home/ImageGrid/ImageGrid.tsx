"use client";

import styles from './ImageGrid.module.css';
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const imageSets = [
  {
    left: { src: "/assets/home/imageGrid/hilfiger.png", title: "hilfiger" },
    rightTop: { src: "/assets/home/imageGrid/olivia-black.jpg", title: "olivia burton" },
    rightBottom: { src: "/assets/home/imageGrid/olivia-pink.jpg", title: "olivia burton" },
  },
  {
    left: { src: "/assets/home/imageGrid/frederique.jpg", title: "frederique Constant" },
    rightTop: { src: "/assets/home/imageGrid/fossil.png", title: "fossil" },
    rightBottom: { src: "/assets/home/imageGrid/swiss.png", title: "swiss-military" },
  },
];

export default function ImageGrid() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Safari SSR timing üçün delay
    const delayTimeout = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        setActiveIndex((prev) => {
          const next = (prev + 1) % imageSets.length;
          setPrevIndex(prev);
          return next;
        });
      }, 3000);
    }, 50); // 50ms delay

    return () => {
      clearTimeout(delayTimeout);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const transition = { duration: 0.5, ease: "easeInOut" };

  const fadeImage = (
    currSrc: string,
    prevSrc: string,
    currTitle: string,
    prevTitle: string,
    activeIdx: number,
    prevIdx: number
  ) => (
    <div className="relative w-full h-full">
      {prevSrc !== currSrc && (
        <motion.div
          key={`prev-${prevSrc}-${prevTitle}-${prevIdx}`}
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={transition}
          className="absolute inset-0 z-0"
        >
          <Image src={prevSrc} alt={prevTitle} fill priority className="object-cover" />
          <div className={styles.img_desc}>
            <span>{prevTitle}</span>
          </div>
        </motion.div>
      )}

      <motion.div
        key={`curr-${currSrc}-${currTitle}-${activeIdx}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={transition}
        className="absolute inset-0 z-10"
      >
        <Image src={currSrc} alt={currTitle} fill priority className="object-cover" />
        <div className={styles.img_desc}>
          <span>{currTitle}</span>
        </div>
      </motion.div>
    </div>
  );

  const curr = imageSets[activeIndex];
  const prev = imageSets[prevIndex];

  return (
    <div className={`${styles.ImageGrid} flex flex-wrap justify-self-center`}>
      {/* SOL */}
      <div className={`${styles.leftImage} relative`}>
        <div className={`${styles.img} relative`}>
          {fadeImage(
            curr.left.src,
            prev.left.src,
            curr.left.title,
            prev.left.title,
            activeIndex,
            prevIndex
          )}
        </div>
      </div>

      {/* SAĞ */}
      <div className={`${styles.rightImage} flex flex-col`}>
        <div className={`${styles.img} relative`}>
          {fadeImage(
            curr.rightTop.src,
            prev.rightTop.src,
            curr.rightTop.title,
            prev.rightTop.title,
            activeIndex,
            prevIndex
          )}
        </div>
        <div className={`${styles.img} relative`}>
          {fadeImage(
            curr.rightBottom.src,
            prev.rightBottom.src,
            curr.rightBottom.title,
            prev.rightBottom.title,
            activeIndex,
            prevIndex
          )}
        </div>
      </div>
    </div>
  );
}
