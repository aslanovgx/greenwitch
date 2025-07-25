// components/ui/BagButton.tsx
"use client";

import Image from "next/image";
import { useBag } from "@/context/BagContext";

export default function BagButton({ onClick }: { onClick: () => void }) {
    const { bagItems } = useBag();

    return (
        <button onClick={onClick} className="relative bag-icon">
            <Image
                src={"/assets/icons/bag3.svg"}
                alt="shopping-icon"
                width={30}
                height={30}
                className="object-contain"
            />
            {bagItems.length > 0 && (
                <span className="absolute -top-0 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center shadow">
                    {bagItems.length}
                </span>
            )}
        </button>
    );
}
