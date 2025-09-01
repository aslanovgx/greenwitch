"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import styles from "./FilterSection.module.css";
import { SORT_LABEL_TO_CODE, SORT_CODE_TO_LABEL, SORT_LABELS, isValidSort } from "@/constants/sort";
import FilterItem from "@/components/Filter/FilterItem";
import { getBrands } from "@/lib/api/brand";
import { getShapes } from "@/lib/api/shape";
import { getColors } from "@/lib/api/color";
import { getGenders } from "@/lib/api/gender";

type Opt = { id: number; name: string };


export default function FilterSection() {
  const [openFilter, setOpenFilter] = useState<string | null>(null);
  const filterRef = useRef<HTMLDivElement>(null);

  const [brands, setBrands] = useState<Opt[]>([]);
  const [shapes, setShapes] = useState<Opt[]>([]);
  const [colors, setColors] = useState<Opt[]>([]);
  const [genders, setGenders] = useState<Opt[]>([]);
  const [loading, setLoading] = useState(true);

  // URL sync
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Ekranda göstərilən seçilmiş adlar (label)
  const [selectedFilters, setSelectedFilters] = useState<{
    cins?: string;
    brendler?: string;
    reng?: string;
    forma?: string;
    sirala?: string;
  }>({});

  const toggleFilter = (filterName: string) => {
    setOpenFilter((prev) => (prev === filterName ? null : filterName));
  };

  /* -------- Outside click (pointerdown) -------- */
  useEffect(() => {
    const onPointerDown = (e: PointerEvent) => {
      const el = filterRef.current;
      if (el && !el.contains(e.target as Node)) setOpenFilter(null);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  /* -------- Dataları çək -------- */
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const [b, s, c, g] = await Promise.all([
          getBrands(),
          getShapes(),
          getColors(),
          getGenders(),
        ]);
        setBrands(b ?? []);
        setShapes(s ?? []);
        setColors(c ?? []);
        setGenders(g ?? []);

        // URL-də id varsa, label-ları doldur (refresh zamanı)
        const brandId = Number(searchParams.get("brandId") || 0);
        const genderId = Number(searchParams.get("genderId") || 0);
        const colorId = Number(searchParams.get("colorId") || 0);
        const shapeId = Number(searchParams.get("shapeId") || 0);
        const sortCode = searchParams.get("sort") || ""; // <-- əlavə

        setSelectedFilters({
          brendler: (b ?? []).find((x) => x.id === brandId)?.name,
          cins: (g ?? []).find((x) => x.id === genderId)?.name,
          reng: (c ?? []).find((x) => x.id === colorId)?.name,
          forma: (s ?? []).find((x) => x.id === shapeId)?.name,
          sirala: isValidSort(sortCode) ? SORT_CODE_TO_LABEL[sortCode] : undefined,
        });
      } catch (e) {
        console.error("FilterSection fetch error:", e);
        setBrands([]);
        setShapes([]);
        setColors([]);
        setGenders([]);
      } finally {
        setLoading(false);
      }
    })();
    // yalnız ilk yükləmə üçün; URL dəyişimini aşağıdakı effekt idarə edir
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* -------- Options (memo) -------- */
  const brandOptions = useMemo(() => brands.map((b) => b.name), [brands]);
  const shapeOptions = useMemo(() => shapes.map((c) => c.name), [shapes]);
  const colorOptions = useMemo(() => colors.map((c) => c.name), [colors]);
  const genderOptions = useMemo(() => genders.map((g) => g.name), [genders]);

  /* -------- URL yazıcı util -------- */
  const setQuery = (key: string, value?: string | number) => {
    const sp = new URLSearchParams(searchParams.toString());
    if (value !== undefined && value !== null && String(value).length > 0) {
      sp.set(key, String(value));
    } else {
      sp.delete(key);
    }
    const qs = sp.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  /* -------- Seçim handler-ları (öncə bağla, sonra URL) -------- */
  const onSelectGender = (label?: string) => {
    const id = genders.find((x) => x.name === label)?.id;
    setSelectedFilters((prev) => ({ ...prev, cins: label }));
    setOpenFilter(null);
    setQuery("genderId", id);
  };
  const onSelectBrand = (label?: string) => {
    const id = brands.find((x) => x.name === label)?.id;
    setSelectedFilters((prev) => ({ ...prev, brendler: label }));
    setOpenFilter(null);
    setQuery("brandId", id);
  };
  const onSelectColor = (label?: string) => {
    const id = colors.find((x) => x.name === label)?.id;
    setSelectedFilters((prev) => ({ ...prev, reng: label }));
    setOpenFilter(null);
    setQuery("colorId", id);
  };
  const onSelectShape = (label?: string) => {
    const id = shapes.find((x) => x.name === label)?.id;
    setSelectedFilters((prev) => ({ ...prev, forma: label }));
    setOpenFilter(null);
    setQuery("shapeId", id);
  };

  const onSelectSort = (label?: string) => {
    const code = label ? SORT_LABEL_TO_CODE[label as keyof typeof SORT_LABEL_TO_CODE] : undefined;
    setSelectedFilters(prev => ({ ...prev, sirala: label }));
    setOpenFilter(null);
    setQuery("sort", code);
  };





  /* -------- URL dəyişəndə label-ları yenilə -------- */
  useEffect(() => {
    if (!brands.length && !shapes.length && !colors.length && !genders.length) return;

    const brandId = Number(searchParams.get("brandId") || 0);
    const genderId = Number(searchParams.get("genderId") || 0);
    const colorId = Number(searchParams.get("colorId") || 0);
    const shapeId = Number(searchParams.get("shapeId") || 0);
    const sortCode = searchParams.get("sort") || ""; // <-- əlavə

    setSelectedFilters(prev => ({
      ...prev,
      brendler: brands.find(x => x.id === brandId)?.name,
      cins: genders.find(x => x.id === genderId)?.name,
      reng: colors.find(x => x.id === colorId)?.name,
      forma: shapes.find(x => x.id === shapeId)?.name,
      sirala: isValidSort(sortCode) ? SORT_CODE_TO_LABEL[sortCode] : undefined,
    }));
  }, [searchParams, brands, shapes, colors, genders]);

  return (
    <div ref={filterRef} className={styles.flterSection}>
      <ul className={styles.leftSide}>
        <li>Filtr:</li>

        <FilterItem
          title="Cins"
          options={loading ? [] : genderOptions}
          selected={selectedFilters.cins}
          onSelect={onSelectGender}
          onClear={() => onSelectGender(undefined)}
          isOpen={openFilter === "cins"}
          toggle={() => toggleFilter("cins")}
        />

        <FilterItem
          title="Brendlər"
          options={loading ? [] : brandOptions}
          selected={selectedFilters.brendler}
          onSelect={onSelectBrand}
          onClear={() => onSelectBrand(undefined)}
          isOpen={openFilter === "brendler"}
          toggle={() => toggleFilter("brendler")}
        />

        <FilterItem
          title="Rəng"
          options={loading ? [] : colorOptions}
          selected={selectedFilters.reng}
          onSelect={onSelectColor}
          onClear={() => onSelectColor(undefined)}
          isOpen={openFilter === "reng"}
          toggle={() => toggleFilter("reng")}
        />

        <FilterItem
          title="Forma"
          options={loading ? [] : shapeOptions}
          selected={selectedFilters.forma}
          onSelect={onSelectShape}
          onClear={() => onSelectShape(undefined)}
          isOpen={openFilter === "forma"}
          toggle={() => toggleFilter("forma")}
        />
      </ul>

      <ul className={styles.rightSide}>
        <FilterItem
          title="Sırala"
          options={SORT_LABELS} // eyni siyahı iki yerdə yazılmasın
          selected={selectedFilters.sirala}
          onSelect={onSelectSort}
          onClear={() => onSelectSort(undefined)}
          isOpen={openFilter === "sirala"}
          toggle={() => toggleFilter("sirala")}
        />
      </ul>
    </div>
  );
}
