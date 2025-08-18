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
    activeCategory?: string;
    activeCardId?: number | null;
    setActiveCardId?: (id: number | null) => void;
};

// 🔑 şəkil URL helper funksiyası
// utils/getImageUrl.ts
export const getImageUrl = (path?: string) => {
    if (!path) return "/fallback.jpg"; // fallback şəkil
    if (path.startsWith("http")) return path; // əgər tam URL-dirsə
    if (path.startsWith("/")) {
        // məsələn "/images/products/..."
        return `${process.env.NEXT_PUBLIC_API_URL}${path}`;
    }
    // default: "images/products/..."
    return `${process.env.NEXT_PUBLIC_API_URL}/${path}`;
};




function ProductCardComponent({
    item,
    isMostSales = false,
    activeCategory = 'all',
    activeCardId,
    setActiveCardId,
}: Props) {
    const { favorites, toggleFavorite } = useFavorites();
    const isTouch = useIsTouchDevice();
    const router = useRouter();
    const isActive = isTouch && activeCardId === item.id;
    const { addToBag } = useBag();  // Burada

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

    const badge = isMostSales
        ? 'BEST'
        : activeCategory === 'discount' && item.discountPrice
            ? 'ENDİRİM'
            : null;


    return (
        <div
            onClick={handleClick}
            className={`${styles.cards} relative group rounded shadow text-center`}
        >
            <div className={`${styles.cards_image} relative mx-auto`}>
                <Image
                    src={getImageUrl(item.images?.[0])}
                    alt={item.name}
                    fill
                    loading="lazy"
                    className={`w-full h-full scale-105 transition-opacity duration-600 ${!isTouch
                        ? 'group-hover:opacity-0'
                        : isActive
                            ? 'opacity-0'
                            : 'opacity-100'
                        }`}
                    style={{ objectFit: 'cover' }}
                    unoptimized
                />
                {item.images?.[1] && (
                    <Image
                        src={getImageUrl(item.images[1])}
                        alt={item.name}
                        fill
                        loading="lazy"
                        className={`${styles.hoverImage} scale-95 w-full h-full absolute top-0 left-0 transition-opacity duration-700 ${!isTouch
                            ? 'opacity-0 group-hover:opacity-100'
                            : isActive
                                ? 'opacity-100'
                                : 'opacity-0'
                            }`}
                        style={{ objectFit: 'cover' }}
                        unoptimized
                    />
                )}
            </div>

            <div className={`${styles.cards_desc}`}>
                <h3 className="transition-all duration-700">{item.brandName}</h3>
                <p>{item.description}</p>
                <p
                    className={`${!isTouch
                        ? 'opacity-0 group-hover:opacity-100'
                        : isActive
                            ? 'opacity-100'
                            : 'opacity-0'
                        } transition-opacity duration-700 !font-bold`}
                >
                    {item.price}
                </p>
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
                    toggleFavorite({
                        id: item.id,
                        name: item.name,
                        brandName: item.brandName,
                        price: item.discountPrice && item.discountPrice > 0
                            ? item.discountPrice
                            : item.price,
                        discountPrice: item.discountPrice ?? 0, // null olsa 0 qoy
                        images: item.images,
                        colorNames: item.colorNames,
                    });

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
