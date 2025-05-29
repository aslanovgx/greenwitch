"use client";
import React, { createContext, useContext, useState } from "react";
import { Product } from '@/types/Product';

// interface Product {
//   id: number;
//   title: string;
//   price: number;
//   image: string;
//   originalPrice?: number;
//   coupon?: number;
// }

interface FavoriteContextType {
  favorites: Product[];
  toggleFavorite: (product: Product) => void;
  removeFromFavorites: (id: number) => void;
  isFavorite: (id: number) => boolean;
}

const FavoriteContext = createContext<FavoriteContextType>({
  favorites: [],
  toggleFavorite: () => { },
  removeFromFavorites: () => { },
  isFavorite: () => false,
});

export const useFavorites = () => useContext(FavoriteContext);

export const FavoriteProvider = ({ children }: { children: React.ReactNode }) => {
  const [favorites, setFavorites] = useState<Product[]>([]);

  const toggleFavorite = (product: Product) => {
    setFavorites((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  const removeFromFavorites = (id: number) => {
    setFavorites((prev) => prev.filter((p) => p.id !== id));
  };

  const isFavorite = (id: number) => favorites.some((p) => p.id === id);

  return (
    <FavoriteContext.Provider value={{ favorites, toggleFavorite, removeFromFavorites, isFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};
