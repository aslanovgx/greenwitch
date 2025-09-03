"use client";
import React from "react";

type Props = {
  qtyRaw: string;
  setQtyRaw: (v: string) => void;
  stock: number;
  overStock: boolean;
  outOfStock: boolean;
  clampOnBlur: () => { changed: boolean; clampedTo: number };
  className?: string;
  helpClassName?: string;
  inputAriaLabel?: string;
  helpId?: string;
};

export default function QuantityInput({
  qtyRaw,
  setQtyRaw,
  stock,
  overStock,
  outOfStock,
  clampOnBlur,
  className,
  helpClassName,
  inputAriaLabel = "Miqdar",
  helpId = "qty-help",
}: Props) {
  return (
    <div>
      <input
        type="text"
        inputMode="numeric"
        pattern="\\d*"
        min={1}
        max={stock || undefined}
        className={className}
        value={qtyRaw}
        onChange={(e) => setQtyRaw(e.target.value.replace(/[^\d]/g, ""))}
        onBlur={() => clampOnBlur()}
        aria-label={inputAriaLabel}
        aria-invalid={overStock || outOfStock}
        aria-describedby={helpId}
      />
      <div id={helpId} className={helpClassName} role="status" aria-live="polite">
        {outOfStock ? (
          <span className="text-red-600">Stokda yoxdur</span>
        ) : overStock ? (
          <span className="text-red-600">Maksimum {stock} ədəd mövcuddur</span>
        ) : (
          <span className="text-gray-500">Stok: {stock} ədəd</span>
        )}
      </div>
    </div>
  );
}
