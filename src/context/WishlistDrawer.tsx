// components/WishlistDrawer.tsx
"use client";
import { useFavorites    } from "@/context/FavoritesContext";
import Image from "next/image";
import { X } from "lucide-react";

export default function WishlistDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const { favorites, removeFromFavorites } = useFavorites();

    if (!isOpen) return null;

    return (
        <div className="fixed top-0 right-0 h-full w-[350px] bg-white shadow-xl z-50 p-4 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Wishlist ({favorites.length})</h2>
                <button onClick={onClose} className="cursor-pointer">
                    <X />
                </button>
            </div>

            {favorites.length === 0 ? (
                <p>Wishlist boşdur.</p>
            ) : (
                favorites.map((product) => (
                    <div key={product.id} className="mb-4 border-b pb-2">
                        <Image src={product.image} alt={product.title} width={60} height={60} />
                        <div className="ml-2">
                            <p className="font-semibold">{product.title}</p>
                            {/* <p className="line-through text-sm text-gray-500">${product.originalPrice}</p> */}
                            <p className="text-red-500 font-bold">${product.price}</p>
                            {product.coupon && (
                                <span className="bg-orange-200 text-orange-700 text-xs px-2 py-1 rounded">
                                    ${product.coupon} coupon
                                </span>
                            )}
                            <button
                                className="text-sm text-red-500 mt-1 cursor-pointer"
                                onClick={() => removeFromFavorites(product.id)}
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}
