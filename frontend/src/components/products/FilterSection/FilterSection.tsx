"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./FilterSection.module.css";
import FilterItem from "@/components/Filter/FilterItem";

import { Option } from "@/types/Option";
import { getAllGenders } from "@/lib/api/options";

type Props = {
  setFilters: React.Dispatch<React.SetStateAction<{
    genderId?: number;
    brandId?: number;
    colorId?: number;
    shapeId?: number;
    sort?: string;
  }>>;
};

export default function FilterSection({ setFilters }: Props) {
  const [openFilter, setOpenFilter] = useState<string | null>(null);
  const filterRef = useRef<HTMLDivElement>(null);

  const [genders, setGenders] = useState<Option[]>([]);
  const [selectedGender, setSelectedGender] = useState<number | undefined>();

  useEffect(() => {
    async function fetchFilters() {
      try {
        const gendersData = await getAllGenders();
        console.log("✅ Genders in FilterSection:", gendersData);
        setGenders(gendersData);
      } catch (err) {
        console.error("❌ Filter data loading error:", err);
      }
    }

    fetchFilters();
  }, []);

  useEffect(() => {
    setFilters({
      genderId: selectedGender,
    });
  }, [selectedGender, setFilters]);



  return (
    <div ref={filterRef} className={styles.flterSection}>
      <ul className={styles.leftSide}>
        <li>Filtr:</li>
        {/* <FilterItem
          title="Rəng"
          options={colors}
          selectedId={colors.find((c) => c.name === selectedFilters.reng)?.id}
          onSelect={(option) => setSelectedFilters((prev) => ({ ...prev, reng: option.name }))}
          onClear={() => setSelectedFilters((prev) => ({ ...prev, reng: undefined }))}
          isOpen={openFilter === "reng"}
          toggle={() => toggleFilter("reng")}
        /> */}
        {/* <FilterItem
          title="Brendlər"
          options={brands}
          selectedId={selectedBrand}
          onSelect={(opt) => setSelectedBrand(opt.id)}
          onClear={() => setSelectedBrand(undefined)}
          isOpen={openFilter === "brand"}
          toggle={() =>
            setOpenFilter(openFilter === "brand" ? null : "brand")
          }
        /> */}
        <FilterItem
          title="Cins"
          options={genders}
          selectedId={selectedGender}
          onSelect={(opt) => setSelectedGender(opt.id)}
          onClear={() => setSelectedGender(undefined)}
          isOpen={openFilter === "gender"}
          toggle={() =>
            setOpenFilter(openFilter === "gender" ? null : "gender")
          }
        />
        {/* <FilterItem
          title="Forma"
          options={shapes}
          selectedId={shapes.find((s) => s.name === selectedFilters.forma)?.id}
          onSelect={(option) => setSelectedFilters((prev) => ({ ...prev, forma: option.name }))}
          onClear={() => setSelectedFilters((prev) => ({ ...prev, forma: undefined }))}
          isOpen={openFilter === "forma"}
          toggle={() => toggleFilter("forma")}
        /> */}
      </ul>

      <ul className={styles.rightSide}>
        {/* <FilterItem
          title="Sırala"
          options={sortOptions}
          selectedId={sortOptions.find((opt) => opt.name === selectedFilters.sirala)?.id}
          onSelect={(option) => setSelectedFilters((prev) => ({ ...prev, sirala: option.name }))}
          onClear={() => setSelectedFilters((prev) => ({ ...prev, sirala: undefined }))}
          isOpen={openFilter === "sirala"}
          toggle={() => toggleFilter("sirala")}
        /> */}
      </ul>
    </div>
  );
}
