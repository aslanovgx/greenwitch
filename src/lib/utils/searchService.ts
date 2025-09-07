import { getProducts } from "@/lib/api/products";
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

const CACHE = new Map<string, { ts: number; items: RawProduct[] }>();
const TTL_MS = 60_000; // 1 dəqiqə

export function buildImageUrl(rel: string) {
  const API = (process.env.NEXT_PUBLIC_API_URL ?? "").trim();
  const ROOT = API.replace(/\/api\/?$/i, "");
  const clean = String(rel ?? "").replace(/^\/+/, "");
  return `${ROOT}/${clean}`;
}

function normalize(s: any) {
  return String(s ?? "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function matchQuery(p: RawProduct, q: string) {
  if (!q) return true;
  const n = normalize(q);
  const blob = normalize(`${p?.name ?? ""} ${(p as any)?.brandName ?? ""} ${p?.description ?? ""}`);
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
    brandName: String((p as any)?.brandName ?? ""),
    description: String(p.description ?? ""),
    price: priceNum,
    discountPrice: discountNum,
    image: firstImage ? buildImageUrl(firstImage) : null,
  };
}

/** FE axtarış: səhifələrdən topla → lokalda filterlə → limitlə */
export async function feSearchAll(
  q: string,
  baseParams: Record<string, number | string | undefined> = {},
  opts: { maxPages?: number; maxResults?: number; pageSizeHint?: number } = {}
): Promise<RawProduct[]> {
  const maxPages = opts.maxPages ?? 10;
  const maxResults = opts.maxResults ?? 1000;
  const pageSizeHint = opts.pageSizeHint ?? 20;

  const cacheKey = JSON.stringify({ baseParams });
  const now = Date.now();
  let bag: RawProduct[] | undefined;

  const cached = CACHE.get(cacheKey);
  if (cached && now - cached.ts < TTL_MS) {
    bag = cached.items;
  } else {
    const collected: RawProduct[] = [];
    for (let page = 1; page <= maxPages; page++) {
      const resp = await getProducts({ ...baseParams, page } as any);
      const list = Array.isArray(resp) ? resp : resp?.items ?? [];
      if (!Array.isArray(list) || list.length === 0) break;
      collected.push(...(list as RawProduct[]));
      if (list.length < pageSizeHint) break;
      if (collected.length >= maxResults) break;
    }
    bag = collected;
    CACHE.set(cacheKey, { ts: now, items: collected });
  }

  const qn = q.trim();
  if (!qn) return bag!;
  return bag!.filter((p) => matchQuery(p, qn));
}
