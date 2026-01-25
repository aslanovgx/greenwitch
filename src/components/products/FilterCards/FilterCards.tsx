"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import styles from "./FilterCards.module.css";
import cardStyles from "@/components/common/ProductCard.module.css";
import ProductCard from "@/components/common/ProductCard";
import type { Product as UIProduct, RawProduct } from "@/types/Product";
import { getProducts } from "@/lib/api/products";
import { isValidSort, SortCode } from "@/constants/sort";
import { scrollToTop } from "@/utils/scrollToTop";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { buildImageUrl } from "@/utils/images";

const SERVER_PAGE_SIZE = 20;   // backend page size (təxmini/fallback)
const UI_PAGE_SIZE = 20;       // UI-də göstərilən say



const toPosIntOrUndef = (v: string | null) => {
  const n = Number(v);
  return Number.isFinite(n) && n > 0 ? Math.trunc(n) : undefined;
};

const toPageOr1 = (v: string | null) => {
  const n = Number(v);
  return Number.isFinite(n) && n > 0 ? Math.trunc(n) : 1;
};

/* —— Tip-guard & parser-lər —— */
type ListResponse<T> = { items: T[]; total?: number; size?: number };

const isRecord = (v: unknown): v is Record<string, unknown> =>
  typeof v === "object" && v !== null;

function parseProductsResponse(input: unknown): ListResponse<RawProduct> | { items: RawProduct[] } {
  if (Array.isArray(input)) return { items: input as RawProduct[] };
  if (isRecord(input)) {
    const arr = Array.isArray((input as any).items)
      ? ((input as any).items as RawProduct[])
      : Array.isArray((input as any).products)
        ? ((input as any).products as RawProduct[])
        : undefined;
    if (arr) {
      const total = typeof (input as any).total === "number" ? (input as any).total : undefined;
      const size = typeof (input as any).size === "number" ? (input as any).size : undefined;
      return { items: arr, total, size };
    }
  }
  return { items: [] };
}

export default function FilterCards() {

  const pageSizeOf = (r: ListResponse<RawProduct> | { items: RawProduct[] }) =>
    "size" in r && typeof r.size === "number" && r.size > 0 ? r.size : SERVER_PAGE_SIZE;

  const totalOf = (r: ListResponse<RawProduct> | { items: RawProduct[] }) =>
    "total" in r && typeof r.total === "number" ? r.total : undefined;


  const sp = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // URL → filterlər
  const brandId = toPosIntOrUndef(sp.get("brandId"));
  const genderId = toPosIntOrUndef(sp.get("Gender"));
  const shapeId = toPosIntOrUndef(sp.get("shapeId"));
  const colorId = toPosIntOrUndef(sp.get("colorId"));
  const categoryId = toPosIntOrUndef(sp.get("categoryId"));

  // URL → sort
  const s = sp.get("sort");
  const sortCode: SortCode | undefined = isValidSort(s) ? (s as SortCode) : undefined;

  const mapSortToServerParams = (c?: SortCode): Record<string, unknown> => {
  if (!c) return {};

  if (c === "price_asc" || c === "price_desc") {
    return { sort: c }; // products.ts bunu "sort" query-yə çevirir
  }

  if (c === "discount") return { hasDiscount: true };
  if (c === "new") return { isNew: true };
  if (c === "best") return { bestSeller: true };

  return {};
};



  // page (1-based)
  const page = toPageOr1(sp.get("page"));

  // UI state
  const [items, setItems] = useState<UIProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number | null>(null); // yalnız “all” + server meta olduqda dolacaq

  const gridTopRef = useRef<HTMLDivElement>(null);

  /* URL yazıcı — router-in default scroll davranışını söndürürük */
  const setQuery = (key: string, value?: string | number) => {
    const next = new URLSearchParams(sp.toString());
    if (value === undefined || value === null || String(value).length === 0) next.delete(key);
    else next.set(key, String(value));
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const didMountRef = useRef(false);

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return; // ilk mount-da reset ETMƏ
    }

    const current = Number(sp.get("page")) || 1;
    if (current !== 1) setQuery("page", 1);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brandId, genderId, shapeId, colorId, categoryId, sortCode]);


  useEffect(() => {
    let aborted = false;

    (async () => {
      try {
        setLoading(true);
        setError(null);

        const baseParams = {
          ...(brandId ? { brandId } : {}),
          ...(genderId ? { Gender: genderId } : {}),
          ...(shapeId ? { shapeId } : {}),
          ...(colorId ? { colorId } : {}),
          ...(categoryId ? { categoryId } : {}),
        };

        // Helper: server cavabını UIProduct-a çevir
        const adapt = (raw: RawProduct[]): UIProduct[] =>
          raw.map((p) => {
            const priceNum =
              typeof p.price === "number" ? p.price : Number(p.price) || 0;
            const discountNum =
              p.discountPrice == null
                ? null
                : (typeof p.discountPrice === "number"
                  ? p.discountPrice
                  : (Number(p.discountPrice) || 0));

            const imgs = (Array.isArray(p.images) ? p.images : [])
              .filter((x): x is string => typeof x === "string" && x.trim() !== "")
              .map(buildImageUrl);

            return {
              id: Number(p.id),
              name: String(p.name ?? ""),
              description: String(p.description ?? ""),
              bestSeller: !!p.bestSeller,
              isNew: !!p.isNew,
              price: priceNum,
              discountPrice: discountNum,
              brandName: String(p.brandName ?? ""),
              images: imgs,
            };
          });


        // —— SERVER PAGINATION: yalnız ALL (istənilən sort-u server edəcək) ——


        const extraParams = mapSortToServerParams(sortCode);

        const resp = await getProducts({
          ...baseParams,
          ...extraParams,
          page,
          size: UI_PAGE_SIZE,
          status: true,
        });

        const parsed = parseProductsResponse(resp);
        const adapted = adapt(parsed.items ?? []);

        const metaTotal = totalOf(parsed);
        const metaSize = pageSizeOf(parsed);

        setItems(adapted);

        if (metaTotal != null && metaSize && metaSize > 0) {
          const tp = Math.max(1, Math.ceil(metaTotal / metaSize));
          setTotalPages(tp);
          setHasMore(page < tp);
        } else {
          setTotalPages(null);
          setHasMore(adapted.length === UI_PAGE_SIZE);
        }

        if (adapted.length === 0 && page > 1) {
          setQuery("page", page - 1);
          return;
        }

      } catch {
        if (page > 1) setQuery("page", page - 1);
        setError("Məhsulları yükləmək mümkün olmadı.");
        setItems([]);
        setHasMore(false);
        setTotalPages(null);
      } finally {
        if (!aborted) setLoading(false);
      }
    })();

    return () => { aborted = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brandId, genderId, shapeId, colorId, categoryId, sortCode, page]);

  /* Handlers (CLICK → dərhal scroll 0) */
  const goToPage = (p: number) => {
    const target = Math.max(1, p);
    setQuery("page", target);
    scrollToTop();
    requestAnimationFrame(scrollToTop);
  };
  const onClickFirst = () => goToPage(1);
  const onClickPrev = () => goToPage(page - 1);
  const onClickNext = () => goToPage(page + 1);
  const onClickLast = () => { if (totalPages) goToPage(totalPages); };

  // Rəqəmsal düymələr
  const windowPages = useMemo(() => {
    if (totalPages && totalPages >= 1) {
      const around = 2;
      let pages: number[] = [];
      const start = Math.max(1, page - around);
      const end = Math.min(totalPages, page + around);
      for (let p = start; p <= end; p++) pages.push(p);
      if (!pages.includes(1)) pages = [1, ...pages];
      if (!pages.includes(totalPages)) pages = [...pages, totalPages];
      return Array.from(new Set(pages)).sort((a, b) => a - b);
    }
    // virtual rejimdə minimal göstəriş
    const set = new Set<number>([1, page]);
    if (hasMore) set.add(page + 1);
    return Array.from(set).filter(n => n >= 1).sort((a, b) => a - b);
  }, [page, totalPages, hasMore]);

  const showLeftEllipsis = totalPages ? windowPages[0] > 1 : page - 2 > 1;
  const showRightEllipsis = totalPages
    ? windowPages[windowPages.length - 1] < (totalPages ?? 1)
    : hasMore;

  /* Render */
  if (loading) {
    return (
      <div
        className={`${cardStyles.cards_container} ${styles.cards_box} flex justify-center items-center pt-[60px]`}
      >
        {Array.from({ length: UI_PAGE_SIZE }).map((_, i) => (
          <div
            key={i}
            className={`${cardStyles.cards} ${cardStyles.skelCard} relative text-center`}
          >
            <div className={`${cardStyles.cards_image} relative mx-auto`}>
              <div className="w-full h-full bg-gray-200 animate-pulse rounded-lg" />
            </div>
            <div className={cardStyles.cards_desc}>
              <div
                className={`${cardStyles.card_buttons} absolute bottom-0 left-0 flex`}
              >
                <button disabled className={cardStyles.btnSkeleton} />
                <button disabled className={cardStyles.btnSkeleton} />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="py-10 text-center text-red-600">{error}</div>;
  }

  if (!items.length) {
    return (
      <div className="py-10 text-center">
        {sortCode === "new"
          ? "Yeni məhsul tapılmadı."
          : sortCode === "discount"
            ? "Endirimli məhsul tapılmadı."
            : sortCode === "best"
              ? "Çox satılan məhsul tapılmadı."
              : "Məhsul tapılmadı."}

      </div>
    );
  }

  return (
    <div className={styles.filterCards}>
      <div ref={gridTopRef} />
      <div
        className={`${cardStyles.cards_container} ${styles.cards_box} flex justify-center items-center`}
        onTouchStart={(e) => {
          // kartın özünə/uşaqlarına toxunmadıqda aktivliyi söndür
          if (!(e.target as HTMLElement).closest("[data-card-id]")) {
          }
        }}
      >
        {items.map((item) => (
          <ProductCard
            key={item.id}
            item={item}
            activeCategory={
              sortCode === "new" || sortCode === "discount" || sortCode === "best"
                ? sortCode
                : "all"
            }
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
        <button className="px-3 py-2 border rounded-md disabled:opacity-50" onClick={onClickFirst} disabled={page <= 1} aria-label="Birinci">
          <ChevronsLeft className="w-4 h-4" />
        </button>

        <button className="px-3 py-2 border rounded-md disabled:opacity-50" onClick={onClickPrev} disabled={page <= 1} aria-label="Əvvəlki">
          <ChevronLeft className="w-4 h-4" />
        </button>

        {totalPages && showLeftEllipsis && <span className="px-2 select-none">…</span>}

        {windowPages.map((p) => (
          <button
            key={p}
            onClick={() => goToPage(p)}
            className={`px-3 py-2 border rounded-md ${p === page ? "bg-black text-white" : ""}`}
            aria-current={p === page ? "page" : undefined}
          >
            {p}
          </button>
        ))}

        {showRightEllipsis && <span className="px-2 select-none">…</span>}

        <button
          className="px-3 py-2 border rounded-md disabled:opacity-50"
          onClick={onClickNext}
          disabled={totalPages != null ? page >= totalPages : !hasMore}
          aria-label="Sonraki"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        <button
          className="px-3 py-2 border rounded-md disabled:opacity-50"
          onClick={onClickLast}
          disabled={!(totalPages && page < totalPages)}
          aria-label="Son"
          title="Son"
        >
          <ChevronsRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
