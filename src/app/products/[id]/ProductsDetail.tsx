"use client";
import { useState, useEffect, useRef, useMemo } from "react";
import styles from "./ProductsDetail.module.css";
import type { ProductDetail } from "@/lib/api/products";
import Image from "next/image";
import ImageMagnifierBG from "@/components/magnifier/ImageMagnifierBG";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";
import { useBag } from "@/context/BagContext";
import type { Swiper as SwiperClass } from "swiper";
import type { SwiperOptions, NavigationOptions } from "swiper/types";

// —— Breakpoint-lar
const BP_SM = 640;
const BP_MD = 769;
const BP_LG = 1025;

// —— Ölçü helper-ləri
const getImageSizeByWidth = (width: number) => {
  if (width < BP_SM) return { width: 360, height: 420 } as const;
  if (width < BP_MD) return { width: 200, height: 300 } as const;
  if (width < BP_LG) return { width: 270, height: 388 } as const;
  return { width: 380, height: 547 } as const;
};

const getThumbsConfigByWidth = (width: number) => {
  if (width < BP_SM) return { slidesPerView: 4, height: 280, width: 75 } as const;
  if (width < BP_MD) return { slidesPerView: 4, height: 300, width: 80 } as const;
  if (width < BP_LG) return { slidesPerView: 4, height: 390, width: 67 } as const;
  return { slidesPerView: 4, height: 538, width: 95 } as const;
};

// —— İlk düzgün thumbnail-i tapır
const firstThumb = (p: ProductDetail) => p.thumbnails?.find((t) => t && t.trim()) || null;

// —— Thumbnail sütunu üçün sabitlər (Swiper hündürlüyü)
const THUMB_H = 127;
const GAP = 10;
const calcThumbsHeight = (slides: number) => slides * THUMB_H + (slides - 1) * GAP;

type Props = { product: ProductDetail };

// Swiper Navigation üçün tip
type NavParams = NavigationOptions & {
  prevEl?: HTMLElement | null;
  nextEl?: HTMLElement | null;
};

function ensureNav(swiper: SwiperClass): NavParams {
  const p = (swiper.params as SwiperOptions) ?? ({} as SwiperOptions);
  swiper.params = p; // run-time genişləndirmə
  if (!p.navigation || typeof p.navigation === "boolean") {
    p.navigation = {} as NavigationOptions; // tipli quruluş
  }
  return p.navigation as NavParams;
}

export default function ProductsDetail({ product }: Props) {
  // ——— State
  const [activeImage, setActiveImage] = useState<string | null>(() => firstThumb(product));

  useEffect(() => {
    setActiveImage(firstThumb(product));
  }, [product]);

  const [qtyRaw, setQtyRaw] = useState("1");
  const qty = useMemo(() => Math.max(1, Number(qtyRaw || "1")), [qtyRaw]);

  const router = useRouter();
  const { addToBag } = useBag();

  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);
  const swiperRef = useRef<SwiperClass | null>(null);

  const [showMobileSlider, setShowMobileSlider] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  const [imageSize, setImageSize] = useState(() =>
    getImageSizeByWidth(typeof window !== "undefined" ? window.innerWidth : BP_LG)
  );
  const [thumbsConfig, setThumbsConfig] = useState(() =>
    getThumbsConfigByWidth(typeof window !== "undefined" ? window.innerWidth : BP_LG)
  );

  // valid thumbnail-lar
  const validThumbs = useMemo(
    () => (product.thumbnails ?? []).filter((t) => t && t.trim()),
    [product.thumbnails]
  );
  const shouldShowNav = validThumbs.length > thumbsConfig.slidesPerView;

  // ——— Resize throttling (rAF)
  useEffect(() => {
    let raf = 0;
    const onResize = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const width = window.innerWidth;
        setShowMobileSlider(width < BP_SM);
        setImageSize(getImageSizeByWidth(width));
        setThumbsConfig(getThumbsConfigByWidth(width));
      });
    };

    setHasMounted(true);
    onResize();
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // ——— Swiper clean-up
  useEffect(() => () => {
    if (swiperRef.current && !swiperRef.current.destroyed) {
      swiperRef.current.destroy(true, false);
    }
  }, []);

  // ——— shouldShowNav/layout dəyişəndə yenilə
  useEffect(() => {
    const s = swiperRef.current;
    const prev = prevRef.current;
    const next = nextRef.current;
    if (!s) return;

    if (!shouldShowNav) {
      // naviqasiyanı dayandır, swiper-i yenilə
      try { s.navigation?.destroy?.(); } catch {}
      try { s.update?.(); } catch {}
      return;
    }

    // ——— Təhlükəsiz: params/navigation qurulması helper ilə
    const nav = ensureNav(s);
    nav.prevEl = prev ?? undefined;
    nav.nextEl = next ?? undefined;
    nav.enabled = true;

    try {
      s.navigation?.destroy?.(); // təmiz start üçün
    } catch {}
    try {
      s.navigation?.init?.();
      s.navigation?.update?.();
    } catch {}
    try { s.update?.(); } catch {}
  }, [shouldShowNav, thumbsConfig.slidesPerView, validThumbs.length]);

  // ——— Mount guard
  if (!hasMounted) return <div style={{ minHeight: 400 }} />;

  // —— Endirim helper-ləri
  const basePrice = Number(product.price ?? 0);
  const dp =
    typeof product.discountPrice === "number"
      ? product.discountPrice
      : null;
  const hasDiscount = typeof dp === "number" && dp < basePrice;
  const discountPct = hasDiscount ? Math.round(((basePrice - (dp as number)) / basePrice) * 100) : 0;

  return (
    <div className={styles.products_detail}>
      <div className={styles.leftSide}>
        {showMobileSlider ? (
          <Swiper
            key={String(product.id)}
            slidesPerView={1}
            spaceBetween={8}
            pagination={{ clickable: true }}
            modules={[Pagination]}
            className={styles.mobileImageSlider}
            initialSlide={Math.max(0, product.thumbnails?.findIndex((t) => t === activeImage) ?? 0)}
            onSlideChange={(swiper) => {
              const newImage = product.thumbnails?.[swiper.activeIndex];
              if (newImage) setActiveImage(newImage);
            }}
          >
            {product.thumbnails?.map((thumb, idx) =>
              thumb?.trim() ? (
                <SwiperSlide key={thumb || idx}>
                  <Image
                    src={thumb}
                    alt={`${product.brandName}, ${product.name} — şəkil ${idx + 1}`}
                    width={imageSize.width}
                    height={imageSize.height}
                    priority={idx === 0}
                    loading={idx === 0 ? "eager" : "lazy"}
                    className={styles.mainImageMobile}
                    style={{ objectFit: "contain", borderRadius: 8 }}
                  />
                </SwiperSlide>
              ) : null
            )}
          </Swiper>
        ) : (
          <>
            <div className="product-detail-swiper-wrapper w-full relative">
              {shouldShowNav && (
                <button
                  ref={prevRef}
                  className={styles.swiperPrev}
                  aria-label="Əvvəlki şəkillər"
                  type="button"
                >
                  <FiChevronUp color="black" />
                </button>
              )}

              <Swiper
                key={`thumbs-${product.id}`} // sabit key
                direction="vertical"
                slidesPerView={thumbsConfig.slidesPerView}
                slidesPerGroup={1}
                spaceBetween={GAP}
                allowTouchMove={false}
                modules={[Pagination, Navigation]}
                className={`product-detail-swiper ${styles.thumbnails}`}
                style={{
                  // hündürlük formulla: 4 slide üçün 538px
                  height: `${calcThumbsHeight(thumbsConfig.slidesPerView)}px`,
                  maxWidth: `${thumbsConfig.width}px`,
                }}
                // navigation prop YOXDUR — param-ları özümüz yazırıq
                onBeforeInit={(swiper) => {
                  const nav = ensureNav(swiper);
                  if (shouldShowNav) {
                    nav.prevEl = prevRef.current ?? undefined;
                    nav.nextEl = nextRef.current ?? undefined;
                    nav.enabled = true;
                  }
                }}
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;

                  // Bir "tick" gecikdirib, yenə də guard-larla init et
                  setTimeout(() => {
                    if (!shouldShowNav) {
                      try { swiper.update?.(); } catch {}
                      return;
                    }

                    const nav = ensureNav(swiper);
                    nav.prevEl = prevRef.current ?? undefined;
                    nav.nextEl = nextRef.current ?? undefined;
                    nav.enabled = true;

                    if (swiper.navigation) {
                      try {
                        swiper.navigation.init();
                        swiper.navigation.update();
                      } catch { /* noop */ }
                    }

                    try { swiper.update?.(); } catch { /* noop */ }
                  }, 0);
                }}
                watchSlidesProgress
                observeParents
                observeSlideChildren
                resizeObserver
              >
                {validThumbs.map((thumb, idx) => (
                  <SwiperSlide key={thumb || idx}>
                    <Image
                      src={thumb}
                      alt={`${product.brandName}, ${product.name} — thumbnail ${idx + 1}`}
                      width={95}
                      height={THUMB_H}
                      className={styles.thumbnailImage}
                      onClick={() => setActiveImage(thumb)}
                      role="button"
                      aria-pressed={activeImage === thumb}
                      style={{
                        cursor: "pointer",
                        border: activeImage === thumb ? "2px solid black" : "1px solid #ccc",
                        borderRadius: 6,
                      }}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>

              {shouldShowNav && (
                <button
                  ref={nextRef}
                  className={styles.swiperNext}
                  aria-label="Növbəti şəkillər"
                  type="button"
                >
                  <FiChevronDown color="black" />
                </button>
              )}
            </div>

            {activeImage && (
              <div className={styles.mainImage}>
                <ImageMagnifierBG
                  src={activeImage}
                  width={imageSize.width}
                  height={imageSize.height}
                  zoom={1.8}
                  isRound={false}
                  hiResSrc={`/api/proxy-image?url=${encodeURIComponent(activeImage)}`}
                />
              </div>
            )}
          </>
        )}
      </div>

      <div className={styles.rightSide}>
        <h1 className={styles.title}>{product.brandName}</h1>

        {product.description && (
          <p className={`${styles.desc} ${styles.descLong}`}>
            {product.description} - {product.name}
          </p>
        )}

        {[
          { label: "Cins", value: product.genderName },
          { label: "Şüşə", value: product.siferblatMaterialName },
          { label: "Material", value: product.materialName },
          { label: "Mexanizm", value: product.mechanismName },
          {
            label: "Suyadavamlılıq",
            value: product.waterResistanceAtm ? `${product.waterResistanceAtm} ATM` : undefined,
          },
          {
            label: "Korpus ölçüsü",
            value: product.caseSizeMm ? `${product.caseSizeMm}mm` : undefined,
          },
          {
            label: "Qiyməti",
            value: hasDiscount ? (
              <span className={styles.priceWrapper}>
                <span className={styles.priceOld} aria-label={`Köhnə qiymət ${basePrice} AZN`}>
                  {basePrice}AZN
                </span>
                <span className={styles.priceNew} aria-label={`Endirimli qiymət ${dp} AZN`}>
                  {dp}AZN
                </span>
                <span className={styles.desc_badge} aria-label={`Endirim faizi ${discountPct}%`}>
                  -{discountPct}%
                </span>
              </span>
            ) : (
              <span className={styles.priceWrapper}>
                <span className={styles.priceSingle} aria-label={`Qiymət ${product.price} AZN`}>
                  {product.price}AZN
                </span>
              </span>
            ),
          },
        ]
          .filter((row) => row.value)
          .map((row) => (
            <p key={row.label} className={styles.desc}>
              <span>{row.label}: </span>
              {row.value}
            </p>
          ))}

        <p className={`${styles.desc} ${styles.descInfo}`}>100% Original / 2 il Zəmanətli</p>

        <div className={styles.buyRow}>
          <input
            type="number"
            min={1}
            step={1}
            className={styles.qtyInput}
            value={qtyRaw}
            onChange={(e) => setQtyRaw(e.target.value)}
            onBlur={() => setQtyRaw(String(qty))}
            aria-label="Miqdar"
          />

          <button
            className={styles.buyButton}
            onClick={async (e) => {
              e.stopPropagation();

              type AddToBagArg = Parameters<typeof addToBag>[0];
              const price =
                typeof product.price === "number"
                  ? product.price
                  : Number.isFinite(Number(product.price))
                    ? Number(product.price)
                    : 0;

              const bagItem: AddToBagArg = {
                id: product.id,
                name: product.name ?? "",
                description: product.description ?? "",
                bestSeller: false,
                isNew: false,
                price,
                discountPrice: hasDiscount ? dp : null,
                brandName: product.brandName ?? "",
                images: product.thumbnails || [],
                image: product.thumbnails?.[0] || null,
                thumbnails: product.thumbnails || [],
                title: product.name ?? undefined,
                desc: product.description ?? undefined,
                quantity: qty,
              };

              await Promise.resolve(addToBag(bagItem));
              router.push(`/purchase`);
            }}
            type="button"
            aria-label="İndi al"
          >
            İndi Al
          </button>
        </div>
      </div>
    </div>
  );
}
