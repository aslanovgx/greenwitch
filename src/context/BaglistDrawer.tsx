"use client";

import { useBag } from "@/context/BagContext";
import Image from "next/image";
import { useMemo } from "react";
import { X, Trash2, Minus, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import type { Product } from "@/types/Product";
import Link from "next/link";

const productHref = (p: Product) => `/products/${p.id}`; // lazım olsa slug-a çevirərsən

export default function BaglistDrawer({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {

  const { bagItems, removeFromBag, updateQuantity, clearBag } = useBag();

  const getUnitPrice = (item: Product & { quantity: number }) => {
    const hasDiscount =
      typeof item.discountPrice === "number" &&
      typeof item.price === "number" &&
      item.discountPrice < item.price;
    return hasDiscount ? item.discountPrice : item.price;
  };


  const totalPrice = useMemo(() => {
    return bagItems.reduce((total, item) => {
      const unit = Number(getUnitPrice(item) ?? 0);
      return total + (isNaN(unit) ? 0 : unit * item.quantity);
    }, 0);
  }, [bagItems]);

  const router = useRouter();
  if (!isOpen) return null;

  return (
    <div className={`fixed top-0 right-0 h-full w-[100%] max-w-[350px] bg-white shadow-xl z-50 p-4 overflow-y-auto`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Səbət ({bagItems.length})</h2>
        <button onClick={onClose} className="cursor-pointer">
          <X />
        </button>
      </div>

      {bagItems.length === 0 ? (
        <p>Səbət boşdur.</p>
      ) : (
        <>
          {bagItems.map((item) => {
            const unit = getUnitPrice(item);
            return (
              <div key={item.id} className="mb-4 border-b pb-4 flex items-center gap-3">
                <Link
                  href={productHref(item)}
                  prefetch={false} 
                  onClick={onClose}
                  className="shrink-0"
                  aria-label={`${item.name} detal səhifəsi`}
                >
                  <Image
                    src={item.images?.[0] ?? "/assets/placeholders/product.png"}
                    alt={item.name ?? "Product"}
                    width={60}
                    height={60}
                    sizes="60px"
                    className="rounded w-[60px] h-[60px] object-contain"
                  />
                </Link>
                <div className="flex-1">
                  <p className="font-semibold text-sm uppercase">
                    <Link
                      href={productHref(item)}
                      prefetch={false} 
                      onClick={onClose}
                      className="font-semibold text-sm uppercase hover:underline"
                    >
                      {item.name}
                    </Link>
                  </p>

                  {/* Qiymət vizualı: endirim varsa iki qiymət göstər */}
                  {typeof item.discountPrice === "number" &&
                    typeof item.price === "number" &&
                    item.discountPrice < item.price ? (
                    <div className="flex items-center gap-2">
                      <span className="line-through opacity-60 text-sm">
                        {item.price.toFixed(2)} AZN
                      </span>
                      <span className="text-red-950 font-bold text-sm">
                        {item.discountPrice.toFixed(2)} AZN
                      </span>
                    </div>
                  ) : (
                    <p className="text-red-950 font-bold text-sm">
                      {Number(unit ?? 0).toFixed(2)} AZN
                    </p>
                  )}

                  <div className="flex items-center gap-1 mt-1">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        if (item.quantity > 1) updateQuantity(item.id, item.quantity - 1);
                      }}
                      disabled={item.quantity <= 1}
                      className="p-1 bg-gray-200 rounded"
                    >
                      <Minus size={14} className="cursor-pointer" />
                    </button>
                    <span className="text-sm">{item.quantity}</span>
                    <button
                      onClick={(e) => { e.stopPropagation(); e.preventDefault(); updateQuantity(item.id, item.quantity + 1); }}
                      className="p-1 bg-gray-200 rounded"
                    >
                      <Plus size={14} className="cursor-pointer" />
                    </button>
                  </div>
                </div>

                <button
                  onClick={(e) => { e.stopPropagation(); e.preventDefault(); removeFromBag(item.id); }}
                  className="bg-red-600 hover:bg-red-700 text-white p-1 rounded"
                >
                  <Trash2 size={16} className="cursor-pointer" />
                </button>
              </div>
            );
          })}

          <div className="mt-4 pt-4">
            <div className="flex justify-between font-bold text-lg" aria-live="polite">
              <span>Ümumi:</span>
              <span>{totalPrice.toFixed(2)} AZN</span>
            </div>

            <button
              onClick={() => {
                onClose();
                router.push("/purchase");
              }}
              className="w-full cursor-pointer bg-black text-white py-2 rounded mt-3"
            >
              Alış səhifəsinə keç
            </button>

            <button
              onClick={clearBag}
              className="w-full cursor-pointer text-red-600 text-sm mt-2 underline"
            >
              Səbəti təmizlə
            </button>
          </div>
        </>
      )}
    </div>
  );
}
