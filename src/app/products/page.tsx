// src/app/products/page.tsx
import { Suspense } from "react";
import Contact from "@/components/home/Contact/Contact";
import FilterCards from "@/components/products/FilterCards/FilterCards";
import FilterSection from "@/components/products/FilterSection/FilterSection";

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
