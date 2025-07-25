// components/WishlistDrawer.tsx
"use client";
import { useFavorites } from "@/context/FavoritesContext";
import Image from "next/image";
import { X } from "lucide-react";

export default function WishlistDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const { favorites, removeFromFavorites } = useFavorites();

    if (!isOpen) return null;

    return (
        <div className="fixed top-0 right-0 h-full w-[350px] bg-white shadow-xl z-50 p-4 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Favoritlər ({favorites.length})</h2>
                <button onClick={onClose} className="cursor-pointer">
                    <X />
                </button>
            </div>

            {
                favorites.length === 0 ? (
                    <p>Favoritlər boşdur.</p>
                ) : (
                    favorites.map((product) => (
                        <div key={product.id} className="mb-4 border-b pb-4 flex items-center gap-3">
                            <Image src={product.image} alt={product.title} width={60} height={60} className="rounded object-cover" />
                            <div className="flex-1">
                                <p className="font-semibold text-sm uppercase">{product.title}</p>
                                <p className="text-red-950 font-bold text-sm">{product.price} AZN</p>
                                {Number(product.coupon) > 0 ? (
                                    <span className="bg-orange-200 text-orange-700 text-xs px-2 py-1 rounded">
                                        {product.coupon} AZN endirim
                                    </span>
                                ) : (
                                    <span className="text-gray-400 text-xs"></span>
                                )}
                                {/* {product.coupon && (
                                <span className="bg-orange-200 text-orange-700 text-xs px-2 py-1 rounded">
                                    {product.coupon} AZN endirim
                                </span>
                            )} */}
                            </div>
                            <button
                                className="text-xs text-white cursor-pointer bg-red-600 px-2 py-1 rounded hover:bg-red-700 "
                                onClick={() => removeFromFavorites(product.id)}
                            >
                                Sil
                            </button>
                        </div>

                    ))
                )
            }
        </div >
    );
}
