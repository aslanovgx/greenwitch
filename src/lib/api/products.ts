// lib/api/products.ts
import { apiGet } from "./fetcher";

export type ProductFilter = {
  genderId?: number;
  brandId?: number;
  shapeId?: number;
  categoryId?: number;
  colorId?: number;   // <<— singular
  page?: number;
  size?: number;
  search?: string;
};

function buildQuery(p: ProductFilter = {}) {
  const qp = new URLSearchParams();
  if (p.genderId) qp.set("genderId", String(p.genderId));
  if (p.brandId) qp.set("brandId", String(p.brandId));
  if (p.shapeId) qp.set("shapeId", String(p.shapeId));
  if (p.categoryId) qp.set("categoryId", String(p.categoryId));
  if (p.colorId) qp.set("colorId", String(p.colorId));   // <<— vacib
  if (p.page) qp.set("page", String(p.page));
  if (p.size) qp.set("size", String(p.size));

  // ⚠️ backend-ə uyğun açarı seç: aşağıdakı sətirdə "q" yerinə "search" və ya "name" ola bilər
  if (p.search && p.search.trim()) qp.set("q", p.search.trim());

  const qs = qp.toString();
  return qs ? `?${qs}` : "";
}

export async function getProducts(params: ProductFilter = {}) {
  const path = `/Product${buildQuery(params)}`;
  const raw = await apiGet(path);
  const list = Array.isArray(raw) ? raw : Array.isArray(raw?.products) ? raw.products : [];
  return list;
}

// detal tip (endpoint-də thumbnails gəlir)
export type ProductDetail = {
  id: number;
  name: string;
  description: string;
  price: number;
  discountPrice: number | null;
  bestSeller: boolean;
  isNew: boolean;
  brandName: string;
  genderName?: string;
  shapeName?: string;
  categoryName?: string;
  thumbnails: string[];
  colorNames?: string[];
};

export async function getProductById(id: number): Promise<ProductDetail> {
  const data = await apiGet(`/Product/${id}`);
  // bəzi backend-lər {product:{...}} qaytara bilər, ehtiyat üçün:
  const p = (data?.product ?? data) as ProductDetail;

  // relative şəkilləri absolute et (API base .../api-dırsa)
  const API = (process.env.NEXT_PUBLIC_API_URL ?? "").trim();
  const ROOT = API.replace(/\/api\/?$/i, "");
  const toAbs = (rel: string) => `${ROOT}/${String(rel ?? "").replace(/^\/+/, "")}`;

  return {
    ...p,
    thumbnails: Array.isArray(p.thumbnails) ? p.thumbnails.map(toAbs) : [],
  };
}
