import { notFound } from 'next/navigation';
import ProductsDetail from './ProductsDetail';
import mehsullar from '@/components/Mock/Home/mehsullar.json';
import SimilarProducts from './SimilarProducts';
import Contact from '@/components/home/Contact/Contact';

// ✅ Next.js type clash problemini bypass edir
export async function generateMetadata() {
    return { title: 'Product Page' };
}

export default async function Page({ params }: { params: { id: string } }) {
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
