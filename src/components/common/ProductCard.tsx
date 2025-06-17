'use client';
import { memo } from 'react';
import Image from 'next/image';
import { Heart } from 'lucide-react';
import { useFavorites } from '@/context/FavoritesContext';
import styles from '@/components/common/ProductCard.module.css';
import { Product } from '@/types/Product';
import useIsTouchDevice from '@/hooks/useIsTouchDevice';

type Props = {
    item: Product;
    isMostSales?: boolean;
    activeCategory?: string;
    activeCardId?: number | null;
    setActiveCardId?: (id: number | null) => void;
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
    const isActive = isTouch && activeCardId === item.id;
    const handleToggleDetails = () => {
        if (isTouch && setActiveCardId) {
            setActiveCardId(isActive ? null : item.id);
        }
    };


    const badge = isMostSales
        ? 'BEST'
        : activeCategory === 'new' && item.isNew
            ? 'NEW'
            : activeCategory === 'discount' && item.coupon > 0
                ? 'ENDİRİM'
                : activeCategory === 'all'
                    ? item.isNew
                        ? 'NEW'
                        : item.coupon > 0
                            ? 'ENDİRİM'
                            : null
                    : null;

    return (
        <div
            // onClick={isTouch ? handleToggleDetails : undefined}
            onTouchStart={isTouch ? handleToggleDetails : undefined}
            className={`${styles.cards} relative group rounded shadow text-center`}
        >
            <div className={`${styles.cards_image} relative mx-auto`}>
                <Image
                    src={item.image}
                    alt={item.title}
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
                {item.hoverImage && (
                    <Image
                        src={item.hoverImage}
                        alt={item.title}
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
                <h3 className="transition-all duration-700">{item.title}</h3>
                <p>{item.desc}</p>
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
                    <button>al</button>
                    <button>səbətə at</button>
                </div>
            </div>

            <div
                onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite({
                        id: item.id,
                        title: item.title,
                        price: Number(String(item.price).replace(/\D/g, '')),
                        image: item.image,
                        originalPrice: item.originalPrice,
                        coupon: item.coupon,
                    });
                }}
                className="absolute top-3 left-3 z-10 cursor-pointer"
            >
                {favorites.some((fav) => fav.id === item.id) ? (
                    <Heart fill="black" />
                ) : (
                    <Heart />
                )}
            </div>

            {badge && (
                <div
                    className={`
            ${styles.new_card}
            ${badge === 'BEST' ? styles.bestSpan : ''}
            ${badge === 'ENDİRİM' ? styles.discountBadge : ''}
            absolute top-3 right-3 z-10 cursor-pointer
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
