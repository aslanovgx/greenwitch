// components/FadeImage.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./../components/home/ImageGrid/ImageGrid.module.css";

const transition = { duration: 0.6, ease: [0.645, 0.045, 0.355, 1] as const };
const hasSrc = (s?: string) => typeof s === "string" && s.trim() !== "";

type Props = {
  current: { src: string; title: string };
  previous: { src: string; title: string };
  activeIndex: number;
  prevIndex: number;
};

export default function FadeImage({ current, previous, activeIndex, prevIndex }: Props) {
  const [currBroken, setCurrBroken] = useState(false);
  const [prevBroken, setPrevBroken] = useState(false);

  // src dəyişəndə error bayraqlarını sıfırla
  useEffect(() => setCurrBroken(false), [current.src]);
  useEffect(() => setPrevBroken(false), [previous.src]);

  return (
    <div className="relative w-full h-full">
      {/* PREVIOUS (fade-out) */}
      {previous.src !== current.src && (
        <motion.div
          key={`prev-${previous.src}-${prevIndex}`}
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={transition}
          className="absolute inset-0 z-0"
        >
          {hasSrc(previous.src) && !prevBroken ? (
            <Image
              src={previous.src}
              alt={previous.title}
              fill
              priority
              className="object-cover"
              onError={() => setPrevBroken(true)}
            />
          ) : (
            <div className={styles.img_desc}>
              <span>{previous.title}</span>
            </div>
          )}
        </motion.div>
      )}

      {/* CURRENT (fade-in) */}
      <motion.div
        key={`curr-${current.src}-${activeIndex}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={transition}
        className="absolute inset-0 z-10"
      >
        {hasSrc(current.src) && !currBroken ? (
          <Image
            src={current.src}
            alt={current.title}
            fill
            priority
            className="object-cover"
            onError={() => setCurrBroken(true)}
          />
        ) : (
          <div className={styles.img_desc}>
            <span>{current.title}</span>
          </div>
        )}
      </motion.div>
    </div>
  );
}
