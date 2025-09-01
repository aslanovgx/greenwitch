// components/WishlistDrawer.tsx
"use client";
import { useFavorites } from "@/context/FavoritesContext";
import Image from "next/image";
import { X } from "lucide-react";
import type { Product } from "@/types/Product";

export default function WishlistDrawer({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { favorites, removeFromFavorites } = useFavorites();
  if (!isOpen) return null;

  const hasDiscount = (p: Product): boolean =>
    typeof p.discountPrice === "number" && p.discountPrice < p.price;


  return (
    <div className="fixed top-0 right-0 h-full w-[350px] bg-white shadow-xl z-50 p-4 overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Favoritlər ({favorites.length})</h2>
        <button onClick={onClose} className="cursor-pointer">
          <X />
        </button>
      </div>

      {favorites.length === 0 ? (
        <p>Favoritlər boşdur.</p>
      ) : (
        favorites.map((product) => (
          <div key={product.id} className="mb-4 border-b pb-4 flex items-center gap-3">
            <Image
              src={product.images?.[0] ?? "/assets/placeholders/product.png"}
              alt={product.name ?? "Product"}
              width={60}
              height={60}
              className="rounded w-[60px] h-[60px] object-contain"
            />
            <div className="flex-1">
              <p className="font-semibold text-sm uppercase">
                {product.name}
              </p>

              {/* Endirim vizualı */}
              {hasDiscount(product) ? (
                <div className="flex items-center gap-2">
                  <span className="line-through opacity-60 text-sm">
                    {Number(product.price).toFixed(2)} AZN
                  </span>
                  <span className="text-red-950 font-bold text-sm">
                    {Number(product.discountPrice).toFixed(2)} AZN
                  </span>
                </div>
              ) : (
                <p className="text-red-950 font-bold text-sm">
                  {Number(product.price ?? 0).toFixed(2)} AZN
                </p>
              )}
            </div>

            <button
              className="text-xs text-white cursor-pointer bg-red-600 px-2 py-1 rounded hover:bg-red-700"
              onClick={() => removeFromFavorites(product.id)}
            >
              Sil
            </button>
          </div>
        ))
      )}
    </div>
  );
}
