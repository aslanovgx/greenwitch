// src/app/sitemap.ts
import type { MetadataRoute } from "next";
import { getProducts } from "@/lib/api/products";

const BASE_URL = (process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000").replace(/\/+$/, "");

const slugify = (s: string) =>
  (s || "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const urls: MetadataRoute.Sitemap = [];

  // 1) Statik, indekslənən səhifələr
  urls.push(
    { url: `${BASE_URL}/`, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${BASE_URL}/about`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
    { url: `${BASE_URL}/location`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: `${BASE_URL}/products`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
  );

  // 2) Məhsullar
  try {
    const page = await getProducts({ size: 500 });
    const list = Array.isArray(page) ? page : [];
    for (const p of list) {
      const id = Number((p as any)?.id);
      if (!Number.isFinite(id)) continue;
      const brandName = String((p as any)?.brandName ?? "");
      const name = String((p as any)?.name ?? "");
      const pretty = `${slugify(`${brandName} ${name}`)}-${id}`;
      urls.push({
        url: `${BASE_URL}/products/${pretty}`,
        lastModified: new Date((p as any)?.updatedAt ?? Date.now()),
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }
  } catch { /* ignore */ }

  // 3) Kampaniya səhifələri (varsa və indekslənməlidirsə)
  // Məs: backend-dən special-offer-ları çəkib əlavə edə bilərsiniz
  // urls.push({ url: `${BASE_URL}/special-offer/black-friday-2025`, changeFrequency: "daily", priority: 0.7 });

  return urls;
}
