// src/components/common/SearchModal.tsx
"use client";
import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";

type SearchResult = {
  id: number;
  brandName: string;
  description: string;
  price: number | string;
  discountPrice?: number | string | null; // 👈 əlavə olundu
  image?: string | null; // thumbnail üçün (olmasa fallback verəcəyik)
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  results: SearchResult[];
  query?: string;
  touched?: boolean;
  loading?: boolean;
};

export default function SearchModal({
  isOpen,
  onClose,
  results,
  query = "",
  touched = false,
  loading = false,
}: Props) {
  if (!isOpen) return null;

  const formatAZN = (v: number | string | null | undefined) => {
    const n = typeof v === "string" ? Number(v) : v;
    if (n != null && Number.isFinite(n)) {
      return new Intl.NumberFormat("az-AZ", {
        style: "currency",
        currency: "AZN",
        maximumFractionDigits: 2,
      }).format(n as number);
    }
    return "";
  };

  const FALLBACK_DATAURI =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg==";

  const q = query.trim();
  const showEmpty = (q.length >= 2 || touched) && !loading && results.length === 0;
  const showInitial = !loading && !touched && q.length === 0;

  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex justify-center items-center">
      <div className="bg-white rounded-lg w-[90%] max-w-[600px] max-h-[80vh] overflow-y-auto p-6 shadow-lg relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-600 hover:text-black">
          <X />
        </button>

        <h2 className="text-lg font-semibold mb-4">
          Axtarış nəticələri{!loading && results.length > 0 ? ` (${results.length})` : ""}
        </h2>

        {/* İlk boş klikdə heç nə göstərmə */}
        {showInitial && null}

        {/* Yüklənir */}
        {loading && <p className="text-sm text-gray-600">Axtarılır…</p>}

        {/* Nəticələr */}
        {!loading && results.length > 0 && (
          <ul className="space-y-3">
            {results.map((r) => {
              const basePrice = Number(r.price ?? 0);
              const dp =
                r.discountPrice == null
                  ? null
                  : typeof r.discountPrice === "number"
                    ? r.discountPrice
                    : Number(r.discountPrice) || null;
              const hasDiscount = dp != null && dp < basePrice;
              const discountPct =
                hasDiscount && basePrice > 0 ? Math.round(((basePrice - dp) / basePrice) * 100) : 0;

              return (
                <li key={r.id}>
                  <Link
                    href={`/products/${r.id}`}
                    onClick={onClose}
                    className="flex gap-3 items-center rounded hover:bg-gray-100 p-2 transition"
                  >
                    <div className="relative w-16 h-16 flex-shrink-0 rounded overflow-hidden border bg-white">
                      <Image
                        src={r.image || FALLBACK_DATAURI}
                        alt={r.brandName || "product"}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{r.brandName}</p>
                      <p className="text-xs text-gray-600 line-clamp-2">{r.description}</p>

                      {hasDiscount ? (
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm font-500 line-through text-gray-900">
                            {formatAZN(basePrice)}
                          </span>
                          <span className="text-sm font-semibold text-red-600">
                            {formatAZN(dp)}
                          </span>
                          <span
                            className="text-sm px-[4px] py-[2px] rounded bg-[rgba(8,7,7,0.61)] text-white leading-[1.2] inline-block ml-[6px]"
                          >
                            -{discountPct}%
                          </span>
                        </div>
                      ) : (
                        <p className="text-sm font-semibold mt-1 text-gray-900">
                          {formatAZN(basePrice)}
                        </p>
                      )}
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}

        {/* Tapılmadı */}
        {showEmpty && (
          <p className="text-sm text-gray-600">Heç bir uyğun məhsul tapılmadı.</p>
        )}
      </div>
    </div>
  );
}
