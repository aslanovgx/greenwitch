'use client';
import { memo, useEffect, useState } from 'react';
import Image from 'next/image';
import useLabelColors from "@/hooks/useLabelColors";
import { Heart } from 'lucide-react';
import { useFavorites } from '@/context/FavoritesContext';
import { useRouter } from 'next/navigation';
import styles from '@/components/common/ProductCard.module.css';
import { Product } from '@/types/Product';
import useIsTouchDevice from '@/hooks/useIsTouchDevice';
import { useBag } from "@/context/BagContext"


type Props = {
  item: Product;
  isMostSales?: boolean;
  // forceBestBadge?: boolean;
  activeCategory?: string;
  activeCardId?: number | null;
  setActiveCardId?: (id: number | null) => void;
};

function ProductCardComponent({
  item,
  // forceBestBadge = false,
  activeCategory = 'all',
  activeCardId,
  setActiveCardId,
}: Props) {
  const { favorites, toggleFavorite } = useFavorites();
  const router = useRouter();
  const { addToBag } = useBag();

  // ✅ SSR/CSR fərqini bağlamaq üçün
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isTouch = useIsTouchDevice();
  const isActive = isTouch && activeCardId === item.id;

  const cover = item.images?.[0] ?? "/assets/placeholders/product.png";
  const hover = item.images?.[1] ?? null;

  const handleClick = () => {
    if (isTouch && setActiveCardId) {
      if (activeCardId !== item.id) {
        setActiveCardId(item.id);     // İlk klik: hover aç
      } else {
        router.push(`/products/${item.id}`); // İkinci klik: keçid
      }
    } else {
      router.push(`/products/${item.id}`);   // Desktop: birbaşa keçid
    }
  };

  const { colors, loading } = useLabelColors();

  // 1) Endirim var?
  const hasDiscount =
    typeof item.discountPrice === "number" && item.discountPrice < item.price;

  // 2) Badge seçimi
  const badge =
    activeCategory === "discount"
      ? (hasDiscount ? "ENDİRİM" : null)                 // endirim səhifəsində həmişə ENDİRİM
      : activeCategory === "new"
        ? (item.isNew ? "NEW" : null)                      // yeni səhifəsində həmişə NEW
        : activeCategory === "best"
          ? (item.bestSeller ? "BEST" : null)                // best səhifəsində həmişə BEST
          : /* activeCategory === "all" */
          (hasDiscount ? "ENDİRİM"                         // ümumi siyahıda prioritet: ENDİRİM → BEST → NEW
            : item.bestSeller ? "BEST"
              : item.isNew ? "NEW"
                : null);


  // 3) Badge → type (1=BEST, 2=NEW, 3=ENDİRİM)
  const badgeType: 1 | 2 | 3 | null =
    badge === "BEST" ? 1 : badge === "NEW" ? 2 : badge === "ENDİRİM" ? 3 : null;

  // 4) Admin rəngi
  const colorByBadge: Record<"BEST" | "NEW" | "ENDİRİM", string | undefined> = {
    BEST: colors[1],     // 1 → BEST
    NEW: colors[2],      // 2 → NEW
    ENDİRİM: colors[3],  // 3 → ENDİRİM
  };
  const badgeColor = badge ? colorByBadge[badge as "BEST" | "NEW" | "ENDİRİM"] : undefined;

  // 5) Mətn kontrastı
  const pickText = (hex?: string) => {
    if (!hex) return "#000";
    const h = hex.replace("#", "");
    const r = parseInt(h.substring(0, 2), 16);
    const g = parseInt(h.substring(2, 4), 16);
    const b = parseInt(h.substring(4, 6), 16);
    const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
    return luminance > 186 ? "#000" : "#fff";
  };

  // 6) Overlay + base rəngi birləşdirən helper
  const getBadgeBg = (base: string) =>
    `linear-gradient(
      222deg,
      rgba(255,255,255,0.70) 10%,
      rgba(255,255,255,0.30) 35%,
      rgba(255,255,255,0.90) 46%,
      rgba(255,255,255,0.20) 62%
    ), ${base}`;

  if (process.env.NODE_ENV !== "production") {
    console.log("LabelColors:", { colors, loading, badgeType, badgeColor });
  }

  // ✅ Badge-in SSR/CSR uyğunsuzluğunu önləmək üçün yalnız hazır olanda göstər
  const badgeReady = mounted && !!badge && !loading && typeof badgeColor === 'string' && badgeColor.length > 0;

  return (
    <div onClick={handleClick} className={`${styles.cards} relative group rounded shadow text-center`}>
      <div className={`${styles.cards_image} relative mx-auto`}>
        <Image
          src={cover}
          alt={item.name || "Product image"}
          fill
          loading="lazy"
          className={`w-full h-full  transition-opacity duration-600 ${!isTouch ? 'group-hover:opacity-0' : (isActive ? 'opacity-0' : 'opacity-100')
            }`}
          style={{ objectFit: 'contain' }}
        />
        {hover && (
          <Image
            src={hover}
            alt={item.name || "Product image"}
            fill
            loading="lazy"
            className={`${styles.hoverImage}  w-full h-full absolute top-0 left-0 transition-opacity duration-700 ${!isTouch ? 'opacity-0 group-hover:opacity-100' : (isActive ? 'opacity-100' : 'opacity-0')
              }`}
            style={{ objectFit: 'contain' }}
          />
        )}
      </div>

      <div className={`${styles.cards_desc}`}>
        <h3 className="transition-all duration-700">{item.brandName}</h3>
        <p className="clampText">{item.description}</p>

        {hasDiscount ? (
          <div className="flex gap-2 justify-center">
            <p className={`${!isTouch ? 'opacity-0 group-hover:opacity-100' : (isActive ? 'opacity-100' : 'opacity-0')} transition-opacity duration-700 !font-bold ${styles.normalPrice}`}>
              {item.price} AZN
            </p>
            <p className={`${!isTouch ? 'opacity-0 group-hover:opacity-100' : (isActive ? 'opacity-100' : 'opacity-0')} transition-opacity duration-700 !font-bold ${styles.discountPrice}`}>
              {item.discountPrice} AZN
            </p>
          </div>
        ) : (
          <p className={`${!isTouch ? 'opacity-0 group-hover:opacity-100' : (isActive ? 'opacity-100' : 'opacity-0')} transition-opacity duration-700 !font-bold`}>
            {item.price} AZN
          </p>
        )}

        <div
          className={`${styles.card_buttons} absolute bottom-0 left-0 flex transition-opacity duration-700 ${!isTouch ? 'opacity-0 group-hover:opacity-100' : (isActive ? 'opacity-100' : 'opacity-0')
            }`}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToBag(item);
              router.push(`/purchase`);
            }}
          >
            al
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToBag(item);
            }}
          >
            səbətə at
          </button>
        </div>
      </div>

      <div
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite(item);
        }}
        className={`absolute top-3 right-3 z-10 cursor-pointer`}
      >
        {favorites.some((fav) => fav.id === item.id) ? (
          <Heart fill="black" className={styles.heartIcon} />
        ) : (
          <Heart className={styles.heartIcon} />
        )}
      </div>

      {badgeReady && (
        <div
          className={`${styles.new_card} ${badge === 'ENDİRİM' ? styles.discountBadge : ''} absolute top-3 left-3 cursor-default`}
          style={{
            background: getBadgeBg(badgeColor!),
            color: pickText(badgeColor),
            border: "1px solid rgba(0,0,0,0.06)",
          }}
          suppressHydrationWarning
        >
          <span>{badge}</span>
        </div>
      )}
    </div>
  );
}

const ProductCard = memo(ProductCardComponent);
export default ProductCard;
