'use client';
import { memo } from 'react';
import Image from 'next/image';
import { Heart } from 'lucide-react';
import { useFavorites } from '@/context/FavoritesContext';
import { useRouter } from 'next/navigation';
import styles from '@/components/common/ProductCard.module.css';
import { Product } from '@/types/Product';
import useIsTouchDevice from '@/hooks/useIsTouchDevice';
import { useBag } from "@/context/BagContext";
type Props = {
    item: Product;
    isMostSales?: boolean;
    forceBestBadge?: boolean;
    activeCategory?: string;
    activeCardId?: number | null;
    setActiveCardId?: (id: number | null) => void;
};

function ProductCardComponent({
    item,
    forceBestBadge = false,
    activeCategory = 'all',
    activeCardId,
    setActiveCardId,
}: Props) {
    const { favorites, toggleFavorite } = useFavorites();
    const isTouch = useIsTouchDevice();
    const router = useRouter();
    const isActive = isTouch && activeCardId === item.id;
    const { addToBag } = useBag();  // Burada

    const cover = item.images?.[0] ?? "/assets/placeholders/product.png";
    const hover = item.images?.[1] ?? null;


    const handleClick = () => {
        if (isTouch && setActiveCardId) {
            if (activeCardId !== item.id) {
                setActiveCardId(item.id); // İlk klik: sadəcə hover aç
            } else {
                router.push(`/products/${item.id}`); // İkinci klik: keçid et
            }
        } else {
            router.push(`/products/${item.id}`); // Desktop: birbaşa keçid
        }
    };


    const hasDiscount =
        typeof item.discountPrice === "number" && item.discountPrice < item.price;

    const badge = forceBestBadge
        ? "BEST"
        : activeCategory === "discount" && hasDiscount
            ? "ENDİRİM"
            : activeCategory === "all"
                ? hasDiscount
                    ? "ENDİRİM"
                    : item.bestSeller
                        ? "BEST"
                        : item.isNew
                            ? "NEW"
                            : null
                : activeCategory === "new" && item.isNew
                    ? "NEW"
                    : activeCategory === "best" && item.bestSeller
                        ? "BEST"
                        : null;
    return (
        <div
            onClick={handleClick}
            className={`${styles.cards} relative group rounded shadow text-center`}
        >
            <div className={`${styles.cards_image} relative mx-auto`}>
                <Image
                    src={cover}
                    alt={item.name || "Product image"}
                    fill
                    loading="lazy"
                    className={`w-full h-full scale-105 transition-opacity duration-600 ${!isTouch
                        ? 'group-hover:opacity-0'
                        : isActive
                            ? 'opacity-0'
                            : 'opacity-100'
                        }`}
                    style={{ objectFit: 'cover' }}
                />
                {hover && (
                    <Image
                        src={hover}
                        alt={item.name || "Product image"}
                        fill
                        loading="lazy"
                        className={`${styles.hoverImage} scale-95 w-full h-full absolute top-0 left-0 transition-opacity duration-700 ${!isTouch
                            ? 'opacity-0 group-hover:opacity-100'
                            : isActive
                                ? 'opacity-100'
                                : 'opacity-0'
                            }`}
                        style={{ objectFit: 'cover' }}
                    />
                )}
            </div>

            <div className={`${styles.cards_desc}`}>
                <h3 className="transition-all duration-700">{item.name}</h3>
                <p>{item.description}</p>
                {item.discountPrice && item.discountPrice < item.price ? (
                    <div className="flex gap-2 justify-center">
                        <p
                            className={`${!isTouch
                                ? 'opacity-0 group-hover:opacity-100'
                                : isActive
                                    ? 'opacity-100'
                                    : 'opacity-0'
                                } transition-opacity duration-700 !font-bold ${styles.normalPrice}`}
                        >
                            {item.price} AZN
                        </p>
                        <p
                            className={`${!isTouch
                                ? 'opacity-0 group-hover:opacity-100'
                                : isActive
                                    ? 'opacity-100'
                                    : 'opacity-0'
                                } transition-opacity duration-700 !font-bold ${styles.discountPrice}`}
                        >
                            {item.discountPrice} AZN
                        </p>
                    </div>
                ) : (
                    <p
                        className={`${!isTouch
                            ? 'opacity-0 group-hover:opacity-100'
                            : isActive
                                ? 'opacity-100'
                                : 'opacity-0'
                            } transition-opacity duration-700 !font-bold`}
                    >
                        {item.price} AZN
                    </p>
                )}

                <div
                    className={`${styles.card_buttons} absolute bottom-0 left-0 flex transition-opacity duration-700 ${!isTouch
                        ? 'opacity-0 group-hover:opacity-100'
                        : isActive
                            ? 'opacity-100'
                            : 'opacity-0'
                        }`}
                >
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            addToBag(item);
                            router.push(`/purchase`); // 👈 al səhifəsinə keçid
                            // router.push(`/al/${item.id}`); // 👈 al səhifəsinə keçid
                        }}
                    >
                        al
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            addToBag(item);  // Burada səbətə əlavə et
                            // İstəsən toast və ya alert də göstərə bilərsən
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

            {badge && (
                <div
                    className={`
            ${styles.new_card}
            ${badge === 'BEST' ? styles.bestSpan : ''}
            ${badge === 'ENDİRİM' ? styles.discountBadge : ''}
            absolute top-3 left-3 z-10 cursor-pointer
          `}
                >
                    <span>{badge}</span>
                </div>
            )}
        </div>
    );
}

const ProductCard = memo(ProductCardComponent);
export default ProductCard;
