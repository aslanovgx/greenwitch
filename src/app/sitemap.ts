// src/app/sitemap.ts
import type { MetadataRoute } from "next";
import { getProducts } from "@/lib/api/products";

/* -------------------- Const & Utils -------------------- */
const BASE_URL = (process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000").replace(/\/+$/, "");

const slugify = (s: string) =>
  (s || "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();

const isRecord = (v: unknown): v is Record<string, unknown> =>
  typeof v === "object" && v !== null;

const toNum = (v: unknown): number | undefined => {
  const n = Number(v);
  return Number.isFinite(n) ? n : undefined;
};

const toStr = (v: unknown): string | undefined =>
  typeof v === "string" ? v : undefined;

const toDate = (v: unknown): Date | undefined => {
  if (v instanceof Date && !Number.isNaN(+v)) return v;
  if (typeof v === "string" || typeof v === "number") {
    const d = new Date(v);
    if (!Number.isNaN(+d)) return d;
  }
  return undefined;
};

/* -------------------- Minimal Product type -------------------- */
type ProductMinimal = {
  id: number;
  name?: string;
  brandName?: string;
  updatedAt?: Date;
  createdAt?: Date;
};

function toProductMinimal(x: unknown): ProductMinimal | null {
  if (!isRecord(x)) return null;

  const id = toNum(x.id);
  if (!id) return null;

  const name = toStr(x.name);
  const brandName = toStr(x.brandName);
  const updatedAt = toDate(x.updatedAt);
  const createdAt = toDate(x.createdAt);

  return { id, name, brandName, updatedAt, createdAt };
}

/* -------------------- Sitemap -------------------- */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const urls: MetadataRoute.Sitemap = [];

  // 1) Statik, indekslənən səhifələr
  urls.push(
    { url: `${BASE_URL}/`, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${BASE_URL}/about`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
    { url: `${BASE_URL}/location`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: `${BASE_URL}/products`, lastModified: now, changeFrequency: "daily", priority: 0.9 }
  );

  // 2) Məhsullar
  try {
    const page = await getProducts({ size: 500 });
    const list = Array.isArray(page) ? page : [];

    for (const item of list) {
      const p = toProductMinimal(item);
      if (!p) continue;

      const brand = p.brandName ?? "";
      const name = p.name ?? "";
      const pretty = `${slugify(`${brand} ${name}`)}-${p.id}`;

      const lastModified = p.updatedAt ?? p.createdAt ?? now;

      urls.push({
        url: `${BASE_URL}/products/${pretty}`,
        lastModified,
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }
  } catch {
    // API xətti olsa, sitemap yenə də statik hissələrlə qayıdır
  }

  // 3) Kampaniyalar (istəsən sonradan burada əlavə edərsən)

  return urls;
}
