"use client";

import styles from './ImageGrid.module.css';
import { useState, useEffect } from "react";
import FadeImage from "@/components/FadeImage"; // path düzgün olmalıdır

type ImageData = {
  src: string;
  title: string;
};

type ImageSet = {
  left: ImageData;
  rightTop: ImageData;
  rightBottom: ImageData;
};

const imageSets: ImageSet[] = [
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
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setHasStarted(true), 0);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    const interval = setInterval(() => {
      setPrevIndex(activeIndex);
      setActiveIndex((prev) => (prev + 1) % imageSets.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [activeIndex, hasStarted]);

  const curr = imageSets[activeIndex];
  const prev = imageSets[prevIndex];

  return (
    <div className={`${styles.ImageGrid} flex flex-wrap justify-self-center mx-auto`}>
      {/* SOL */}
      <div className={`${styles.leftImage} relative`}>
        <div className={`${styles.img} relative`}>
          <FadeImage
            current={curr.left}
            previous={prev.left}
            activeIndex={activeIndex}
            prevIndex={prevIndex}
          />
        </div>
      </div>

      {/* SAĞ */}
      <div className={`${styles.rightImage} flex flex-col`}>
        <div className={`${styles.img} relative`}>
          <FadeImage
            current={curr.rightTop}
            previous={prev.rightTop}
            activeIndex={activeIndex}
            prevIndex={prevIndex}
          />
        </div>
        <div className={`${styles.img} relative`}>
          <FadeImage
            current={curr.rightBottom}
            previous={prev.rightBottom}
            activeIndex={activeIndex}
            prevIndex={prevIndex}
          />
        </div>
      </div>
    </div>
  );
}
