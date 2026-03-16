// lib/api/products.ts
import { apiGet } from "./fetcher";
import type { RawProduct, Product } from "@/types/Product";

function normalizeProduct(raw: RawProduct): Product {
  return {
    id: raw.id,
    name: raw.name ?? "",
    description: raw.description ?? "",
    bestSeller: !!raw.bestSeller,
    isNew: !!raw.isNew,
    price: raw.price ?? 0,
    finalPrice: raw.finalPrice ?? null,

    brandName: raw.brandName ?? "",
    brandId: raw.brandId ?? undefined,

    images: raw.images ?? [],
    image: raw.image ?? undefined,
    thumbnails: raw.thumbnails ?? undefined,

    // 🔥 Vacib yer — WebP thumbs backend-dən gələn kimi əlavə edilir
    webpThumbs: raw.webpThumbs ?? [],

    colorNames: raw.colorNames ?? undefined,
    status: raw.status ?? true,
  };
}

export type ProductFilter = {
  Gender?: number;
  brandId?: number;
  shapeId?: number;
  accessoryTypeId?: number;
  categoryId?: number;
  colorId?: number;
  page?: number;
  size?: number;
  search?: string;
  // sort?: "price_asc" | "price_desc";
  sort?: "price_asc" | "price_desc";
  status?: boolean;

  bestSeller?: boolean;
  isNew?: boolean;
  hasDiscount?: boolean;
};

function buildQuery(p: ProductFilter = {}) {
  const qp = new URLSearchParams();
  if (p.Gender) qp.set("Gender", String(p.Gender));
  if (p.brandId) qp.set("brandId", String(p.brandId));
  if (p.shapeId) qp.set("shapeId", String(p.shapeId));
  if (p.accessoryTypeId) qp.set("accessoryTypeId", String(p.accessoryTypeId));
  if (p.categoryId) qp.set("categoryId", String(p.categoryId));
  if (p.colorId) qp.set("colorId", String(p.colorId));
  if (p.page) qp.set("page", String(p.page));
  if (p.size) qp.set("size", String(p.size));
  // if (p.sort) qp.set("sort", p.sort);
  if (p.sort) qp.set("sort", p.sort);
  if (p.search && p.search.trim()) qp.set("Search", p.search.trim());

  if (typeof p.bestSeller === "boolean") qp.set("BestSeller", String(p.bestSeller));
  if (typeof p.isNew === "boolean") qp.set("IsNew", String(p.isNew));
  if (typeof p.hasDiscount === "boolean") qp.set("HasDiscount", String(p.hasDiscount));

  if (typeof p.status === "boolean") {
    qp.set("status", String(p.status));
  } else {
    qp.set("status", "true");
  }


  const qs = qp.toString();
  return qs ? `?${qs}` : "";
}

export async function getProducts(params: ProductFilter = {}): Promise<Product[]> {
  const path = `/Product${buildQuery(params)}`;
  const raw = await apiGet(path);

  const list: RawProduct[] = Array.isArray(raw)
    ? raw
    : Array.isArray(raw?.products)
      ? raw.products
      : [];

  return list
    .filter((p) => p?.status !== false)
    .map(normalizeProduct); // 🔥 Əsas dəyişiklik
}


/* -------------------- Product DETAIL -------------------- */

export type ProductDetail = {
  id: number;
  name: string;
  description: string;
  price: number;
  finalPrice: number | null;
  bestSeller: boolean;
  isNew: boolean;

  brandName: string;
  genderName?: string;
  shapeName?: string;
  categoryName?: string;
  thumbnails: string[];
  colorNames?: string[];

  stock?: number;
  mechanismName?: string;           // Kvars və s.
  waterResistanceAtm?: number;      // 10 ATM
  caseSizeMm?: number;              // 27 mm
  materialName?: string;            // Keramik
  siferblatMaterialName?: string;   // Safir (dial materialı)

  caseThicknessMm?: number;
  size?: string;

  stoneMaterialId?: number | null;
  stoneMaterialName?: string | null;

  strapMaterialId?: number | null;
  strapMaterialName?: string | null;

  accessoryTypeId?: number | null;
  accessoryTypeName?: string | null;

  status?: boolean;
  categoryId?: number;
};

export async function getProductById(id: number): Promise<ProductDetail> {
  const data = await apiGet(`/Product/${id}`);
  const p = (data?.product ?? data) as Partial<ProductDetail> & Record<string, unknown>;

  const API = (process.env.API_SAAT_BASE_URL ?? "").trim();
  const ROOT = API.replace(/\/api\/?$/i, "");
  const toAbs = (rel: string) => `${ROOT}/${String(rel ?? "").replace(/^\/+/, "")}`;

  const thumbs = Array.isArray(p.thumbnails) ? p.thumbnails.map(toAbs) : [];

  const toNum = (v: unknown): number | undefined =>
    Number.isFinite(Number(v)) ? Number(v) : undefined;

  return {
    id: Number(p.id ?? id),
    name: String(p.name ?? ""),
    description: String(p.description ?? ""),
    price: Number(p.price ?? 0),
    finalPrice:
      p.finalPrice === null || p.finalPrice === undefined
        ? null
        : Number(p.finalPrice),
    bestSeller: Boolean(p.bestSeller),
    isNew: Boolean(p.isNew),

    brandName: String(p.brandName ?? ""),
    genderName: typeof p.genderName === "string" ? p.genderName : undefined,
    shapeName: typeof p.shapeName === "string" ? p.shapeName : undefined,
    categoryName: typeof p.categoryName === "string" ? p.categoryName : undefined,

    categoryId: p.categoryId == null ? undefined : Number(p.categoryId),

    thumbnails: thumbs,
    colorNames: Array.isArray(p.colorNames) ? p.colorNames : undefined,

    stock: toNum(p.stock),
    mechanismName: typeof p.mechanismName === "string" ? p.mechanismName : undefined,
    waterResistanceAtm: toNum(p.waterResistanceAtm),
    caseSizeMm: toNum(p.caseSizeMm),
    caseThicknessMm: toNum(p.caseThicknessMm),
    size: typeof p.size === "string" ? p.size : undefined,
    materialName: typeof p.materialName === "string" ? p.materialName : undefined,
    siferblatMaterialName:
      typeof p.siferblatMaterialName === "string" ? p.siferblatMaterialName : undefined,

    stoneMaterialId: p.stoneMaterialId == null ? null : Number(p.stoneMaterialId),
    stoneMaterialName:
      p.stoneMaterialName == null ? null : String(p.stoneMaterialName),

    strapMaterialId: p.strapMaterialId == null ? null : Number(p.strapMaterialId),
    strapMaterialName:
      p.strapMaterialName == null ? null : String(p.strapMaterialName),

    accessoryTypeId: p.accessoryTypeId == null ? null : Number(p.accessoryTypeId),
    accessoryTypeName:
      p.accessoryTypeName == null ? null : String(p.accessoryTypeName),

    status: p.status === undefined ? true : Boolean(p.status),
  };
}

export type PagedResponse<T> = {
  items: T[];
  total: number;
};

export async function getProductsPaged(
  params: ProductFilter = {}
): Promise<PagedResponse<Product>> {
  const path = `/Product${buildQuery(params)}`;
  const raw = await apiGet(path);

  // API müxtəlif formatlarda gələ bilər: array / {products: []} / {items: []} və s.
  const list: RawProduct[] = Array.isArray(raw)
    ? raw
    : Array.isArray(raw?.products)
      ? raw.products
      : Array.isArray(raw?.items)
        ? raw.items
        : Array.isArray(raw?.data)
          ? raw.data
          : [];

  // total adları da fərqli ola bilər: total / Total / count və s.
  const totalRaw =
    raw?.total ?? raw?.Total ?? raw?.count ?? raw?.Count ?? raw?.totalCount ?? raw?.TotalCount;

  const items = list
    .filter((p) => p?.status !== false)
    .map(normalizeProduct);

  const total =
    Number.isFinite(Number(totalRaw)) ? Number(totalRaw) : items.length;

  return { items, total };
}
