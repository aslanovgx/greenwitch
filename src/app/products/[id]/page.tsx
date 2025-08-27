import { notFound } from "next/navigation";
import ProductsDetail from "./ProductsDetail";
import SimilarProducts from "./SimilarProducts";
import Contact from "@/components/home/Contact/Contact";
import { getProductById } from "@/lib/api/products";

// ⬇️ params Promise kimi tiplenir
type Params = Promise<{ id: string }>;

export async function generateMetadata(
  { params }: { params: Params }
) {
  const { id } = await params;              // ⬅️ await
  const product = await getProductById(Number(id)).catch(() => null);

  return {
    title: product?.name || "Product Page",
    description: product?.description || "Product details and information.",
  };
}

export default async function Page(
  { params }: { params: Params }
) {
  const { id } = await params;              // ⬅️ await
  const product = await getProductById(Number(id)).catch(() => null);
  if (!product) return notFound();

  return (
    <>
      <ProductsDetail product={product} />
      <SimilarProducts />
      <Contact />
    </>
  );
}
