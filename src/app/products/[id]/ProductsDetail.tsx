"use client";
import { useState, useEffect } from 'react';
// import Zoom from 'react-medium-image-zoom';
import styles from './ProductsDetail.module.css';
import 'react-medium-image-zoom/dist/styles.css';
import { Product } from '@/types/Product';
import Image from "next/image";
import ImageMagnifier from '@/components/ImageMagnifier';
import { useRouter } from 'next/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { HiChevronUp, HiChevronDown } from 'react-icons/hi';
import { useBag } from "@/context/BagContext";

type Props = {
    product: Product;
};

export default function ProductsDetail({ product }: Props) {
    const [activeImage, setActiveImage] = useState<string | null>(
        product.image && product.image.trim() !== '' ? product.image.trim() : null
    );


    const [qty, setQty] = useState(1);
    const router = useRouter();
    const { addToBag } = useBag();

    // ✅ Responsive image size idarəsi
    const [imageSize, setImageSize] = useState({ width: 380, height: 400 });

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width < 640) {
                setImageSize({ width: 240, height: 260 });
            } else if (width < 768) {
                setImageSize({ width: 300, height: 320 });
            } else if (width < 1024) {
                setImageSize({ width: 340, height: 360 });
            } else {
                setImageSize({ width: 380, height: 547 });
            }
        };

        handleResize(); // ilk yüklənəndə ölçünü təyin et
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);



    const handleQtyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const number = Number(value);
        if (value === '') {
            setQty(1);
        } else if (number >= 1) {
            setQty(number);
        }
    };


    return (
        <div className={styles.products_detail}>
            <div className={styles.leftSide}>
                {/* Thumbnail list Swiper ilə yuxarıdan aşağı */}
                <div className="product-detail-swiper-wrapper w-full">
                    <button className="custom-swiper-prev">
                        <HiChevronUp size={60} color="black" />
                    </button>

                    <Swiper
                        direction="vertical"
                        slidesPerView={3}          // ✅ həmişə 3 thumbnail göstər
                        slidesPerGroup={1}         // ✅ 1 dənə sürüşdür
                        spaceBetween={10}          // ✅ 10px boşluq
                        navigation={{
                            prevEl: ".custom-swiper-prev",
                            nextEl: ".custom-swiper-next",
                        }}
                        allowTouchMove={false}     // ✅ maus ilə sürüşdürməyi blokla (istəyirsənsə)
                        modules={[Pagination, Navigation]}
                        className={`product-detail-swiper ${styles.thumbnails}`}
                        style={{ height: '400px', maxWidth: '95px' }}
                    >

                        {product.thumbnails?.map((thumb, i) => (
                            thumb?.trim() && (
                                <SwiperSlide key={i}>
                                    <Image
                                        src={thumb}
                                        alt={`thumb-${i}`}
                                        width={95}
                                        height={127}
                                        className={styles.thumbnailImage}
                                        onClick={() => setActiveImage(thumb)}
                                        style={{
                                            cursor: 'pointer',
                                            border: activeImage === thumb ? '2px solid black' : '1px solid #ccc',
                                            borderRadius: '6px',
                                        }}
                                    />
                                </SwiperSlide>
                            )
                        ))}
                    </Swiper>
                    <button className="custom-swiper-next">
                        <HiChevronDown size={60} color="black" />
                    </button>


                    {/* External Pagination div */}
                    {/* <div className="product-detail-pagination mt-2 flex justify-center"></div> */}

                </div>


                {/* Zoomed main image */}
                {activeImage && activeImage.trim() !== '' && (
                    <div className={styles.mainImage}>
                        <ImageMagnifier
                            src={activeImage}
                            width={imageSize.width}
                            height={imageSize.height}
                            zoom={2} // İstəyə görə 2x, 2.5x, 3x və s. artıra bilərsən
                        />
                    </div>
                )}


            </div>

            <div className={styles.rightSide}>
                <h2 className={styles.title}>{product.title}</h2>
                <p className={styles.desc}>{product.desc}</p>
                <p className={styles.price}>{product.price}</p>


                <div className={styles.colorRow}>
                    <span>
                        Rəng: {product.colors.map(clr => clr.name).join(', ')}
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
                            addToBag(product); // ✅ doğru obyekt
                            router.push(`/purchase`); // ✅ "İndi Al" kliklənəndə səbətə əlavə edib al səhifəsinə yönləndir
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
