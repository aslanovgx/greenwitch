import { notFound } from "next/navigation";
import ProductsDetail from "./ProductsDetail";
import SimilarProducts from "./SimilarProducts";
import Contact from "@/components/home/Contact/Contact";
import { getProductById } from "@/lib/api/products";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props) {
  const id = Number(params.id);
  const product = await getProductById(id).catch(() => null);

  return {
    title: product?.name || "Product Page",
    description: product?.description || "Product details and information.",
  };
}

export default async function Page({ params }: Props) {
  const id = Number(params.id);
  const product = await getProductById(id).catch(() => null);
  if (!product) return notFound();

  return (
    <>
      <ProductsDetail product={product} />
      <SimilarProducts />
      <Contact />
    </>
  );
}
