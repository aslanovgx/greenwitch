// src/components/common/SearchModal.tsx
"use client";
import Image from "next/image";
import { X } from "lucide-react";

type SearchResult = {
  id: number;
  brandName: string;
  description: string;
  price: number | string;
  image?: string | null;
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

  const formatAZN = (v: number | string) => {
    const n = typeof v === "string" ? Number(v) : v;
    if (Number.isFinite(n)) {
      return new Intl.NumberFormat("az-AZ", {
        style: "currency",
        currency: "AZN",
      }).format(n as number);
    }
    return String(v);
  };

  // Şəkil yoxdursa 1x1 şəffaf PNG fallback
  const FALLBACK_DATAURI =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg==";

  const q = query.trim();
  const showEmpty =
    touched && q.length >= 2 && !loading && results.length === 0;

  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex justify-center items-center">
      <div className="bg-white rounded-lg w-[90%] max-w-[600px] max-h-[80vh] overflow-y-auto p-6 shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-black"
        >
          <X />
        </button>

        <h2 className="text-lg font-semibold mb-4">Axtarış nəticələri</h2>

        {loading && <p className="text-sm text-gray-600">Axtarılır…</p>}

        {!loading && results.length > 0 && (
          <ul className="space-y-3">
            {results.map((r) => (
              <li key={r.id} className="flex gap-3 items-center">
                <div className="relative w-16 h-16 flex-shrink-0 rounded overflow-hidden border">
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
                  <p className="text-xs text-gray-600 line-clamp-2">
                    {r.description}
                  </p>
                  <p className="text-sm font-semibold mt-1">
                    {formatAZN(r.price)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}

        {showEmpty && (
          <p className="text-sm text-gray-600">Heç bir uyğun məhsul tapılmadı.</p>
        )}

        {!loading && !touched && q.length === 0 && (
          <p className="text-sm text-gray-500">Axtarış üçün yazmağa başlayın…</p>
        )}
      </div>
    </div>
  );
}
