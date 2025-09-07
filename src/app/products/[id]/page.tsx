// src/app/products/[id]/page.tsx
import { notFound } from "next/navigation";
import ProductsDetail from "./ProductsDetail";
import SimilarProducts from "./SimilarProducts";
import Contact from "@/components/home/Contact/Contact";
import { getProductById, getProducts } from "@/lib/api/products";
import { getBrands } from "@/lib/api/brand"; // <<<< ƏLAVƏ ET

type Params = Promise<{ id: string }>;

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

  // ümumi product list
  const list = await getProducts({ size: 60 }).catch(() => []);

  // eyni brendin məhsullarını filterlə
  const norm = (s: string | undefined | null) => String(s ?? "").trim().toLowerCase();
  const target = norm((product as any).brandName);

  const sameBrand = (Array.isArray(list) ? list : []).filter(
    (p: any) => Number(p?.id) !== Number(product.id) && norm(p?.brandName) === target
  );

  // 1) detail-dan brandId
  const brandIdFromDetail = Number((product as any)?.brandId);
  const isValid = (v: unknown) => Number.isFinite(Number(v)) && Number(v) > 0;

  // 2) list-dən brandId
  const brandIdFromList = (() => {
    const found = sameBrand.find((x: any) => isValid(x?.brandId));
    return found ? Number(found.brandId) : undefined;
  })();

  // 3) brendlərdən ad ilə tap
  let brandIdFromName: number | undefined = undefined;
  if (!isValid(brandIdFromDetail) && !isValid(brandIdFromList) && target) {
    try {
      const brands = await getBrands(); // [{id, name}, ...] dönür fərz edirik
      const found = Array.isArray(brands)
        ? brands.find((b: any) => norm(b?.name) === target)
        : undefined;
      if (found && isValid(found.id)) brandIdFromName = Number(found.id);
    } catch {
      // ignore
    }
  }

  const resolvedBrandId =
    isValid(brandIdFromDetail) ? Number(brandIdFromDetail)
    : isValid(brandIdFromList) ? Number(brandIdFromList)
    : isValid(brandIdFromName) ? Number(brandIdFromName)
    : undefined;

  return (
    <>
      <ProductsDetail product={product} />
      <SimilarProducts initialProducts={sameBrand} brandId={resolvedBrandId} />
      <Contact />
    </>
  );
}
