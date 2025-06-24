import { notFound } from 'next/navigation';
import ProductsDetail from './ProductsDetail';
import mehsullar from '@/components/Mock/Home/mehsullar.json';
import SimilarProducts from './SimilarProducts';
import Contact from '@/components/home/Contact/Contact';

export default async function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const productId = params.id;
  const product = mehsullar.find((item) => item.id.toString() === productId);

  if (!product) return notFound();

  return (
    <>
      <ProductsDetail product={product} />
      <SimilarProducts />
      <Contact />
    </>
  );
}
