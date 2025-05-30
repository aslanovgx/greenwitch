"use client";
import styles from './ImageGrid.module.css';
import Image from "next/image";
import TextSwitcher from "@/components/ui/TextSwitcher";
import { useState } from "react";

const imageSets = [
  {
    left: {
      src: "/assets/home/imageGrid/hilfiger.png",
      title: "hilfiger",
    },
    rightTop: {
      src: "/assets/home/imageGrid/olivia-black.jpg",
      title: "olivia burton",
    },
    rightBottom: {
      src: "/assets/home/imageGrid/fossil.png",
      title: "fossil",
    },
  },
  {
    left: {
      src: "/assets/home/imageGrid/frederique.jpg",
      title: "frederique Constant",
    },
    rightTop: {
      src: "/assets/home/imageGrid/olivia-pink.jpg",
      title: "olivia burton",
    },
    rightBottom: {
      src: "/assets/home/imageGrid/swiss.png",
      title: "swiss-military",
    },
  },
];

export default function ImageGrid() {
  const [activeIndex, setActiveIndex] = useState(0);
  const currentSet = imageSets[activeIndex];
  const [isFading, setIsFading] = useState(false);
  return (

    <>
      <div className={`${styles.ImageGrid} flex justify-self-center gap-x-[46px]`}>
        <div className={`${styles.leftImage} relative row-span-2`}>
          <div
            className={`${styles.img} relative w-[680px] h-[706px]  transition-opacity duration-700 
             ${isFading ? "opacity-0" : "opacity-100"
              }`}
          >
            <Image
              key={currentSet.left.src}
              src={currentSet.left.src}
              alt={currentSet.left.title}
              fill
              className="object-cover"
            />
          </div >
          <div className={`${styles.img_desc}  transition-opacity duration-700
            ${isFading ? "opacity-0" : "opacity-100"
            }`}>
            <span>{currentSet.left.title}</span>
          </div>
        </div>
        <div className={`${styles.rightImage} justify-self-center gap-y-[36px] flex flex-col w-[456px] h-[706px]`}>
          <div className={`${styles.img} relative w-[456px] h-[341px]  transition-opacity duration-700 
          ${isFading ? "opacity-0" : "opacity-100"
            }`}>
            <Image
              key={currentSet.rightTop.src}
              src={currentSet.rightTop.src}
              alt={currentSet.rightTop.title}
              fill
              className="object-cover"
            />
            <div className={`${styles.img_desc}  transition-opacity duration-700
            ${isFading ? "opacity-0" : "opacity-100"
              }`}>
              <span>{currentSet.rightTop.title}</span>
            </div>
          </div >
          <div className={`${styles.img} relative w-[456px] h-[328px] transition-opacity duration-700 
          ${isFading ? "opacity-0" : "opacity-100"
            }`}>
            <Image
              key={currentSet.rightBottom.src}
              src={currentSet.rightBottom.src}
              alt={currentSet.rightBottom.title}
              fill
              className="object-cover"
            />
            <div className={`${styles.img_desc}  transition-opacity duration-700
            ${isFading ? "opacity-0" : "opacity-100"
              }`}>
              <span>{currentSet.rightBottom.title}</span>
            </div>
          </div >
        </div>
        {/* SWITCHER to auto-change */}
        <TextSwitcher
          texts={["", ""]}
          onIndexChange={(i) => {
            setIsFading(true); // əvvəlcə gizlət
            setTimeout(() => {
              setActiveIndex(i); // sonra şəkli dəyiş
              setIsFading(false); // sonra görün
            }, 700); // <-- BU BURADADIR
          }}
        />

      </div>
    </>
  );
}