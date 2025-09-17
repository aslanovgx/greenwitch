// src/app/products/[id]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductsDetail from "../../../components/products/ProductsDetail";
import SimilarProducts from "@/components/products/SimilarProducts";
import Contact from "@/components/home/Contact/Contact";
import { getProductById, getProducts } from "@/lib/api/products";
import { getBrands } from "@/lib/api/brand";
import type { RawProduct } from "@/types/Product";

type Params = Promise<{ id: string }>;

// -- Helpers
const norm = (s: string | undefined | null) => String(s ?? "").trim().toLowerCase();
const toNum = (v: unknown): number | undefined => {
  const n = Number(v);
  return Number.isFinite(n) && n > 0 ? n : undefined;
};
const isValid = (v: unknown) => typeof toNum(v) === "number";
const isRecord = (v: unknown): v is Record<string, unknown> =>
  typeof v === "object" && v !== null;

// Slug helper (kanonikal URL üçün)
const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();

// --- ABSOLUTE image helper (OG üçün həmişə tam URL) ---
const FILE_HOST = (process.env.NEXT_PUBLIC_FILE_HOST ?? "https://api.saat.az").replace(/\/+$/, "");
function toAbsoluteImageUrl(path?: string | null): string | null {
  if (!path) return null;
  if (/^https?:\/\//i.test(path)) return path;
  const clean = String(path).replace(/^\/+/, "");
  return `${FILE_HOST}/${clean}`;
}

// --- Type-safe helperlər (any YOX) ---
function firstThumbnail(p: unknown): string | null {
  const thumbs = (p as { thumbnails?: unknown })?.thumbnails;
  if (Array.isArray(thumbs) && typeof thumbs[0] === "string") {
    return toAbsoluteImageUrl(thumbs[0]);
  }
  return null;
}
function readBrandId(p: unknown): number | undefined {
  const v = (p as { brandId?: unknown })?.brandId;
  const n = Number(v);
  return Number.isFinite(n) && n > 0 ? n : undefined;
}
function readBrandName(v: unknown): string | undefined {
  const name = (v as { brandName?: unknown })?.brandName;
  return typeof name === "string" ? name : undefined;
}
function readName(v: unknown): string | undefined {
  const name = (v as { name?: unknown })?.name;
  return typeof name === "string" ? name : undefined;
}

// Sadə list tipi (yalnız lazım sahələr)
type ListItem = Pick<RawProduct, "id" | "brandId" | "brandName">;

// xam list → təhlükəsiz ListItem[]
function toList(input: unknown): ListItem[] {
  if (!Array.isArray(input)) return [];
  const out: ListItem[] = [];
  for (const v of input) {
    if (!isRecord(v)) continue;

    const id = toNum((v as { id?: unknown }).id);
    if (!id) continue;

    const brandId = toNum((v as { brandId?: unknown }).brandId);
    const brandName = readBrandName(v);

    out.push({ id, brandId, brandName });
  }
  return out;
}

type Brand = { id: number; name: string };

// xam brands → Brand[]
function toBrands(input: unknown): Brand[] {
  if (!Array.isArray(input)) return [];
  const out: Brand[] = [];
  for (const v of input) {
    if (!isRecord(v)) continue;
    const id = toNum((v as { id?: unknown }).id);
    const name = readName(v);
    if (id && name) out.push({ id, name });
  }
  return out;
}

// --- Dinamik metadata ---
export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { id } = await params;
  const numId = Number(id);

  const base = (process.env.NEXT_PUBLIC_BASE_URL ?? "").replace(/\/+$/, "");
  const fallback: Metadata = {
    title: "Məhsul tapılmadı | SaatAZ",
    description: "Məhsul mövcud deyil.",
    alternates: { canonical: `${base}/products/${id}` },
    robots: { index: false, follow: false },
  };

  if (!Number.isFinite(numId)) return fallback;

  const product = await getProductById(numId).catch(() => null);
  if (!product) return fallback;

  // Pretty canonical: /products/brand-name-product-name-123
  const pretty = `${slugify(`${product.brandName ?? ""} ${product.name ?? ""}`)}-${numId}`;
  const canonicalUrl = `${base}/products/${pretty}`;

  const title = `${product.name} | ${product.brandName} | SaatAZ`;
  const descAz = `${product.brandName} ${product.name} – orijinal brend saat. Rəsmi zəmanət və sərfəli qiymət.`;
  const descEn = "Original brand watch with warranty and best price in Azerbaijan.";
  const description = `${descAz} | ${descEn}`;

  const ogImg =
    firstThumbnail(product) ??
    `${base}/og-image.jpg`;

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      type: "website", // "product" bəzən etibarsız parse olunur
      title,
      description: descAz,
      url: canonicalUrl,
      images: [{ url: ogImg, width: 1200, height: 630, alt: product.name ?? "SaatAZ" }],
      siteName: "SaatAZ",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: descAz,
      images: [ogImg],
    },
    robots: { index: true, follow: true },
  };
}

// --- Page: SƏNİN MƏNTİQİN EYNİ QALIR ---
export default async function Page({ params }: { params: Params }) {
  const { id } = await params;

  const product = await getProductById(Number(id)).catch(() => null);
  if (!product) return notFound();

  // Ümumi product list (xam) → təhlükəsiz ListItem[]
  const rawList = await getProducts({ size: 5 }).catch(() => []);
  const list = toList(rawList);

  // Eyni brendə aid məhsullar
  const target = norm(product.brandName);
  const sameBrand: ListItem[] = list.filter(
    (p) => p.id !== product.id && norm(p.brandName) === target
  );

  // 1) detail-dən brandId (type-safe helper)
  const brandIdFromDetail = readBrandId(product);

  // 2) list-dən brandId (eyni brendli məhsullardan birində varsa)
  const brandIdFromList = toNum(sameBrand.find((x) => isValid(x.brandId))?.brandId);

  // 3) brend siyahısından ad ilə tap
  let brandIdFromName: number | undefined;
  if (!brandIdFromDetail && !brandIdFromList && target) {
    try {
      const brandsRaw = await getBrands();
      const brands = toBrands(brandsRaw); // [{id, name}]
      const found = brands.find((b) => norm(b.name) === target);
      brandIdFromName = toNum(found?.id);
    } catch {
      // ignore
    }
  }

  const resolvedBrandId =
    brandIdFromDetail ?? brandIdFromList ?? brandIdFromName ?? undefined;

  let sameBrandFull: RawProduct[] = [];
  if (resolvedBrandId) {
    sameBrandFull = await getProducts({ brandId: resolvedBrandId, size: 10 }).catch(() => []);
    // ehtiyat üçün burada da çıxarırıq
    sameBrandFull = sameBrandFull.filter((p) => Number(p?.id) !== Number(product.id));
  }

  return (
    <>
      <ProductsDetail product={product} />
      <SimilarProducts
        initialProducts={sameBrandFull}
        brandId={resolvedBrandId}
        excludeId={product.id}
      />
      <Contact />
    </>
  );
}
