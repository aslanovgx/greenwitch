'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";
import Image from 'next/image';
import styles from './Footer.module.css';
import Copyright from './../../../public/assets/footer/bx-copyright.svg.svg'
import useIsMobile from '@/hooks/useIsMobile';
import { FaPhone, FaLocationDot } from "react-icons/fa6";
import { FaFacebookF, FaWhatsapp, FaInstagram } from "react-icons/fa";




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
        {/* 0: Məhsullar */}
        <ul className={`${styles.footerLists}`}>
          <li>
            <span>Məhsullar</span>
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
              <li><Link href="/products?categoryId=1">Saatlar</Link></li>
              <li><Link href="/products?categoryId=2">Aksesuarlar</Link></li>
              <li><Link href="/products?sort=new">Yeni gələnlər</Link></li>
              <li><Link href="/products?sort=discount">Endirimdə olanlar</Link></li>
              <li><Link href="/products?sort=best">Ən çox satılanlar</Link></li>
            </>
          )}
        </ul>

        {/* 1: Xidmətlərimiz */}
        <ul className={`${styles.footerLists}`}>
          <li>
            <span>Xidmətlərimiz</span>
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
              <li><Link href="/special-offer/2">Kredit imkanları</Link></li>
              <li><Link href="/special-offer/1">Korporativ Satış</Link></li>
              <li><Link href="/gift-card">Hədiyyə Kartı</Link></li>
              <li><Link href="/special-offer/3">Servis</Link></li>
            </>
          )}
        </ul>

        {/* 2: Haqqımızda */}
        <ul className={`${styles.footerLists}`}>
          <li>
            <span>Haqqımızda</span>
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
              {/* <li><Link href="/about">Haqqımızda</Link></li> */}
              <li><Link href="/about">Dəyərlərimiz</Link></li>
              <li><Link href="/about">Brendlərimiz</Link></li>
              <li><Link href="/about">Məhsul çeşidimiz</Link></li>
              <li><Link href="/about">Haradayıq?</Link></li>
            </>
          )}
        </ul>

        {/* 3: Əlaqə */}
        <ul className={`${styles.footerLists}`}>
          <li>
            <span>Əlaqə</span>
            <span onClick={() => toggleSection(3)} className={styles.plusIcon}>
              <Image
                src={"/assets/icons/plus.svg"}
                alt="plus-icon"
                width={21}
                height={21}
                className="object-contain"
              />
            </span>
          </li>
          {shouldShow(3) && (
            <>
              <li>
                <a href="tel:+9942002020" className="flex items-center gap-2">
                  <span>
                    <FaPhone />
                  </span>
                  +994 50 233 88 11
                </a>
              </li>
              <li>
                <span>
                  <FaLocationDot />
                </span>
                Nizami küçəsi 96C, AF Mall, 3-cü mərtəbə, Bakı, Azərbaycan
              </li>
              <li className={`${styles.footerSocial} justify-end w-[100%]`}>
                <span><FaFacebookF /></span>
                <span> <a
                  href="https://wa.me/994502338811"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                >
                  <FaWhatsapp />
                </a></span>
                <a
                  href="https://instagram.com/saat_az"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram />
                </a>
              </li>
            </>
          )}
        </ul>
      </div>

      <div className={`${styles.footerGradientLine} mx-auto`} />
      <div className={`${styles.greenwich2025} flex justify-center gap-1 items-center`}>
        <span><Copyright width={14} height={14} /></span>
        <span>Greenwich 2025</span>
      </div>
    </footer>
  );
}
