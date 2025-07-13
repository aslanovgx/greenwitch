// components/FadeImage.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import styles from './../components/home/ImageGrid/ImageGrid.module.css';

const transition = { duration: 0.6, ease: [0.645, 0.045, 0.355, 1] as const };

type Props = {
  current: { src: string; title: string };
  previous: { src: string; title: string };
  activeIndex: number;
  prevIndex: number;
};

export default function FadeImage({ current, previous, activeIndex, prevIndex }: Props) {
  return (
    <div className="relative w-full h-full">
      {previous.src !== current.src && (
        <motion.div
          key={`prev-${previous.src}-${prevIndex}`}
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={transition}
          className="absolute inset-0 z-0"
        >
          <Image src={previous.src} alt={previous.title} fill priority className="object-cover" />
          <div className={styles.img_desc}>
            <span>{previous.title}</span>
          </div>
        </motion.div>
      )}

      <motion.div
        key={`curr-${current.src}-${activeIndex}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={transition}
        className="absolute inset-0 z-10"
      >
        <Image src={current.src} alt={current.title} fill priority className="object-cover" />
        <div className={styles.img_desc}>
          <span>{current.title}</span>
        </div>
      </motion.div>
    </div>
  );
}
