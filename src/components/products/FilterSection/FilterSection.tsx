"use client";

import { useState } from 'react';
import styles from './FilterSection.module.css';
import Image from "next/image";

export default function FilterSection() {
    const [openFilter, setOpenFilter] = useState<string | null>(null);

    const toggleFilter = (filterName: string) => {
        setOpenFilter(prev => (prev === filterName ? null : filterName));
    };
    return (
        <>
            <div className={`${styles.flterSection}`}>
                <ul className={`${styles.leftSide}`}>
                    <li>Filtr:</li>
                    <li onClick={() => toggleFilter('cins')} className={`${styles.filterTitle}`}>
                        Cins
                        <Image
                            src={"/assets/icons/upArrow.svg"}
                            alt="account-icon"
                            width={16}
                            height={16}
                            className="object-contain"
                        />
                        {openFilter === 'cins' && (
                            <ul className={styles.dropdown}>
                                <li>Qadın</li>
                                <li>Kişi</li>
                                <li>Uşaq</li>
                            </ul>
                        )}
                    </li>
                    <li onClick={() => toggleFilter('brendler')} className={styles.filterTitle}>
                        Brendlər
                        <Image
                            src={"/assets/icons/upArrow.svg"}
                            alt="account-icon"
                            width={16}
                            height={16}
                            className="object-contain"
                        />
                        {openFilter === 'brendler' && (
                            <div className={styles.brandDropdown}>
                                <ul className={styles.column}>
                                    <li>EMPORIO ARMANI</li>
                                    <li>FREDERIQUE CONSTANT</li>
                                    <li>TOMMY HİLFİGER</li>
                                    <li>OLIVIA BURTON</li>
                                    <li>MİCHAEL KORS</li>
                                    <li>SWISS MILITARY</li>
                                    <li>ANNE KLEIN</li>
                                    <li>CASIO</li>
                                </ul>
                                <ul className={styles.column}>
                                    <li>SKAGEN</li>
                                    <li>DIESEL</li>
                                    <li>G-SHOCK</li>
                                    <li>DKNY</li>
                                    <li>ARMITRON</li>
                                    <li>AMALYS</li>
                                    <li>FOSSIL</li>
                                </ul>
                            </div>
                        )}
                    </li>
                    <li onClick={() => toggleFilter('reng')} className={styles.filterTitle}>
                        Rəng
                        <Image
                            src={"/assets/icons/upArrow.svg"}
                            alt="account-icon"
                            width={16}
                            height={16}
                            className="object-contain"
                        />
                        {openFilter === 'reng' && (
                            <ul className={styles.dropdown}>
                                <li>Qara</li>
                                <li>Qırmızı</li>
                                <li>Ağ</li>
                                <li>Qəhvəyi</li>
                            </ul>
                        )}
                    </li>
                    <li onClick={() => toggleFilter('forma')} className={styles.filterTitle}>
                        Forma
                        <Image
                            src={"/assets/icons/upArrow.svg"}
                            alt="account-icon"
                            width={16}
                            height={16}
                            className="object-contain"
                        />
                        {openFilter === 'forma' && (
                            <ul className={styles.dropdown}>
                                <li>Kvadrat</li>
                                <li>Yumru</li>
                            </ul>
                        )}
                    </li>
                </ul>
                <ul className={`${styles.rightSide}`}>
                    <li onClick={() => toggleFilter('sirala')} className={styles.filterTitle}>
                        Sırala
                        <Image
                            src={"/assets/icons/upArrow.svg"}
                            alt="account-icon"
                            width={16}
                            height={16}
                            className="object-contain"
                        />
                        {openFilter === 'sirala' && (
                            <ul className={styles.dropdown}>
                                <li>Yeni Gələnlər</li>
                                <li>Endirimli Məhsullar</li>
                                <li>Qiymət (Aşağıdan Yuxarıya)</li>
                                <li>Qiymət (Yuxarıdan Aşağıya)</li>
                            </ul>
                        )}
                    </li>
                </ul>
            </div>
        </>
    );
}