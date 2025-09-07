// components/ui/FavoritesButton.tsx
"use client";
import Image from "next/image";
import { useFavorites } from "@/context/FavoritesContext";
import { useEffect, useState } from "react";

export default function FavoritesButton({ onClick }: { onClick: () => void }) {
  const { favorites } = useFavorites();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const count = favorites.length;

  return (
    <button onClick={onClick} className="relative">
      <Image
        src={"/assets/icons/heart3.svg"}
        alt="heart-icon"
        width={30}
        height={30}
        className="object-contain"
      />
      {mounted && count > 0 && (
        <span className="absolute -top-0 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center shadow">
          {count}
        </span>
      )}
    </button>
  );
}
