"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import styles from "./FilterCards.module.css";
import cardStyles from "@/components/common/ProductCard.module.css";
import ProductCard from "@/components/common/ProductCard";
import type { Product as UIProduct, RawProduct } from "@/types/Product";
import { getProducts } from "@/lib/api/products";
import { isValidSort, SortCode } from "@/constants/sort";

// Backend sabit page size: 20
const SERVER_PAGE_SIZE = 20;

/* Helpers */
function buildImageUrl(rel: string) {
  const API = (process.env.NEXT_PUBLIC_API_URL ?? "").trim();
  const ROOT = API.replace(/\/api\/?$/i, "");
  const clean = String(rel ?? "").replace(/^\/+/, "");
  return `${ROOT}/${encodeURI(clean)}`;
}
const toPosIntOrUndef = (v: string | null) => {
  const n = Number(v);
  return Number.isFinite(n) && n > 0 ? Math.trunc(n) : undefined;
};
const toPageOr1 = (v: string | null) => {
  const n = Number(v);
  return Number.isFinite(n) && n > 0 ? Math.trunc(n) : 1;
};

export default function FilterCards() {
  const sp = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  /* URL-dən filterlər */
  const brandId = toPosIntOrUndef(sp.get("brandId"));
  const genderId = toPosIntOrUndef(sp.get("genderId"));
  const shapeId  = toPosIntOrUndef(sp.get("shapeId"));
  const colorId  = toPosIntOrUndef(sp.get("colorId"));

  /* sort code (backend dəstəkləyirsə ötürmək olar; dəstəkləmirsə FE-də sort ETMƏ) */
  const s = sp.get("sort");
  const sortCode: SortCode | undefined = isValidSort(s) ? s : undefined;

  /* page (1-based) */
  const page = toPageOr1(sp.get("page"));

  /* UI state */
  const [items, setItems] = useState<UIProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);

  // total varsa nömrəli səhifələmə; yoxdursa hasMore ilə prev/next
  const [total, setTotal]     = useState<number | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(false);

  /* URL yazıcı */
  const setQuery = (key: string, value?: string | number) => {
    const next = new URLSearchParams(sp.toString());
    if (value === undefined || value === null || String(value).length === 0) next.delete(key);
    else next.set(key, String(value));
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  /* Filter/sort dəyişəndə yalnız lazım olsa page=1 et */
  useEffect(() => {
    const current = Number(sp.get("page")) || 1;
    if (current !== 1) setQuery("page", 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brandId, genderId, shapeId, colorId, sortCode]);

  /* Data fetch */
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(null);

        type GetProductsArg = Parameters<typeof getProducts>[0];
        const params: GetProductsArg = {
          ...(brandId ? { brandId } : {}),
          ...(genderId ? { genderId } : {}),
          ...(shapeId  ? { shapeId }  : {}),
          ...(colorId  ? { colorId }  : {}),
          page,           // ✅ yalnız page göndəririk (1-based)
          // size YOXDUR — backend default 20
          // sort varsa və backend qəbul edirsə: sort: sortCode
        };

        const resp = await getProducts(params as any);

        let raw: RawProduct[] = [];
        let metaTotal: number | null = null;

        if (Array.isArray(resp)) {
          // B: düz array (batch)
          raw = resp;
          metaTotal = null;
          setHasMore(raw.length === SERVER_PAGE_SIZE);
        } else {
          // A: { items, total, page, size }
          raw = resp.items ?? [];
          metaTotal = typeof resp.total === "number" ? resp.total : null;

          if (metaTotal != null) {
            const effSize = typeof (resp as any).size === "number" ? (resp as any).size : SERVER_PAGE_SIZE;
            const totalPages = Math.max(1, Math.ceil(metaTotal / effSize));
            setHasMore(page < totalPages);
          } else {
            setHasMore(raw.length === SERVER_PAGE_SIZE);
          }
        }

        const adapted = raw.map<UIProduct>((p) => {
          const imgs = (Array.isArray(p.images) ? p.images : [])
            .filter((x): x is string => typeof x === "string" && x.trim() !== "")
            .map(buildImageUrl);
          return {
            id: p.id,
            name: p.name,
            description: p.description ?? "",
            bestSeller: !!p.bestSeller,
            isNew: !!p.isNew,
            price: p.price,
            discountPrice: p.discountPrice ?? null,
            brandName: p.brandName ?? "",
            images: imgs,
          };
        });

        setItems(adapted);
        setTotal(metaTotal);
      } catch (e) {
        console.error(e);
        setError("Məhsulları yükləmək mümkün olmadı.");
        setItems([]);
        setTotal(null);
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    })();
  }, [brandId, genderId, shapeId, colorId, sortCode, page]);

  /* Handlers */
  const goToPage = (p: number) => setQuery("page", Math.max(1, p));
  const totalPages = useMemo(
    () => (total != null ? Math.max(1, Math.ceil(total / SERVER_PAGE_SIZE)) : null),
    [total]
  );

  /* Render */
  if (loading) return <div className="py-10 text-center">Yüklənir...</div>;
  if (error)   return <div className="py-10 text-center text-red-600">{error}</div>;
  if (!items.length) return <div className="py-10 text-center">Məhsul tapılmadı.</div>;

  return (
    <div className={styles.filterCards}>
      <div className={`${cardStyles.cards_container} ${styles.cards_box} flex justify-center items-center`}>
        {items.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
        <button
          className="px-3 py-2 border rounded-md disabled:opacity-50"
          onClick={() => goToPage(page - 1)}
          disabled={page <= 1}
        >
          Əvvəlki
        </button>

        {totalPages != null && (
          <>
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .slice(Math.max(0, page - 3), Math.min(totalPages, page + 2))
              .map((p) => (
                <button
                  key={p}
                  onClick={() => goToPage(p)}
                  className={`px-3 py-2 border rounded-md ${p === page ? "bg-black text-white" : ""}`}
                >
                  {p}
                </button>
              ))}
          </>
        )}

        <button
          className="px-3 py-2 border rounded-md disabled:opacity-50"
          onClick={() => goToPage(page + 1)}
          disabled={totalPages != null ? page >= totalPages : !hasMore}
        >
          Növbəti
        </button>
      </div>
    </div>
  );
}
