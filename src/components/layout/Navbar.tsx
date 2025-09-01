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
import { getGenders } from "@/lib/api/gender";
import { usePathname, useSearchParams } from "next/navigation";
import { FaInstagram } from "react-icons/fa";
import { BsTelephone } from "react-icons/bs";

type SearchResult = {
  id: number;
  brandName: string;
  description: string;
  price: number | string;
  image?: string | null;
};

const normalize = (s?: string) => {
  return String(s ?? "")
    .toLowerCase()
    .trim()
    .normalize("NFKD")
    .replace(/\p{Diacritic}/gu, "")   // ş → s, ç → c, ö → o, ü → u
    .replace(/ə/g, "e")
    .replace(/ı/g, "i")
    .replace(/ğ/g, "g")
    .replace(/ş/g, "s")
    .replace(/ç/g, "c");
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

  const [finalMenu, setFinalMenu] = useState(menuItems);

  const pathname = usePathname();
  const params = useSearchParams();

  const activeGenderId = Number(params.get("genderId") || 0);
  const activeCategoryId = Number(params.get("categoryId") || 0);
  const isProducts = pathname?.startsWith("/products");

  const isActive = (href: string) => {
    const g = href.match(/genderId=(\d+)/);
    if (g) return isProducts && Number(g[1]) === activeGenderId;

    const c = href.match(/categoryId=(\d+)/);
    if (c) return isProducts && Number(c[1]) === activeCategoryId;

    // digər statik linklər
    return pathname === href || pathname?.startsWith(href);
  };


  useEffect(() => {
    (async () => {
      try {
        const genders = await getGenders(); // [{id, name}]
        const nameToId = new Map<string, number>();
        (genders ?? []).forEach(g => nameToId.set(normalize(g.name), g.id));

        const patched = menuItems.map(it => {
          const id = nameToId.get(normalize(it.label));
          return id ? { ...it, href: `/products?genderId=${id}` } : it;
        });
        setFinalMenu(patched);
      } catch (e) {
        console.error("Navbar genders fetch error:", e);
        setFinalMenu(menuItems); // fallback
      }
    })();
  }, []);






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

        <a href="tel:+994502338811" className="fixedNumber">
          <BsTelephone /> +994 50 233 88 11
        </a>
        <a href="https://instagram.com/saat.az" target="_blank" rel="noopener noreferrer" className="fixedSocialMedia">
          <FaInstagram /> saat.az
        </a>
      </div>

      {/* Mobile-only top strip */}
      <div className="row-1-mobile">
        <a href="tel:+994502338811" className="fixedNumber">
          <BsTelephone /> +994 50 233 88 11
        </a>
        <a
          href="https://instagram.com/saat.az"
          target="_blank"
          rel="noopener noreferrer"
          className="fixedSocialMedia"
        >
          <FaInstagram /> saat.az
        </a>
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
        <ul className="flex justify-center items-center menuItemsList">
          {finalMenu.map((item, i) => (
            <li key={i}>
              <Link
                href={item.href}
                className={`menuLink ${isActive(item.href) ? "active" : ""}`}
              >
                {item.label}
              </Link>
            </li>
          ))}
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
            {finalMenu.map((item, idx) => (
              <li
                key={idx}
                className="flex justify-between items-center cursor-pointer"
              >
                <Link
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`menuLink ${isActive(item.href) ? "active" : ""}`}
                >
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
