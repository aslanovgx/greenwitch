// components/ui/BagButton.tsx
"use client";
import Image from "next/image";
import { useBag } from "@/context/BagContext";
import { useEffect, useState } from "react";

export default function BagButton({ onClick }: { onClick: () => void }) {
  const { bagItems } = useBag();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const count = bagItems.length;

  return (
    <button onClick={onClick} className="relative bag-icon">
      <Image
        src={"/assets/icons/bag3.svg"}
        alt="shopping-icon"
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
