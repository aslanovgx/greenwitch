"use client";

import { useState, useEffect, useRef } from 'react';
import styles from './FilterSection.module.css';
import FilterItem from "@/components/Filter/FilterItem";

export default function FilterSection() {
    const [openFilter, setOpenFilter] = useState<string | null>(null);
    const filterRef = useRef<HTMLDivElement>(null);

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
        const handleClickOutside = (event: MouseEvent | TouchEvent) => {
            if (
                filterRef.current &&
                !filterRef.current.contains(event.target as Node)
            ) {
                setOpenFilter(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("touchstart", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("touchstart", handleClickOutside);
        };
    }, []);

    return (
        <div ref={filterRef} className={`${styles.flterSection}`}>
            <ul className={`${styles.leftSide}`}>
                <li>Filtr:</li>
                <FilterItem
                    title="Cins"
                    options={["Qadın", "Kişi", "Uşaq"]}
                    selected={selectedFilters.cins}
                    onSelect={(val) => setSelectedFilters(prev => ({ ...prev, cins: val }))}
                    onClear={() => setSelectedFilters(prev => ({ ...prev, cins: undefined }))}
                    isOpen={openFilter === 'cins'}
                    toggle={() => toggleFilter('cins')}
                />
                <FilterItem
                    title="Brendlər"
                    options={[
                        "EMPORIO ARMANI", "FREDERIQUE CONSTANT", "TOMMY HİLFİGER",
                        "OLIVIA BURTON", "MİCHAEL KORS", "SWISS MILITARY",
                        "ANNE KLEIN", "CASIO", "SKAGEN", "DIESEL", "G-SHOCK",
                        "DKNY", "ARMITRON", "AMALYS", "FOSSIL"
                    ]}
                    selected={selectedFilters.brendler}
                    onSelect={(val) => setSelectedFilters(prev => ({ ...prev, brendler: val }))}
                    onClear={() => setSelectedFilters(prev => ({ ...prev, brendler: undefined }))}
                    isOpen={openFilter === 'brendler'}
                    toggle={() => toggleFilter('brendler')}
                    // isTwoColumn={true}
                />
                <FilterItem
                    title="Rəng"
                    options={["Qara", "Qırmızı", "Ağ", "Qəhvəyi"]}
                    selected={selectedFilters.reng}
                    onSelect={(val) => setSelectedFilters(prev => ({ ...prev, reng: val }))}
                    onClear={() => setSelectedFilters(prev => ({ ...prev, reng: undefined }))}
                    isOpen={openFilter === 'reng'}
                    toggle={() => toggleFilter('reng')}
                />
                <FilterItem
                    title="Forma"
                    options={["Kvadrat", "Yumru"]}
                    selected={selectedFilters.forma}
                    onSelect={(val) => setSelectedFilters(prev => ({ ...prev, forma: val }))}
                    onClear={() => setSelectedFilters(prev => ({ ...prev, forma: undefined }))}
                    isOpen={openFilter === 'forma'}
                    toggle={() => toggleFilter('forma')}
                />
            </ul>
            <ul className={`${styles.rightSide}`}>
                <FilterItem
                    title="Sırala"
                    options={[
                        "Yeni Gələnlər",
                        "Endirimli Məhsullar",
                        "Qiymət (Aşağıdan Yuxarıya)",
                        "Qiymət (Yuxarıdan Aşağıya)"
                    ]}
                    selected={selectedFilters.sirala}
                    onSelect={(val) => setSelectedFilters(prev => ({ ...prev, sirala: val }))}
                    onClear={() => setSelectedFilters(prev => ({ ...prev, sirala: undefined }))}
                    isOpen={openFilter === 'sirala'}
                    toggle={() => toggleFilter('sirala')}
                />
            </ul>
        </div>
    );
}
