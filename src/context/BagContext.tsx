
"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { Product } from "@/types/Product";

export type BagItem = Product & { quantity: number };

type BagContextType = {
    bagItems: BagItem[];
    addToBag: (item: Product & { quantity?: number }) => void;
    removeFromBag: (id: number) => void;
    updateQuantity: (id: number, quantity: number) => void;
    clearBag: () => void;
};

const BagContext = createContext<BagContextType | undefined>(undefined);

export const BagProvider = ({ children }: { children: React.ReactNode }) => {
    const [bagItems, setBagItems] = useState<BagItem[]>([]);

    useEffect(() => {
        const stored = localStorage.getItem("bagItems");
        if (stored) setBagItems(JSON.parse(stored));
    }, []);

    useEffect(() => {
        localStorage.setItem("bagItems", JSON.stringify(bagItems));
    }, [bagItems]);

    const addToBag = (item: Product & { quantity?: number }) => {
        const cleanPrice = Number(String(item.price).replace(/\D/g, ''));
        const qty = item.quantity ?? 1;

        setBagItems((prev) => {
            const existing = prev.find((i) => i.id === item.id);
            if (existing) {
                return prev.map((i) =>
                    i.id === item.id
                        ? { ...i, quantity: i.quantity + qty }
                        : i
                );
            }
            return [...prev, { ...item, price: cleanPrice, quantity: qty }];
        });
    };

    const removeFromBag = (id: number) => {
        setBagItems((prev) => prev.filter((i) => i.id !== id));
    };

    const updateQuantity = (id: number, quantity: number) => {
        if (quantity <= 0) {
            removeFromBag(id);
        } else {
            setBagItems((prev) =>
                prev.map((i) => (i.id === id ? { ...i, quantity } : i))
            );
        }
    };

    const clearBag = () => {
        setBagItems([]);
    };

    return (
        <BagContext.Provider
            value={{ bagItems, addToBag, removeFromBag, updateQuantity, clearBag }}
        >
            {children}
        </BagContext.Provider>
    );
};

export const useBag = (): BagContextType => {
    const context = useContext(BagContext);
    if (!context) {
        throw new Error("useBag must be used within a BagProvider");
    }
    return context;
};
