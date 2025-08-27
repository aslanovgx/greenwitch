"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Product } from "@/types/Product";

interface FavoriteContextType {
  favorites: Product[];
  toggleFavorite: (product: Product) => void;
  removeFromFavorites: (id: number) => void;
  isFavorite: (id: number) => boolean;
}

const FavoriteContext = createContext<FavoriteContextType>({
  favorites: [],
  toggleFavorite: () => {},
  removeFromFavorites: () => {},
  isFavorite: () => false,
});

export const useFavorites = () => useContext(FavoriteContext);

// Köməkçi: boolean sahələri təhlükəsiz çevir
const toBool = (v: any) =>
  v === true || v === 1 || (typeof v === "string" && v.toLowerCase() === "true");

// Köməkçi: məhsulu normalizə et (şəkil, qiymət, boolean, s.)
function normalizeProduct(p: Product): Product {
  const images = Array.isArray(p.images)
    ? p.images.filter((x) => typeof x === "string" && x.trim() !== "")
    : [];

  return {
    ...p,
    name: p.name ?? (p as any).title ?? "",
    description: p.description ?? "",
    images,
    price: Number(p.price ?? 0),
    discountPrice:
      typeof p.discountPrice === "number" ? p.discountPrice : null,
    bestSeller: toBool((p as any).bestSeller ?? false),
    isNew: toBool((p as any).isNew ?? false),
    brandName: p.brandName ?? "",
  };
}

export const FavoriteProvider = ({ children }: { children: React.ReactNode }) => {
  const [favorites, setFavorites] = useState<Product[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("favorites");
      if (stored) setFavorites(JSON.parse(stored));
    } catch {
      localStorage.removeItem("favorites");
      setFavorites([]);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    } catch {}
  }, [favorites]);

  const toggleFavorite = (product: Product) => {
    const normalized = normalizeProduct(product);
    setFavorites((prev) => {
      const exists = prev.some((p) => p.id === normalized.id);
      return exists ? prev.filter((p) => p.id !== normalized.id) : [...prev, normalized];
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
