"use client";

import { useState } from "react";
import Contact from "@/components/home/Contact/Contact";
import FilterCards from "@/components/products/FilterCards/FilterCards";
import FilterSection from "@/components/products/FilterSection/FilterSection";

export default function ProductsPage() {
  const [filters, setFilters] = useState({});

  return (
    <>
      <section>
        <FilterSection onFilterChange={setFilters} />
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
