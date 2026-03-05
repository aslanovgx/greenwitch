import { apiGet } from "./fetcher";

export type Basic = { id: number; name: string };

type BrandFilter = {
  Gender?: number;
  categoryId?: number;
  status?: boolean;
};

export async function getBrands(params: BrandFilter = {}): Promise<Basic[]> {
  const qp = new URLSearchParams();

  if (params.Gender) qp.set("Gender", String(params.Gender));
  if (params.categoryId) qp.set("categoryId", String(params.categoryId));

  if (typeof params.status === "boolean") {
    qp.set("status", String(params.status));
  } else {
    qp.set("status", "true");
  }

  const qs = qp.toString();
  const raw = await apiGet(`/Product${qs ? `?${qs}` : ""}`);

  const list = Array.isArray(raw?.availableBrands)
    ? raw.availableBrands
    : [];

  return list.map((b: any) => ({
    id: Number(b.id),
    name: String(b.name),
  }));
}