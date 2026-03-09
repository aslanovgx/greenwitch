"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";
import { PiMagnifyingGlass } from "react-icons/pi";
import type { SearchResult } from "@/components/common/SearchModal";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  query: string;
  onQueryChange: (value: string) => void;
  results: SearchResult[];
  total?: number;
  limit?: number;
  loading?: boolean;
};

const POPULAR_SEARCHES = [
  "Fossil",
  "Emporio Armani",
  "Michael Kors",
  "Olivia Burton",
  "Tommy Hilfiger",
  "CALVIN KLEIN",
];

export default function MobileSearchOverlay({
  isOpen,
  onClose,
  query,
  onQueryChange,
  results,
  total,
  limit = 20,
  loading = false,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 120);

    return () => clearTimeout(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  const formatAZN = (v: number | string | null | undefined) => {
    const n = typeof v === "string" ? Number(v) : v;
    if (n != null && Number.isFinite(n)) {
      return `${new Intl.NumberFormat("az-AZ", {
        maximumFractionDigits: 2,
      }).format(n as number)} AZN`;
    }
    return "";
  };

  const FALLBACK_DATAURI =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg==";

  const q = query.trim();
  const shownResults = results.slice(0, limit);
  const totalSafe = typeof total === "number" ? total : results.length;

  const showInitial = q.length === 0 && !loading;
  const showHint = q.length > 0 && q.length < 2 && !loading;
  const showEmpty = q.length >= 2 && !loading && totalSafe === 0;

  return (
    <div className="fixed inset-0 z-[120] bg-white">
      <div className="border-b border-[#e9e9e9] bg-white px-4 pb-4 pt-3">
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <PiMagnifyingGlass className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[22px] text-[#2B2B2B]" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder="Axtar..."
              className="h-[48px] w-full rounded-[14px] border border-[#E5E5E5] bg-[#F7F7F7] pl-12 pr-4 text-[15px] text-[#222] outline-none transition focus:border-[#1F1F1F] focus:bg-white"
            />
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-[44px] w-[44px] items-center justify-center rounded-full text-[#2B2B2B] transition hover:bg-[#F5F5F5]"
            aria-label="Bağla"
          >
            <X size={25} strokeWidth={2.2} />
          </button>
        </div>
      </div>

      <div className="h-[calc(100vh-77px)] overflow-y-auto px-4 pb-6 pt-4">
        {showInitial && (
          <div className="space-y-6">
            <p className="text-[15px] leading-6 text-[#2B2B2B]">
              Məhsul axtarmaq üçün yazmağa başlayın...
            </p>

            <div>
              <h3 className="mb-3 text-[14px] font-medium text-[#8A8A8A]">
                Populyar axtarışlar
              </h3>

              <div className="flex flex-wrap gap-2">
                {POPULAR_SEARCHES.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => onQueryChange(item)}
                    className="rounded-full border border-[#E7E7E7] bg-white px-4 py-2 text-[14px] text-[#2B2B2B] transition active:scale-[0.98]"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {showHint && (
          <p className="text-[14px] text-[#6F6F6F]">
            Axtarış üçün ən azı 2 hərf yazın...
          </p>
        )}

        {loading && (
          <div className="space-y-3">
            <p className="text-[14px] text-[#6F6F6F]">Axtarılır...</p>

            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-[14px] border border-[#F0F0F0] bg-white p-2"
              >
                <div className="h-16 w-16 animate-pulse rounded-[10px] bg-[#F1F1F1]" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-24 animate-pulse rounded bg-[#F1F1F1]" />
                  <div className="h-3 w-36 animate-pulse rounded bg-[#F1F1F1]" />
                  <div className="h-4 w-20 animate-pulse rounded bg-[#F1F1F1]" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && shownResults.length > 0 && (
          <div>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-[14px] font-medium text-[#8A8A8A]">
                Nəticələr
              </h3>
              <span className="text-[13px] text-[#8A8A8A]">{totalSafe} məhsul</span>
            </div>

            <ul className="space-y-3">
              {shownResults.map((r) => {
                const basePrice = Number(r.price ?? 0);
                const dp =
                  r.discountPrice == null
                    ? null
                    : typeof r.discountPrice === "number"
                    ? r.discountPrice
                    : Number(r.discountPrice) || null;

                const hasDiscount = dp != null && dp < basePrice;
                const discountPct =
                  hasDiscount && basePrice > 0
                    ? Math.round(((basePrice - dp) / basePrice) * 100)
                    : 0;

                return (
                  <li key={r.id}>
                    <Link
                      href={`/products/${r.id}`}
                      onClick={onClose}
                      className="flex items-center gap-3 rounded-[14px] border border-[#F0F0F0] bg-white p-2 transition active:scale-[0.995]"
                    >
                      <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-[10px] border border-[#F1F1F1] bg-white">
                        <Image
                          src={r.image || FALLBACK_DATAURI}
                          alt={r.brandName || "product"}
                          fill
                          sizes="64px"
                          className="object-contain"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[15px] font-semibold leading-tight text-[#222]">
                          {r.brandName}
                        </p>

                        <p className="mt-1 truncate text-[13px] leading-tight text-[#6B6B6B]">
                          {r.name}
                        </p>

                        {hasDiscount ? (
                          <div className="mt-2 flex flex-wrap items-center gap-2">
                            <span className="text-[13px] text-[#8A8A8A] line-through">
                              {formatAZN(basePrice)}
                            </span>
                            <span className="text-[14px] font-semibold text-[#C62828]">
                              {formatAZN(dp)}
                            </span>
                            <span className="inline-flex items-center rounded-full bg-[#1F1F1F] px-2 py-[3px] text-[11px] font-medium text-white">
                              -{discountPct}%
                            </span>
                          </div>
                        ) : (
                          <p className="mt-2 text-[14px] font-semibold text-[#222]">
                            {formatAZN(basePrice)}
                          </p>
                        )}
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {showEmpty && (
          <div className="pt-2">
            <p className="text-[14px] leading-6 text-[#6F6F6F]">
              Heç bir uyğun məhsul tapılmadı.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}