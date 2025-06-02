"use client";

import styles from './ImageGrid.module.css';
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const imageSets = [
  {
    left: { src: "/assets/home/imageGrid/hilfiger.png", title: "hilfiger" },
    rightTop: { src: "/assets/home/imageGrid/olivia-black.jpg", title: "olivia burton" },
    rightBottom: { src: "/assets/home/imageGrid/fossil.png", title: "fossil" },
  },
  {
    left: { src: "/assets/home/imageGrid/frederique.jpg", title: "frederique Constant" },
    rightTop: { src: "/assets/home/imageGrid/olivia-pink.jpg", title: "olivia burton" },
    rightBottom: { src: "/assets/home/imageGrid/swiss.png", title: "swiss-military" },
  },
];

export default function ImageGrid() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPrevIndex(activeIndex);
      setActiveIndex((prev) => (prev + 1) % imageSets.length);
      setIsTransitioning(true);
      setTimeout(() => setIsTransitioning(false), 600);
    }, 5000);

    return () => clearInterval(interval);
  }, [activeIndex]);

  const transition = { duration: 0.6, ease: "easeInOut" };

  const fadeImage = (
    currSrc: string,
    prevSrc: string,
    currTitle: string,
    prevTitle: string
  ) => (
    <div className="relative w-full h-full">
      {/* Previous image + title */}
      <motion.div
        key={`prev-${prevSrc}`}
        initial={{ opacity: 1 }}
        animate={{ opacity: isTransitioning ? 1 : 0 }}
        transition={transition}
        className="absolute inset-0 z-0"
      >
        <Image src={prevSrc} alt="" fill className="object-cover" />
        <div className={styles.img_desc}>
          <span>{prevTitle}</span>
        </div>
      </motion.div>

      {/* Current image + title */}
      <motion.div
        key={`curr-${currSrc}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: isTransitioning ? 0 : 1 }}
        transition={transition}
        className="absolute inset-0 z-10"
      >
        <Image src={currSrc} alt={currTitle} fill className="object-cover" />
        <div className={styles.img_desc}>
          <span>{currTitle}</span>
        </div>
      </motion.div>
    </div>
  );

  const curr = imageSets[activeIndex];
  const prev = imageSets[prevIndex];

  return (
    <div className={`${styles.ImageGrid} flex justify-self-center gap-x-[46px]`}>
      {/* LEFT */}
      <div className={`${styles.leftImage} relative`}>
        <div className={`${styles.img} relative w-[680px] h-[706px]`}>
          {fadeImage(curr.left.src, prev.left.src, curr.left.title, prev.left.title)}
        </div>
      </div>

      {/* RIGHT */}
      <div className={`${styles.rightImage} flex flex-col gap-y-[36px] w-[456px] h-[706px]`}>
        <div className={`${styles.img} relative w-[456px] h-[341px]`}>
          {fadeImage(
            curr.rightTop.src,
            prev.rightTop.src,
            curr.rightTop.title,
            prev.rightTop.title
          )}
        </div>
        <div className={`${styles.img} relative w-[456px] h-[328px]`}>
          {fadeImage(
            curr.rightBottom.src,
            prev.rightBottom.src,
            curr.rightBottom.title,
            prev.rightBottom.title
          )}
        </div>
      </div>
    </div>
  );
}
