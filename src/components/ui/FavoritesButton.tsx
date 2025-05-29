// components/ui/FavoritesButton.tsx
"use client";
import Image from "next/image";
import { useFavorites } from "@/context/FavoritesContext";

export default function FavoritesButton({ onClick }: { onClick: () => void }) {
    const { favorites } = useFavorites();

    return (
        <button onClick={onClick} className="relative">
            <Image
                src={"/assets/icons/heart.svg"}
                alt="heart-icon"
                width={30}
                height={30}
                className="object-contain"
            />
            {/* <Heart className="w-[30px] h-[30px] font-light cursor-pointer" /> */}
            {favorites.length > 0 && (
                <span className="absolute -top-0 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center shadow">
                    {favorites.length}
                </span>
            )}
        </button>
    );
}
