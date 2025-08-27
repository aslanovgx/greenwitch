// Server-only util (RSC)
export type ProductFilter = {
  genderId?: number;
  brandId?: number;
  shapeId?: number;
  categoryId?: number;
  colorId?: number;
  page?: number;
  size?: number;
  search?: string;          // ⬅️ ELAVƏ ET
  bestSeller?: boolean;     // varsa saxla
};

function buildQuery(p: ProductFilter = {}) {
  const qp = new URLSearchParams();
  if (p.genderId) qp.set("genderId", String(p.genderId));
  if (p.brandId) qp.set("brandId", String(p.brandId));
  if (p.shapeId) qp.set("shapeId", String(p.shapeId));
  if (p.categoryId) qp.set("categoryId", String(p.categoryId));
  if (p.colorId) qp.set("colorId", String(p.colorId));
  if (p.page) qp.set("page", String(p.page));
  if (p.size) qp.set("size", String(p.size));
  if (p.search?.trim()) qp.set("search", p.search.trim());
  const qs = qp.toString();
  return qs ? `?${qs}` : "";
}

const BASE =
  (process.env.BACKEND_URL ?? process.env.NEXT_PUBLIC_API_URL ?? "")
    .trim().replace(/\/+$/, "");

if (!/^https?:\/\//i.test(BASE)) {
  throw new Error("BACKEND_URL/NEXT_PUBLIC_API_URL düzgün təyin edilməyib");
}


export async function getProductsServer(params: ProductFilter = {}) {
  const API = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/+$/, "");
  const url = `${API}/Product${buildQuery(params)}`;

  const res = await fetch(url, {
    // ISR: HTML build edilib cache-lənsin, məsələn 60 san sonra yenilənsin
    next: { revalidate: 60 },
    // Accept JSON headers lazım olsa əlavə et
    headers: { Accept: "application/json", "ngrok-skip-browser-warning": "true" },
  });

  if (!res.ok) throw new Error(`GET ${url} -> ${res.status}`);
  const raw = await res.json();
  return Array.isArray(raw) ? raw : Array.isArray(raw?.products) ? raw.products : [];
}
