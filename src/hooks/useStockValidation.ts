"use client";
import { useMemo, useState } from "react";

export type StockValidation = {
  qtyRaw: string;
  setQtyRaw: (v: string) => void;
  qty: number;
  stock: number;
  overStock: boolean;
  outOfStock: boolean;
  clampOnBlur: () => { changed: boolean; clampedTo: number };
};

export default function useStockValidation(
  rawStock: unknown,      // backend-dən gələn dəyər (number | string | null | undefined)
  initialQty: number = 1  // default başlanğıc miqdarı
): StockValidation {
  const stock = useMemo(
    () => Math.max(0, Number(rawStock ?? 0)),
    [rawStock]
  );

  const [qtyRaw, setQtyRaw] = useState(String(Math.max(1, Number(initialQty) || 1)));
  const qty = useMemo(() => Math.max(1, Number(qtyRaw || "1")), [qtyRaw]);

  const overStock = stock > 0 && qty > stock;
  const outOfStock = stock <= 0;

  const clampOnBlur = () => {
    const next = stock > 0 ? Math.max(1, Math.min(qty, stock)) : 1;
    const changed = next !== qty;
    if (changed) setQtyRaw(String(next));
    return { changed, clampedTo: next };
  };

  return { qtyRaw, setQtyRaw, qty, stock, overStock, outOfStock, clampOnBlur };
}
