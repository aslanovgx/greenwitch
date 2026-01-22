// src/lib/utils/feSearch.ts
import type { RawProduct } from "@/types/Product";

export type Indexed = {
  id: number;
  name: string;
  brandName: string;
  description: string;
  price: number;
  discountPrice: number | null;
  images: string[];
};

export function normalize(s: any): string {
  return String(s ?? "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, ""); // diakritik sil
}

export function rawToIndexed(p: RawProduct, buildImageUrl: (rel: string) => string): Indexed {
  const imgs = (Array.isArray(p.images) ? p.images : [])
    .filter((x): x is string => typeof x === "string" && x.trim() !== "")
    .map(buildImageUrl);

  const priceNum =
    typeof p.price === "number" ? p.price : Number(p.price) || 0;

  const discountNum =
    p.discountPrice == null
      ? null
      : (typeof p.discountPrice === "number"
          ? p.discountPrice
          : (Number(p.discountPrice) || 0));

  return {
    id: Number(p.id),
    name: String(p.name ?? ""),
    brandName: String((p as any).brandName ?? ""),
    description: String(p.description ?? ""),
    price: priceNum,
    discountPrice: discountNum,
    images: imgs,
  };
}

export function matchesQuery(prod: Indexed, q: string): boolean {
  const n = normalize(q);
  if (!n) return true;
  return (
    normalize(prod.name).includes(n) ||
    normalize(prod.brandName).includes(n) ||
    normalize(prod.description).includes(n)
  );
}
