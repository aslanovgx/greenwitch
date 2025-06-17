'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Heart } from 'lucide-react';
import { useFavorites } from '@/context/FavoritesContext';
import styles from '@/components/common/ProductCard.module.css';
import { Product } from '@/types/Product';
import useIsTouchDevice from '@/hooks/useIsTouchDevice';

export default function ProductCard({ item, isMostSales = false }: { item: Product, isMostSales?: boolean }) {
    const { favorites, toggleFavorite } = useFavorites();
    const isTouch = useIsTouchDevice();
    const [showDetails, setShowDetails] = useState(false);
    const handleToggleDetails = () => {
        if (isTouch) {
            setShowDetails(prev => !prev);
        }
    };
    return (
        <div
            key={item.id}
            onClick={isTouch ? handleToggleDetails : undefined}
            className={`${styles.cards} relative group rounded shadow text-center`}
        >
            <div className={`${styles.cards_image} relative mx-auto`}>
                <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className={`w-full h-full scale-105 transition-opacity duration-600 ${!isTouch ? 'group-hover:opacity-0' : ''}`}
                    style={{ objectFit: 'cover' }}
                />
                {item.hoverImage && (
                    <Image
                        src={item.hoverImage}
                        alt={item.title}
                        fill
                        className={`${styles.hoverImage} scale-95 w-full h-full absolute top-0 left-0 opacity-0 transition-opacity duration-700 ${!isTouch ? 'group-hover:opacity-100' : ''}`}
                        style={{ objectFit: 'cover' }}
                    />
                )}
            </div>

            <div className={`${styles.cards_desc}`}>
                <h3 className="transition-all duration-700 ">{item.title}</h3>
                <p>{item.desc}</p>
                <p className={`${!isTouch ? 'opacity-0 group-hover:opacity-100' : showDetails ? 'opacity-100' : 'opacity-0'} transition-opacity duration-700 !font-bold`}>
                    {item.price}
                </p>
                <div className={`${styles.card_buttons}
                 absolute bottom-0 left-0 flex 
             transition-opacity duration-700
                  ${!isTouch
                        ? 'opacity-0 group-hover:opacity-100'
                        : showDetails
                            ? 'opacity-100'
                            : 'opacity-0'}
                 `}>
                    <button>al</button>
                    <button>səbətə at</button>
                </div>
            </div>

            <div
                onClick={(e) => {
                    e.stopPropagation(); // favoriti click edəndə card açılmasın
                    toggleFavorite({
                        id: item.id,
                        title: item.title,
                        price: Number(String(item.price).replace(/\D/g, '')),
                        image: item.image,
                        originalPrice: item.originalPrice,
                        coupon: item.coupon,
                    })
                }}
                className="absolute top-3 left-3 z-10 cursor-pointer"
            >
                {favorites.some((fav) => fav.id === item.id) ? <Heart fill="black" /> : <Heart />}
            </div>

            <div className={`${styles.new_card} ${isMostSales ? styles.bestSpan : ''
                } absolute top-3 right-3 z-10 cursor-pointer`}>
                <span>
                    {isMostSales ? 'BEST' : 'NEW'}
                </span>
            </div>
        </div>
    );
}
