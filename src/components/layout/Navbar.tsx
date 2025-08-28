"use client";
import React, { useEffect, useState, useRef } from "react";
import Link from 'next/link';
import Image from "next/image";
import "@/components/layout/Navbar.css";
import WishlistDrawer from "@/context/WishlistDrawer";
import BaglistDrawer from "@/context/BaglistDrawer";
import { useSearch } from "@/context/SearchContext";
import useDebounce from "@/hooks/useDebounce";
import SearchModal from "@/components/common/SearchModal";
import TextSwitcher from "@/components/ui/TextSwitcher";
import SearchInput from "@/components/ui/SearchInput";
import FavoritesButton from "@/components/ui/FavoritesButton";
import BagButton from "../ui/BagButton";
import { handleScroll, lockBodyScroll, unlockBodyScroll } from "@/utils/navbarUtils";
import menuItems from "@/data/menuItems";
import textSwitcherTexts from "@/components/layout/textSwitcherTexts";
import { getProducts } from "@/lib/api/products";
import type { RawProduct } from "@/types/Product";

import { FaInstagram } from "react-icons/fa";
import { BsTelephone } from "react-icons/bs";

type SearchResult = {
  id: number;
  brandName: string;
  description: string;
  price: number | string;
  image?: string | null;
};


function buildImageUrl(rel: string) {
  const API = (process.env.NEXT_PUBLIC_API_URL ?? "").trim();
  const ROOT = API.replace(/\/api\/?$/i, ""); // .../api -> ...
  const clean = (rel ?? "").replace(/^\/+/, ""); // başdakı /-ları sil
  return `${ROOT}/${clean}`;
}

export default function Navbar() {
  const [fixed, setFixed] = useState(false);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [baglistOpen, setBaglistOpen] = useState(false);
  const { searchTerm } = useSearch();
  const debouncedSearchTerm = useDebounce(searchTerm, 1500);

  const [filteredResults, setFilteredResults] = useState<SearchResult[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [currentTextIndex, setCurrentTextIndex] = useState(0);


  useEffect(() => {
    const onScroll = () => handleScroll(row1Ref, setFixed);
    onScroll(); // İlk renderdə çağır
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (debouncedSearchTerm.trim() !== "") {
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
    }
  }, [debouncedSearchTerm]);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      lockBodyScroll();
    } else {
      unlockBodyScroll();
    }
    return () => unlockBodyScroll();
  }, [isMenuOpen]);

  useEffect(() => {
    if (!debouncedSearchTerm.trim()) {
      setFilteredResults([]);
      return;
    }

    (async () => {
      try {
        const products = await getProducts({ search: debouncedSearchTerm, size: 20 });

        // 2) API -> SearchResult adaptasiyası
        const toSearchResult = (p: RawProduct): SearchResult => {
          const firstImage =
            Array.isArray(p.images) && typeof p.images[0] === "string"
              ? p.images[0]
              : null;

          return {
            id: p.id,
            // bəzi BE-lərdə brandName boş ola bilər, ona görə name ilə də fallback edirik
            brandName: (p as { brandName?: string } | RawProduct).brandName ?? p.name ?? "",
            description: (p.description ?? "") as string,
            price: p.price,
            image: firstImage ? buildImageUrl(firstImage) : null,
          };
        };


        setFilteredResults(products.map(toSearchResult));
      } catch (e) {
        console.error("Search API error:", e);
        setFilteredResults([]);
      }
    })();
  }, [debouncedSearchTerm]);

  return (
    <nav className="w-full bg-white">
      <div
        ref={row1Ref}
        className="row-1 w-full bg-darkBg text-center flex justify-center items-center"
      >
        {currentTextIndex === 0 && (
          <Image
            src={"/assets/icons/vector.svg"}
            alt="vector-icon"
            width={21}
            height={21}
            className="object-contain"
          />
        )}
        {currentTextIndex === 1 && (
          <Image
            src={"/assets/icons/credit-card.svg"}
            alt="credit-card"
            width={21}
            height={21}
            className="object-contain"
          />
        )}
        {currentTextIndex === 2 && (
          <Image
            src={"/assets/icons/done.svg"}
            alt="done-icon"
            width={21}
            height={21}
            className="object-contain"
          />
        )}
        <TextSwitcher texts={textSwitcherTexts} onIndexChange={setCurrentTextIndex} />
        <p className="fixedNumber"><BsTelephone /> +994 50 233 88 11</p>
        <p className="fixedSocialMedia"><FaInstagram /> saat.az</p>
        {/* <p className="fixedNumber">Əlaqə: +994 50 233 88 11</p> */}
      </div>

      {/* Mobile-only top strip */}
      <div className="row-1-mobile">
        <p className="fixedNumber"><BsTelephone /> +994 50 233 88 11</p>
        <p className="fixedSocialMedia"><FaInstagram /> saat.az</p>
      </div>


      {/* Placeholder div — row-2 fixed olduqda burada yer saxlayır */}
      {fixed && (
        <div
          style={{ height: row2Ref.current ? row2Ref.current.offsetHeight : 0 }}
        />
      )}

      <div
        ref={row2Ref}
        className={`row-2 relative mx-auto flex items-center justify-between ${fixed ? "fixed-row" : ""
          }`}
      >
        {/* Search */}
        <SearchInput />

        {/* Mobile Burger Icon */}
        <div className='burgerIcon' onClick={() => setIsMenuOpen(true)}>
          <Image
            src={"/assets/icons/burger.svg"}
            alt="burger-icon"
            width={25}
            height={25}
            className="object-contain"
          />
        </div>

        {/* Logo */}
        <Link href="/" className="logo_box">
          <Image
            src={"/assets/icons/logo.png"}
            alt="logo-png"
            width={168}
            height={46}
            className="logo object-contain"
            priority
          />
        </Link>

        {/* Favorite Icon */}
        <div className="row-2-icons flex items-center justify-center">
          <Link href="/products">
            <Image
              src={"/assets/icons/watch2.svg"}
              alt="watch2-icon"
              width={30}
              height={30}
              className="object-contain"
            />
          </Link>
          <Image
            src={"/assets/icons/searchMobile.svg"}
            alt="search-icon"
            width={20}
            height={20}
            className="object-contain searchMobile"
          />
          <BagButton onClick={() => setBaglistOpen(true)} />
          <div className="relative flex justify-center items-center favorite-icon">
            <FavoritesButton onClick={() => setWishlistOpen(true)} />
          </div>
          <Link href="/location">
            <Image
              src="/assets/icons/location.svg"
              alt="location-icon"
              width={30}
              height={30}
              className="object-contain cursor-pointer location-icon"
            />
          </Link>
        </div>
      </div>
      <div className="row_3">
        <ul className="flex justify-center items-center">
          <li>Kişi</li>
          <li>Qadın</li>
          <li>Uşaq</li>
          <li>Aksesuar</li>
          <Link href="/products">
            <li>Saatlar</li>
          </Link>
          <Link href="/location">
            <li>Mağazalar</li>
          </Link>
          <Link href="/about">
            <li>Haqqımızda</li>
          </Link>
        </ul>
      </div>

      {/* Wishlist Drawer */}
      <WishlistDrawer isOpen={wishlistOpen} onClose={() => setWishlistOpen(false)} />
      <BaglistDrawer isOpen={baglistOpen} onClose={() => setBaglistOpen(false)} />
      <SearchModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        results={filteredResults}
      />


      {isMenuOpen && (
        <div className="mobileNavbar inset-0 bg-white z-50">
          <button onClick={() => setIsMenuOpen(false)} className="">
            <Image
              src={"/assets/icons/remove.svg"}
              alt="close-icon"
              width={25}
              height={25}
              className="object-contain"
            />
          </button>

          <ul className="flex">
            {menuItems.map((item, idx) => (
              <li
                key={idx}
                className="flex justify-between items-center cursor-pointer"
              >
                <Link href={item.href} onClick={() => setIsMenuOpen(false)}>
                  {item.label}
                </Link>
                <Link href={item.href} onClick={() => setIsMenuOpen(false)}>
                  <span>
                    <Image
                      src={"/assets/icons/right-arrow.svg"}
                      alt="arrow-icon"
                      width={19}
                      height={19}
                      className="object-contain"
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
