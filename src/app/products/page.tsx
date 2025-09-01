// src/app/products/page.tsx
import type { Metadata } from "next";
import { Suspense } from "react";
import Contact from "@/components/home/Contact/Contact";
import FilterCards from "@/components/products/FilterCards/FilterCards";
import FilterSection from "@/components/products/FilterSection/FilterSection";

// ✅ canonical və title üçün
export async function generateMetadata(
  { searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }
): Promise<Metadata> {
  const raw = Array.isArray(searchParams.page) ? searchParams.page[0] : searchParams.page;
  const page = Number(raw) > 0 ? Number(raw) : 1;

  const basePath = "/products"; // sizin route
  const title = page > 1 ? `Məhsullar – səhifə ${page}` : "Məhsullar";

  return {
    title,
    description: "Greenwitch mağazasında saatlar və aksesuarlar",
    alternates: {
      // ✅ page=1 → /products; qalanları query ilə
      canonical: page === 1 ? basePath : `${basePath}?page=${page}`,
    },
  };
}

export default function ProductsPage() {
  return (
    <>
      <section>
        <Suspense fallback={<div className="py-10 text-center">Filtrlər yüklənir…</div>}>
          <FilterSection />
        </Suspense>
      </section>

      <section>
        <Suspense fallback={<div className="py-10 text-center">Məhsullar yüklənir…</div>}>
          <FilterCards />
        </Suspense>
      </section>

      <section>
        <Contact />
      </section>
    </>
  );
}
