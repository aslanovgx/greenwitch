"use client";

import { useState } from "react";
import Contact from "@/components/home/Contact/Contact";
import FilterCards from "@/components/products/FilterCards/FilterCards";
import FilterSection from "@/components/products/FilterSection/FilterSection";

type Filters = {
  genderId?: number;
  brandId?: number;
  colorId?: number;
  shapeId?: number;
  sort?: string;
};

export default function ProductsPage() {
  const [filters, setFilters] = useState<Filters>({});

  return (
    <>
      <section>
        <FilterSection setFilters={setFilters} />
      </section>

      <section>
        <FilterCards filters={filters} />
      </section>

      <section>
        <Contact />
      </section>
    </>
  );
}
