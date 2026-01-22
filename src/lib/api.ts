import type { Product } from "@/types/Product";

export type ProductFilters = {
  genderId?: number;
  brandId?: number;
  shapeId?: number;
  categoryId?: number;
  colorIds?: number[]; // backend ColorIds[] istəyir
  page?: number;       // 1-based ya 0-based? (aşağıda qeyd bax)
  size?: number;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL!;
if (!API_URL) throw new Error("Missing NEXT_PUBLIC_API_URL");

// helper: query string qur
function buildQuery(params: ProductFilters) {
  const q = new URLSearchParams();

  if (params.genderId != null) q.set("genderId", String(params.genderId));
  if (params.brandId != null) q.set("brandId", String(params.brandId));
  if (params.shapeId != null) q.set("shapeId", String(params.shapeId));
  if (params.categoryId != null) q.set("categoryId", String(params.categoryId));
  if (Array.isArray(params.colorIds)) {
    // Swagger-də ColorIds[] kimi göstərilir → eyni açarla təkrarla
    for (const c of params.colorIds) q.append("colorIds", String(c));
  }
  if (params.page != null) q.set("page", String(params.page));
  if (params.size != null) q.set("size", String(params.size));

  const s = q.toString();
  return s ? "?" + s : "";
}

export async function getProducts(filters: ProductFilters = {}): Promise<Product[]> {
  try {
    const base = `${API_URL.replace(/\/+$/, "")}/Product`;
    const url = base + buildQuery(filters);

    const res = await fetch(url, {
      method: "GET",
      headers: { Accept: "application/json" },
      cache: "no-store",
    });

    console.log("[getProducts] status:", res.status, "url:", url);

    const raw = await res.text();
    let data: any;
    try { data = JSON.parse(raw); }
    catch {
      console.error("[getProducts] Non-JSON sample:", raw.slice(0, 400));
      return [];
    }

    // birbaşa array?
    if (Array.isArray(data)) return data as Product[];

    // paged/popular açarlar
    const candidates = [
      data?.products,
      data?.items,
      data?.data,
      data?.records,
      data?.list,
      data?.content,   // bəzən Spring/ASP.NET-də belə olur
      data?.value,
      // bəzən {result:{items:[]}}
      data?.result?.items,
      data?.result?.data,
    ].find(Array.isArray);

    if (candidates) return candidates as Product[];

    // fallback: obyektin içində ilk array
    const firstArray = Object.values(data).find((v) => Array.isArray(v));
    if (firstArray) return firstArray as Product[];

    console.warn("[getProducts] Unexpected JSON shape keys:", Object.keys(data || {}));
    return [];
  } catch (err) {
    console.error("[getProducts] error:", err);
    return [];
  }
}
