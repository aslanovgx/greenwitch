import { notFound } from 'next/navigation';
import ProductsDetail from './ProductsDetail';
import mehsullar from '@/components/Mock/Home/mehsullar.json';
import SimilarProducts from './SimilarProducts';
import Contact from '@/components/home/Contact/Contact';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

// SEO üçün lazımlı metadata (async və await ilə)
export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const product = mehsullar.find(p => p.id.toString() === id);
  return {
    title: product?.title || 'Product Page',
    description: product?.desc || 'Product details and information.',
  };
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const product = mehsullar.find(p => p.id.toString() === id);
  if (!product) return notFound();

  return (
    <>
      <ProductsDetail product={product} />
      <SimilarProducts />
      <Contact />
    </>
  );
}
