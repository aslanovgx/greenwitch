"use client";
import { useState, useEffect, useRef } from 'react';
import styles from './ProductsDetail.module.css';
import { Product } from '@/types/Product';
import Image from "next/image";
import ImageMagnifier from '@/components/ImageMagnifier';
import { useRouter } from 'next/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { FiChevronUp, FiChevronDown } from 'react-icons/fi';
import { useBag } from "@/context/BagContext";
import type { Swiper as SwiperClass } from 'swiper';

type Props = {
    product: Product;
};

export default function ProductsDetail({ product }: Props) {
    const [activeImage, setActiveImage] = useState<string | null>(
        product.image?.trim() || null
    );

    const [qty, setQty] = useState(1);
    const router = useRouter();
    const { addToBag } = useBag();

    const prevRef = useRef<HTMLButtonElement | null>(null);
    const nextRef = useRef<HTMLButtonElement | null>(null);
    const swiperRef = useRef<SwiperClass | null>(null);

    const [showMobileSlider, setShowMobileSlider] = useState(false);
    const [hasMounted, setHasMounted] = useState(false);

    const [imageSize, setImageSize] = useState({ width: 380, height: 400 });
    const [thumbsConfig, setThumbsConfig] = useState({ slidesPerView: 3, height: 400, width: 95 });

    const getImageSizeByWidth = (width: number) => {
        if (width < 640) return { width: 360, height: 420 };
        if (width < 769) return { width: 200, height: 300 };
        if (width < 1025) return { width: 270, height: 388 };
        return { width: 380, height: 547 };
    };

    const getThumbsConfigByWidth = (width: number) => {
        if (width < 640) return { slidesPerView: 4, height: 280, width: 75 };
        if (width < 769) return { slidesPerView: 4, height: 300, width: 80 };
        if (width < 1025) return { slidesPerView: 4, height: 390, width: 67 };
        return { slidesPerView: 4, height: 538, width: 95 };
    };

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            setShowMobileSlider(width < 640);
            setImageSize(getImageSizeByWidth(width));
            setThumbsConfig(getThumbsConfigByWidth(width));
        };

        setHasMounted(true);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (
            !swiperRef.current ||
            showMobileSlider ||
            !prevRef.current ||
            !nextRef.current
        ) return;

        if (
            swiperRef.current.params?.navigation &&
            typeof swiperRef.current.params.navigation !== "boolean"
        ) {
            swiperRef.current.params.navigation.prevEl = prevRef.current;
            swiperRef.current.params.navigation.nextEl = nextRef.current;

            if (!swiperRef.current.destroyed) {
                swiperRef.current.navigation.init();
                swiperRef.current.navigation.update();
            }
        }
    }, [thumbsConfig, showMobileSlider]);

    const handleQtyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const number = Number(e.target.value);
        if (!isNaN(number) && number >= 1) {
            setQty(number);
        }
    };

    if (!hasMounted) return <div style={{ minHeight: "400px" }} />;

    return (
        <div className={styles.products_detail}>
            <div className={styles.leftSide}>
                {showMobileSlider ? (
                    <Swiper
                        slidesPerView={1}
                        pagination={{ clickable: true }}
                        modules={[Pagination]}
                        className={styles.mobileImageSlider}
                        onSlideChange={(swiper) => {
                            const newImage = product.thumbnails?.[swiper.activeIndex];
                            if (newImage) setActiveImage(newImage);
                        }}
                    >
                        {product.thumbnails?.map((thumb) =>
                            thumb?.trim() ? (
                                <SwiperSlide key={thumb}>
                                    <Image
                                        src={thumb}
                                        alt="mobile-thumb"
                                        width={imageSize.width}
                                        height={imageSize.height}
                                        priority
                                        className={styles.mainImageMobile}
                                        style={{ objectFit: "cover", borderRadius: "8px" }}
                                    />
                                </SwiperSlide>
                            ) : null
                        )}
                    </Swiper>
                ) : (
                    <>
                        <div className="product-detail-swiper-wrapper w-full relative">
                            <button ref={prevRef} className={styles.swiperPrev}>
                                <FiChevronUp color="black" />
                            </button>
                            <Swiper
                                direction="vertical"
                                slidesPerView={thumbsConfig.slidesPerView}
                                slidesPerGroup={1}
                                spaceBetween={10}
                                onSwiper={(swiper) => (swiperRef.current = swiper)}
                                allowTouchMove={false}
                                modules={[Pagination, Navigation]}
                                className={`product-detail-swiper ${styles.thumbnails}`}
                                style={{
                                    height: `${thumbsConfig.height}px`,
                                    maxWidth: `${thumbsConfig.width}px`,
                                }}
                            >
                                {product.thumbnails?.map((thumb) =>
                                    thumb?.trim() ? (
                                        <SwiperSlide key={thumb}>
                                            <Image
                                                src={thumb}
                                                alt="thumb"
                                                width={95}
                                                height={127}
                                                className={styles.thumbnailImage}
                                                onClick={() => setActiveImage(thumb)}
                                                style={{
                                                    cursor: "pointer",
                                                    border: activeImage === thumb
                                                        ? "2px solid black"
                                                        : "1px solid #ccc",
                                                    borderRadius: "6px",
                                                }}
                                            />
                                        </SwiperSlide>
                                    ) : null
                                )}
                            </Swiper>
                            <button ref={nextRef} className={styles.swiperNext}>
                                <FiChevronDown color="black" />
                            </button>
                        </div>

                        {activeImage && (
                            <div className={styles.mainImage}>
                                <ImageMagnifier
                                    src={activeImage}
                                    width={imageSize.width}
                                    height={imageSize.height}
                                    zoom={1.5}
                                    isRound={true}
                                />
                            </div>
                        )}
                    </>
                )}
            </div>

            <div className={styles.rightSide}>
                <h1 className={styles.title}>{product.title}</h1>
                <p className={styles.desc}>{product.desc}</p>
                <p className={styles.price}>{product.price}</p>

                <div className={styles.colorRow}>
                    <span>
                        Rəng: {product.colors.map((clr) => clr.name).join(", ")}
                    </span>
                    <div className={styles.colorList}>
                        {product.colors.map((clr, idx) => (
                            <div
                                key={idx}
                                style={{ background: clr.hex }}
                                className={styles.colorDot}
                            />
                        ))}
                    </div>
                </div>

                <div className={styles.buyRow}>
                    <input
                        type="number"
                        min="1"
                        className={styles.qtyInput}
                        value={qty}
                        onChange={handleQtyChange}
                    />
                    <button
                        className={styles.buyButton}
                        onClick={(e) => {
                            e.stopPropagation();
                            addToBag({ ...product, quantity: qty });
                            router.push(`/purchase`);
                        }}
                    >
                        İndi Al
                    </button>
                </div>

                <div className={styles.note}>
                    <p>Məhsul detalları və çatdırılma</p>
                </div>
            </div>
        </div>
    );
}
