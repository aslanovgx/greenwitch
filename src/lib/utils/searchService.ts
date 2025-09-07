import { getProducts, type ProductFilter } from "@/lib/api/products";
import type { RawProduct } from "@/types/Product";

export type FeSearchResult = {
  id: number;
  name: string;
  brandName: string;
  description: string;
  price: number;
  discountPrice: number | null;
  image?: string | null;
};

/* ── Cache ───────────────────────────────────────────── */
const CACHE = new Map<string, { ts: number; items: RawProduct[] }>();
const TTL_MS = 60_000; // 1 dəqiqə

/* ── Helpers ─────────────────────────────────────────── */
export function buildImageUrl(rel: string) {
  const API = (process.env.NEXT_PUBLIC_API_URL ?? "").trim();
  const ROOT = API.replace(/\/api\/?$/i, "");
  const clean = String(rel ?? "").replace(/^\/+/, "");
  return `${ROOT}/${encodeURI(clean)}`;
}

function normalize(s: unknown) {
  return String(s ?? "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "");
}

const isRecord = (v: unknown): v is Record<string, unknown> =>
  typeof v === "object" && v !== null;

/* getProducts cavabını təhlükəsiz parse et (array və ya {items,total,size}) */
type ListResponse<T> = { items: T[]; total?: number; size?: number };
function parseProductsResponse(input: unknown): ListResponse<RawProduct> {
  if (Array.isArray(input)) return { items: input as RawProduct[] };
  if (isRecord(input) && Array.isArray(input.items)) {
    const total = typeof input.total === "number" ? input.total : undefined;
    const size = typeof input.size === "number" ? input.size : undefined;
    return { items: input.items as RawProduct[], total, size };
  }
  return { items: [] };
}

/* ── Match & Adapt ───────────────────────────────────── */
export function matchQuery(p: RawProduct, q: string) {
  if (!q) return true;
  const n = normalize(q);
  const blob = normalize(`${p?.name ?? ""} ${p?.brandName ?? ""} ${p?.description ?? ""}`);
  return blob.includes(n);
}

export function rawToCard(p: RawProduct): FeSearchResult {
  const firstImage =
    Array.isArray(p.images) && typeof p.images[0] === "string" ? p.images[0] : null;

  const priceNum = typeof p.price === "number" ? p.price : Number(p.price) || 0;
  const discountNum =
    p.discountPrice == null
      ? null
      : typeof p.discountPrice === "number"
      ? p.discountPrice
      : Number(p.discountPrice) || 0;

  return {
    id: Number(p.id),
    name: String(p.name ?? ""),
    brandName: String(p.brandName ?? ""),
    description: String(p.description ?? ""),
    price: priceNum,
    discountPrice: discountNum,
    image: firstImage ? buildImageUrl(firstImage) : null,
  };
}

/** FE axtarış: səhifələrdən topla → lokalda filterlə → limitlə */
export async function feSearchAll(
  q: string,
  baseParams: Partial<ProductFilter> = {},
  opts: { maxPages?: number; maxResults?: number; pageSizeHint?: number } = {}
): Promise<RawProduct[]> {
  const maxPages = opts.maxPages ?? 10;
  const maxResults = opts.maxResults ?? 1000;
  const pageSizeHint = opts.pageSizeHint ?? 20;

  const cacheKey = JSON.stringify({ baseParams });
  const now = Date.now();

  // Cache
  const cached = CACHE.get(cacheKey);
  let bag: RawProduct[] | undefined = cached && now - cached.ts < TTL_MS ? cached.items : undefined;

  // Fetch if needed
  if (!bag) {
    const collected: RawProduct[] = [];
    for (let page = 1; page <= maxPages; page++) {
      const resp = await getProducts({ ...baseParams, page });
      const parsed = parseProductsResponse(resp);
      const list = parsed.items;

      if (!list.length) break;

      collected.push(...list);

      if (list.length < pageSizeHint) break;
      if (collected.length >= maxResults) break;
    }
    bag = collected;
    CACHE.set(cacheKey, { ts: now, items: collected });
  }

  const qn = q.trim();
  if (!qn) return bag;

  return bag.filter((p) => matchQuery(p, qn));
}
