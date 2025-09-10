// components/ui/BagButton.tsx
"use client";
import { useBag } from "@/context/BagContext";
import { useEffect, useState } from "react";
import { PiBagLight } from "react-icons/pi";

export default function BagButton({ onClick }: { onClick: () => void }) {
  const { bagItems } = useBag();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const count = bagItems.length;

  return (
    <button onClick={onClick} className="relative bag-icon">
      <PiBagLight/>
      {mounted && count > 0 && (
        <span className="absolute -top-0 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center shadow">
          {count}
        </span>
      )}
    </button>
  );
}
