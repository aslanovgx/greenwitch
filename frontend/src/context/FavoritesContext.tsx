"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { FavoriteItem } from "@/types/FavoriteItem"; // ← yeni tip

interface FavoriteContextType {
  favorites: FavoriteItem[];
  toggleFavorite: (product: FavoriteItem) => void;
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
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (product: FavoriteItem) => {
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
    <FavoriteContext.Provider
      value={{ favorites, toggleFavorite, removeFromFavorites, isFavorite }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};
