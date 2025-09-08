'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";
import Image from 'next/image';
import styles from './Footer.module.css';
import Facebook from './../../../public/assets/footer/facebook.svg'
import Twitter from './../../../public/assets/footer/twitter.svg'
import Instagram from './../../../public/assets/footer/instagram.svg'
import Copyright from './../../../public/assets/footer/bx-copyright.svg.svg'
import useIsMobile from '@/hooks/useIsMobile';
export default function Footer() {

    const [openSection, setOpenSection] = useState<number | null>(null);
    const isMobile = useIsMobile(641);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const toggleSection = (index: number) => {
        if (!isMobile) return; // Desktopda klikləmə heç nə etmir
        setOpenSection(prev => (prev === index ? null : index));
    };

    const shouldShow = (sectionIndex: number) => {
        return !isMobile || openSection === sectionIndex;
    };
    if (!mounted) return null;
    return (
        <footer className={styles.footer}>
            <div className={`${styles.footerBox} columns flex flex-wrap items-center`}>
                <ul className={`${styles.footerLists}`}>
                    <li>
                        <span>Əlaqə</span>
                        <span onClick={() => toggleSection(0)} className={styles.plusIcon}>
                            <Image
                                src={"/assets/icons/plus.svg"}
                                alt="plus-icon"
                                width={21}
                                height={21}
                                className="object-contain"
                            />
                        </span>
                    </li>
                    {shouldShow(0) && (
                        <>
                            <li> <a href="tel:+9942002020" className="flex items-center gap-2"><span><Image src="/assets/footer/phone.svg" alt="phone-icon" width={21} height={21} /></span>+994 50 233 88 11</a></li>
                            <li><span><Image src="/assets/footer/location.svg" alt="location-icon" width={21} height={21} /></span>Nizami küçəsi 96C, AF Mall, 3-cü mərtəbə, Bakı, Azərbaycan</li>
                        </>
                    )}

                </ul>
                <ul className={`${styles.footerLists}`}>
                    <li>
                        <span><Link href="/about">Haqqımızda</Link></span>
                        <span onClick={() => toggleSection(1)} className={styles.plusIcon}>
                            <Image
                                src={"/assets/icons/plus.svg"}
                                alt="plus-icon"
                                width={21}
                                height={21}
                                className="object-contain"
                            />
                        </span>
                    </li>
                    {shouldShow(1) && (
                        <>
                            <li><Link href="/about">Haqqımızda</Link></li>
                            <li><Link href="/about">Missiyamız</Link></li>
                            <li><Link href="/about">Dəyərlərimiz</Link></li>
                            <li><Link href="/about">Brendlərimiz</Link></li>
                            <li><Link href="/about">Niyə Biz?</Link></li>
                        </>
                    )}
                </ul>
                <ul className={`${styles.footerLists}`}>
                    <li>
                        <span><Link href="/products">Məhsullar</Link></span>
                        <span onClick={() => toggleSection(2)} className={styles.plusIcon}>
                            <Image
                                src={"/assets/icons/plus.svg"}
                                alt="plus-icon"
                                width={21}
                                height={21}
                                className="object-contain"
                            />
                        </span>
                    </li>
                    {shouldShow(2) && (
                        <>
                            <li><Link href="/products?categoryId=1">Saatlar</Link></li>
                            <li><Link href="/products?categoryId=2">Aksesuarlar</Link></li>
                            <li><Link href="/products?sort=new">Yeni gələnlər</Link></li>
                            <li><Link href="/products?sort=discount">Endirimdə olanlar</Link></li>
                            <li><Link href="/products?sort=best">Ən çox satılanlar</Link></li>
                            {/* <li><Link href="/products?Gender=1">Kişi</Link></li>
                            <li><Link href="/products?Gender=2">Qadın</Link></li>
                            <li><Link href="/products?Gender=3">Uşaq</Link></li> */}
                        </>
                    )}
                </ul>
                <ul className={`${styles.socialContainer}`}>
                    <li>Social</li>
                    <li>
                        {/* <span><Facebook /></span> */}
                        {/* <span><Twitter /></span> */}
                        <a
                            href="https://instagram.com/saat.az"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Instagram />
                        </a>
                    </li>
                </ul>
            </div>
            <div className={`${styles.footerGradientLine} mx-auto`}>
            </div>
            <div className={`${styles.greenwich2025} flex justify-center gap-1 items-center`}>
                <span><Copyright width={14} height={14} /></span>
                <span>Greenwich 2025</span>
            </div>
        </footer>
    );
}