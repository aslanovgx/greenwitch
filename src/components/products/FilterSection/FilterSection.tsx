"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import styles from "./FilterSection.module.css";
import { SORT_LABEL_TO_CODE, SORT_CODE_TO_LABEL, SORT_LABELS, isValidSort } from "@/constants/sort";
import FilterItem from "@/components/Filter/FilterItem";
import { getBrands } from "@/lib/api/brand";
import { getShapes } from "@/lib/api/shape";
import { getColors } from "@/lib/api/color";

type Opt = { id: number; name: string };

/* Statik genderlər */
const GENDER_STATIC: Opt[] = [
  { id: 1, name: "Kişi" },
  { id: 2, name: "Qadın" },
  { id: 3, name: "Uşaq" },
];

export default function FilterSection() {
  const [openFilter, setOpenFilter] = useState<string | null>(null);
  const filterRef = useRef<HTMLDivElement>(null);

  const [brands, setBrands] = useState<Opt[]>([]);
  const [shapes, setShapes] = useState<Opt[]>([]);
  const [colors, setColors] = useState<Opt[]>([]);
  const [loading, setLoading] = useState(true);

  // URL sync
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // UI-də görünən seçilmiş label-lar
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

  /* Outside click */
  useEffect(() => {
    const onPointerDown = (e: PointerEvent) => {
      const el = filterRef.current;
      if (el && !el.contains(e.target as Node)) setOpenFilter(null);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  /* Dataları çək (brand/shape/color) + ilk URL -> label sync */
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const [b, s, c] = await Promise.all([getBrands(), getShapes(), getColors()]);
        setBrands(b ?? []);
        setShapes(s ?? []);
        setColors(c ?? []);

        const brandId   = Number(searchParams.get("brandId") || 0);
        const genderId  = Number(searchParams.get("Gender") || 0);   // <— Gender (int)
        const colorId   = Number(searchParams.get("colorId") || 0);
        const shapeId   = Number(searchParams.get("shapeId") || 0);
        const sortCode  = searchParams.get("sort") || "";

        setSelectedFilters({
          brendler: (b ?? []).find(x => x.id === brandId)?.name,
          cins:     GENDER_STATIC.find(x => x.id === genderId)?.name,   // <— id -> name
          reng:     (c ?? []).find(x => x.id === colorId)?.name,
          forma:    (s ?? []).find(x => x.id === shapeId)?.name,
          sirala:   isValidSort(sortCode) ? SORT_CODE_TO_LABEL[sortCode] : undefined,
        });
      } catch (e) {
        console.error("FilterSection fetch error:", e);
        setBrands([]); setShapes([]); setColors([]);
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Options (memo) */
  const brandOptions  = useMemo(() => brands.map(b => b.name), [brands]);
  const shapeOptions  = useMemo(() => shapes.map(s => s.name), [shapes]);
  const colorOptions  = useMemo(() => colors.map(c => c.name), [colors]);
  const genderOptions = useMemo(() => GENDER_STATIC.map(g => g.name), []); // <— string[]

  /* URL yazıcı util */
  const writeQuery = (key: string, value?: string) => {
    const sp = new URLSearchParams(searchParams.toString());
    sp.delete("page");
    if (value && value.length > 0) sp.set(key, value);
    else sp.delete(key);
    const qs = sp.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  /* Seçim handler-ları */
  const onSelectGender = (label?: string) => {
    const id = GENDER_STATIC.find(x => x.name === label)?.id;
    setSelectedFilters(prev => ({ ...prev, cins: label }));
    setOpenFilter(null);
    writeQuery("Gender", id ? String(id) : undefined);   // <— Gender=int
  };
  const onSelectBrand = (label?: string) => {
    const id = brands.find(x => x.name === label)?.id;
    setSelectedFilters(prev => ({ ...prev, brendler: label }));
    setOpenFilter(null);
    writeQuery("brandId", id ? String(id) : undefined);
  };
  const onSelectColor = (label?: string) => {
    const id = colors.find(x => x.name === label)?.id;
    setSelectedFilters(prev => ({ ...prev, reng: label }));
    setOpenFilter(null);
    writeQuery("colorId", id ? String(id) : undefined);
  };
  const onSelectShape = (label?: string) => {
    const id = shapes.find(x => x.name === label)?.id;
    setSelectedFilters(prev => ({ ...prev, forma: label }));
    setOpenFilter(null);
    writeQuery("shapeId", id ? String(id) : undefined);
  };
  const onSelectSort = (label?: string) => {
    const code = label ? SORT_LABEL_TO_CODE[label as keyof typeof SORT_LABEL_TO_CODE] : undefined;
    setSelectedFilters(prev => ({ ...prev, sirala: label }));
    setOpenFilter(null);
    writeQuery("sort", code);
  };

  /* URL dəyişəndə label-ları yenilə */
  useEffect(() => {
    if (!brands.length && !shapes.length && !colors.length) return;

    const brandId   = Number(searchParams.get("brandId") || 0);
    const genderId  = Number(searchParams.get("Gender") || 0);  // <— Gender (int)
    const colorId   = Number(searchParams.get("colorId") || 0);
    const shapeId   = Number(searchParams.get("shapeId") || 0);
    const sortCode  = searchParams.get("sort") || "";

    setSelectedFilters(prev => ({
      ...prev,
      brendler: brands.find(x => x.id === brandId)?.name,
      cins:     GENDER_STATIC.find(x => x.id === genderId)?.name, // <— id -> name
      reng:     colors.find(x => x.id === colorId)?.name,
      forma:    shapes.find(x => x.id === shapeId)?.name,
      sirala:   isValidSort(sortCode) ? SORT_CODE_TO_LABEL[sortCode] : undefined,
    }));
  }, [searchParams, brands, shapes, colors]);

  return (
    <div ref={filterRef} className={styles.flterSection}>
      <ul className={styles.leftSide}>
        <li>Filtr:</li>

        <FilterItem
          title="Cins"
          options={genderOptions}
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
          options={SORT_LABELS}
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
