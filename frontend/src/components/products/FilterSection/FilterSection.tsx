"use client";

import { useState, useEffect, useRef } from 'react';
import styles from './FilterSection.module.css';
import FilterItem from "@/components/Filter/FilterItem";
import { Option } from "@/types/Option";

import { getAllGenders } from "@/lib/api/genders";
import { getAllBrands } from "@/lib/api/brands";
import { getAllColors } from "@/lib/api/colors";
import { getAllShapes } from "@/lib/api/shapes";
import { Product } from "@/types/Product";

type Filters = {
  genderId?: number;
  brandId?: number;
  colorId?: number;
  shapeId?: number;
  sort?: string;
};

type Props = {
  setFilters: (filters: Filters) => void;
};

export default function FilterSection({ setFilters }: Props) {
  const [openFilter, setOpenFilter] = useState<string | null>(null);
  const filterRef = useRef<HTMLDivElement>(null);

  const [genders, setGenders] = useState<Product[]>([]);
  const [brands, setBrands] = useState<Product[]>([]);
  const [colors, setColors] = useState<Product[]>([]);
  const [shapes, setShapes] = useState<Product[]>([]);

  const sortOptions: Option[] = [
    { id: 1, name: "Yeni Gələnlər" },
    { id: 2, name: "Endirimli Məhsullar" },
    { id: 3, name: "Qiymət (Aşağıdan Yuxarıya)" },
    { id: 4, name: "Qiymət (Yuxarıdan Aşağıya)" },
  ];

  const [selectedFilters, setSelectedFilters] = useState<{
    cins?: string;
    brendler?: string;
    reng?: string;
    forma?: string;
    sirala?: string;
  }>({});

  const toggleFilter = (filterName: string) => {
    setOpenFilter(prev => (prev === filterName ? null : filterName));
  };

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [gendersData, brandsData, colorsData, shapesData] = await Promise.all([
          getAllGenders(),
          getAllBrands(),
          getAllColors(),
          getAllShapes()
        ]);

        setGenders(gendersData);
        setBrands(brandsData);
        setColors(colorsData);
        setShapes(shapesData);
      } catch (error) {
        console.error("Filter optionlarını yükləmə zamanı xəta:", error);
      }
    };

    fetchOptions();
  }, []);

  // Convert string selectedFilters → numeric filter IDs
  useEffect(() => {
    setFilters({
      genderId: genders.find(g => g.name === selectedFilters.cins)?.id,
      brandId: brands.find(b => b.name === selectedFilters.brendler)?.id,
      colorId: colors.find(c => c.name === selectedFilters.reng)?.id,
      shapeId: shapes.find(s => s.name === selectedFilters.forma)?.id,
      sort: selectedFilters.sirala,
    });
  }, [selectedFilters, genders, brands, colors, shapes, setFilters]);

  return (
    <div ref={filterRef} className={styles.flterSection}>
      <ul className={styles.leftSide}>
        <li>Filtr:</li>
        <FilterItem
          title="Rəng"
          options={colors}
          selectedId={colors.find(c => c.name === selectedFilters.reng)?.id}
          onSelect={(option) =>
            setSelectedFilters(prev => ({ ...prev, reng: option.name }))
          }
          onClear={() => setSelectedFilters(prev => ({ ...prev, cins: undefined }))}
          isOpen={openFilter === 'cins'}
          toggle={() => toggleFilter('cins')}
        />
        <FilterItem
          title="Brendlər"
          options={brands}
          selectedId={brands.find(b => b.name === selectedFilters.brendler)?.id}
          onSelect={(option) =>
            setSelectedFilters(prev => ({ ...prev, brendler: option.name }))
          }
          onClear={() => setSelectedFilters(prev => ({ ...prev, brendler: undefined }))}
          isOpen={openFilter === 'brendler'}
          toggle={() => toggleFilter('brendler')}
        />
        <FilterItem
          title="Cins"
          options={genders}
          selectedId={genders.find(g => g.name === selectedFilters.cins)?.id}
          onSelect={(option) =>
            setSelectedFilters(prev => ({ ...prev, cins: option.name }))
          }
          onClear={() => setSelectedFilters(prev => ({ ...prev, reng: undefined }))}
          isOpen={openFilter === 'reng'}
          toggle={() => toggleFilter('reng')}
        />
        <FilterItem
          title="Forma"
          options={shapes}
          selectedId={shapes.find(s => s.name === selectedFilters.forma)?.id}
          onSelect={(option) =>
            setSelectedFilters(prev => ({ ...prev, forma: option.name }))
          }
          onClear={() => setSelectedFilters(prev => ({ ...prev, forma: undefined }))}
          isOpen={openFilter === 'forma'}
          toggle={() => toggleFilter('forma')}
        />
      </ul>

      <ul className={styles.rightSide}>
        <FilterItem
          title="Sırala"
          options={sortOptions}
          selectedId={sortOptions.find(opt => opt.name === selectedFilters.sirala)?.id}
          onSelect={(option) =>
            setSelectedFilters(prev => ({ ...prev, sirala: option.name }))
          }
          onClear={() =>
            setSelectedFilters(prev => ({ ...prev, sirala: undefined }))
          }
          isOpen={openFilter === "sirala"}
          toggle={() => toggleFilter("sirala")}
        />
      </ul>
    </div>
  );
}
