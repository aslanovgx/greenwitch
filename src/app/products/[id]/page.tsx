import { notFound } from 'next/navigation';
import ProductsDetail from './ProductsDetail';
import SimilarProducts from './SimilarProducts';
import Contact from '@/components/home/Contact/Contact';
import mehsullar from '@/components/Mock/Home/mehsullar.json';

// ✅ metadata workaround — build xətalarının qarşısını alır
export async function generateMetadata() {
    return { title: 'Product Page' };
}

export default async function ProductDetailPage({
    params,
}: {
    params: { id: string };
}) {
    const product = mehsullar.find(item => item.id.toString() === params.id);

    if (!product) return notFound();

    return (
        <>
            <ProductsDetail product={product} />
            <SimilarProducts />
            <Contact />
        </>
    );
}
