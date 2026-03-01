"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import styles from "./../home/Brands/Brands.module.css";
import "swiper/css";
import "swiper/css/autoplay";
import Image from "next/image";

interface SlideItem {
  image: string;
  alt?: string;
  href?: string; // ✅ YENİ
}

interface AutoSwiperProps {
  slides?: SlideItem[];
}

export default function AutoSwiper({ slides }: AutoSwiperProps) {
  if (!slides || slides.length === 0) return null;

  const repeatedSlides = slides.length <= 5 ? [...slides, ...slides, ...slides] : slides;

  return (
    <div className="w-full overflow-hidden">
      <Swiper
        modules={[Autoplay]}
        slidesPerView="auto"
        speed={4000}
        loop={true}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
        }}
        allowTouchMove={false}
        className="w-full"
      >
        {repeatedSlides.map((slide, idx) => {
          const Content = (
            <div className={`${styles.image_div} image_div relative`}>
              <Image
                src={slide.image}
                alt={slide.alt || `slide-${idx}`}
                fill
                className="object-contain"
                sizes="240px"
              />
              <span className={styles.borderRight}></span>
            </div>
          );

          return (
            <SwiperSlide key={idx} className="swiperSlide flex items-center justify-center">
              {slide.href ? (
                <Link
                  href={slide.href}
                  aria-label={`${slide.alt ?? "brand"} məhsullarına bax`}
                  className="brandSlideLink"
                >
                  {Content}
                </Link>
              ) : (
                Content
              )}
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}