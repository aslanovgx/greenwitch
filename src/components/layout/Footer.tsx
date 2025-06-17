'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './Footer.module.css';
import Facebook from './../../../public/assets/footer/facebook.svg'
import Twitter from './../../../public/assets/footer/twitter.svg'
import Instagram from './../../../public/assets/footer/instagram.svg'
import Copyright from './../../../public/assets/footer/bx-copyright.svg.svg'
import useIsMobile from '@/hooks/useIsMobile';
export default function Footer() {

    const [openSection, setOpenSection] = useState<number | null>(null);
    const isMobile = useIsMobile(376);

    const toggleSection = (index: number) => {
        if (!isMobile) return; // Desktopda klikləmə heç nə etmir
        setOpenSection(prev => (prev === index ? null : index));
    };

    const shouldShow = (sectionIndex: number) => {
        return !isMobile || openSection === sectionIndex;
    };
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
                            <li><span><Image src="/assets/footer/phone.svg" alt="phone-icon" width={21} height={21} /></span>+9942002020</li>
                            <li><span><Image src="/assets/footer/location.svg" alt="location-icon" width={21} height={21} /></span>Nizami küçəsi 96C, AF Mall, 3-cü mərtəbə, Bakı, Azərbaycan</li>
                        </>
                    )}

                </ul>
                <ul className={`${styles.footerLists}`}>
                    <li>
                        <span>Haqqımızda</span>
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
                            <li>Missiyamız</li>
                            <li>Dəyərlərimiz</li>
                            <li>Brendlərimiz</li>
                            <li>Niyə Biz?</li>
                        </>
                    )}
                </ul>
                <ul className={`${styles.footerLists}`}>
                    <li>
                        <span>Məhsullar</span>
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
                            <li>Yeni gələnlər</li>
                            <li>Ən çox satanlar</li>
                            <li>Qadın</li>
                            <li>Kişi</li>
                            <li>Uşaq</li>
                        </>
                    )}
                </ul>
                <ul className={`${styles.socialContainer}`}>
                    <li>Social</li>
                    <li>
                        <span><Facebook /></span>
                        <span><Twitter /></span>
                        <span><Instagram /></span>
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