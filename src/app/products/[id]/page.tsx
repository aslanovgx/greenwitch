// src/app/products/[id]/page.tsx
import { notFound } from "next/navigation";
import ProductsDetail from "./ProductsDetail";
import SimilarProducts from "./SimilarProducts";
import Contact from "@/components/home/Contact/Contact";
import { getProductById, getProducts } from "@/lib/api/products";
import { getBrands } from "@/lib/api/brand";
import type { RawProduct } from "@/types/Product";

type Params = Promise<{ id: string }>;

// Köməkçilər
const norm = (s: string | undefined | null) => String(s ?? "").trim().toLowerCase();
const toNum = (v: unknown): number | undefined => {
  const n = Number(v);
  return Number.isFinite(n) && n > 0 ? n : undefined;
};
const isValid = (v: unknown) => typeof toNum(v) === "number";
const isRecord = (v: unknown): v is Record<string, unknown> =>
  typeof v === "object" && v !== null;

// Sadə list tipi (yalnız bizə lazım olan sahələr)
type ListItem = Pick<RawProduct, "id" | "brandId" | "brandName">;

// xam list → təhlükəsiz ListItem[]
function toList(input: unknown): ListItem[] {
  if (!Array.isArray(input)) return [];
  const out: ListItem[] = [];
  for (const v of input) {
    if (!isRecord(v)) continue;

    const id = toNum(v.id);
    if (!id) continue;

    const brandId = toNum(v.brandId);
    const brandName = typeof v.brandName === "string" ? v.brandName : undefined;

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
    const id = toNum(v.id);
    const name = typeof v.name === "string" ? v.name : undefined;
    if (id && name) out.push({ id, name });
  }
  return out;
}

export async function generateMetadata({ params }: { params: Params }) {
  const { id } = await params;
  const product = await getProductById(Number(id)).catch(() => null);

  return {
    title: product?.name || "Product Page",
    description: product?.description || "Product details and information.",
  };
}

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

  // 1) detail-dən brandId (əgər BE qaytarırsa; ProductDetail tipinə əlavə etməmisənsə belə təhlükəsiz oxuyuruq)
  const brandIdFromDetail = toNum((product as unknown as { brandId?: unknown }).brandId);

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
    // 👇 ehtiyat üçün burada da çıxarırıq
    sameBrandFull = sameBrandFull.filter(p => Number(p?.id) !== Number(product.id));
  }

  return (
    <>
      <ProductsDetail product={product} />
      {/* sameBrand ListItem[] olsa da, SimilarProducts RawProduct[] istəyir — struktur uyğun gəlir */}
      <SimilarProducts initialProducts={sameBrandFull} brandId={resolvedBrandId} excludeId={product.id} />
      <Contact />
    </>
  );
}
