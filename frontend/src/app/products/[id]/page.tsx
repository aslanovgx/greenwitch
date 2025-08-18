import { notFound } from 'next/navigation';
import ProductsDetail from './ProductsDetail';
import SimilarProducts from './SimilarProducts';
import Contact from '@/components/home/Contact/Contact';
import { Product } from '@/types/Product';

type Props = {
  params: { id: string };
};

export default async function Page({ params }: Props) {
  const { id } = params;

  // ✅ API çağırışı
  const res = await fetch(`${process.env.API_URL}/api/Product/${id}`, {
    cache: "no-store",
  });


  if (!res.ok) {
    return notFound();
  }

  const product: Product = await res.json();

  if (!product) return notFound();

  return (
    <>
      <ProductsDetail product={product} />
      <SimilarProducts />
      <Contact />
    </>
  );
}
