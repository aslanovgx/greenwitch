"use client";

import { useState } from "react";
import FilterCards from "@/components/products/FilterCards/FilterCards";
import FilterSection from "@/components/products/FilterSection/FilterSection";

// İD-lə işləyən tip
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
    <div>
      <FilterSection setFilters={setFilters} />
      <FilterCards filters={filters} />
    </div>
  );
}
