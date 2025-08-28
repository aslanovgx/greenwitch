// Server-only util (RSC)
export type ProductFilter = {
  genderId?: number;
  brandId?: number;
  shapeId?: number;
  categoryId?: number;
  colorId?: number;            // tək rəng qalırsa saxla
  colorIds?: number[];         // ⬅️ array dəstəyi
  page?: number;
  size?: number;
  search?: string;
  bestSeller?: boolean;
};

function apiBase() {
  // BACKEND_URL varsa onu, yoxdursa NEXT_PUBLIC_API_URL istifadə et
  const raw = (process.env.BACKEND_URL ?? process.env.NEXT_PUBLIC_API_URL ?? "").trim();
  if (!raw) throw new Error("BACKEND_URL/NEXT_PUBLIC_API_URL düzgün təyin edilməyib");

  const noTrail = raw.replace(/\/+$/g, "");   // sondakı /-ları at
  // sonda /api yoxdursa əlavə et
  return /\/api$/i.test(noTrail) ? noTrail : `${noTrail}/api`;
}

function buildQuery(p: ProductFilter = {}) {
  const qp = new URLSearchParams();

  if (p.genderId != null) qp.set("genderId", String(p.genderId));
  if (p.brandId != null) qp.set("brandId", String(p.brandId));
  if (p.shapeId != null) qp.set("shapeId", String(p.shapeId));
  if (p.categoryId != null) qp.set("categoryId", String(p.categoryId));

  // tək rəng (köhnə versiyanı pozmamaq üçün)
  if (p.colorId != null) qp.set("colorId", String(p.colorId));

  // array rənglər (sənin API-n “colorIds[]” gözləyirdi)
  if (Array.isArray(p.colorIds)) {
    for (const id of p.colorIds) {
      if (id != null) qp.append("colorIds[]", String(id));
    }
  }

  if (p.page != null) qp.set("page", String(p.page));
  if (p.size != null) qp.set("size", String(p.size));

  if (p.search?.trim()) qp.set("search", p.search.trim());

  if (typeof p.bestSeller === "boolean") qp.set("bestSeller", String(p.bestSeller));

  const qs = qp.toString();
  return qs ? `?${qs}` : "";
}

export async function getProductsServer(params: ProductFilter = {}) {
  // HƏR ZAMAN .../api/Product formasını qaytarır
  const base = apiBase();
  const url = `${base}/Product${buildQuery(params)}`;

  const res = await fetch(url, {
    // SSR/RSC üçün ISR nümunəsi (istəsən no-store et)
    next: { revalidate: 60 },
    headers: {
      Accept: "application/json",
      "ngrok-skip-browser-warning": "1", // ngrok üçün
    },
  });

  if (!res.ok) throw new Error(`GET ${url} -> ${res.status}`);

  const raw = await res.json();
  return Array.isArray(raw)
    ? raw
    : Array.isArray(raw?.products)
    ? raw.products
    : [];
}
