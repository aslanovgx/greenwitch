"use client";
import React, { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
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
// import type { RawProduct } from "@/types/Product";
import { usePathname, useSearchParams } from "next/navigation";
import { FaInstagram } from "react-icons/fa";
import { BsTelephone } from "react-icons/bs";
import { PiMapPinAreaLight } from "react-icons/pi";
import { PiWatchLight } from "react-icons/pi";

// FE search util
import { feSearchAll, rawToCard, type FeSearchResult } from "@/lib/utils/searchService";



export default function Navbar() {
  const [fixed, setFixed] = useState(false);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [baglistOpen, setBaglistOpen] = useState(false);

  const { searchTerm } = useSearch();
  // Daha çevik UX üçün 350ms
  const debouncedSearchTerm = useDebounce(searchTerm, 350);

  const [filteredResults, setFilteredResults] = useState<FeSearchResult[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // YENİ:
  const [touched, setTouched] = useState(false);
  const [loading, setLoading] = useState(false);

  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [finalMenu, setFinalMenu] = useState(menuItems);

  const pathname = usePathname();
  const params = useSearchParams();

  const activeGenderId = Number(params.get("Gender") || 0);
  const activeCategoryId = Number(params.get("categoryId") || 0);

  const isProducts = pathname?.startsWith("/products");
  const isWatchesActive =
    isProducts &&
    (activeCategoryId === 1 || (activeCategoryId === 0 && activeGenderId > 0));

  const isAccessoriesActive = isProducts && activeCategoryId === 2;

  // ——— isActive: item obyektini qəbul edir
  const isActive = useCallback(
    (item: { label: string; href: string }) => {
      const label = (item.label ?? "").toLowerCase();

      // Label elastik: "Aksesuar" və ya "Aksesuarlar"
      if (label.startsWith("aksesuar")) return isAccessoriesActive;
      if (label === "saatlar") return isWatchesActive;

      // Fallback: href-də Gender/categoryId varsa onları yoxla
      const g = item.href.match(/[?&]Gender=(\d+)/);
      if (g) return isProducts && Number(g[1]) === activeGenderId;

      const c = item.href.match(/category(Id)?=(\d+)/i);
      if (c) return isProducts && Number(c[2]) === activeCategoryId;

      // Statik linklər
      return pathname === item.href || pathname?.startsWith(item.href);
    },
    [isAccessoriesActive, isWatchesActive, isProducts, activeGenderId, activeCategoryId, pathname]
  );

  useEffect(() => {
    if (searchTerm.trim().length === 0) {
      // input təmizlənibsə, "ilk klik" davranışına qayıtmaq üçün touched-i sıfırla
      setTouched(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    setFinalMenu(menuItems); // statik gəlir
  }, []);

  useEffect(() => {
    const onScroll = () => handleScroll(row1Ref, setFixed);
    onScroll(); // ilk render
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ——— Yeganə axtarış effekti (FE aggregate + cache)
  useEffect(() => {
    const q = debouncedSearchTerm.trim();

    if (q.length < 2) {
      setFilteredResults([]);
      setIsModalOpen(false);
      setLoading(false);
      return;
    }

    let mounted = true;
    setLoading(true);

    (async () => {
      try {
        const raw = await feSearchAll(q, {}, { maxPages: 6, maxResults: 400, pageSizeHint: 20 });
        const results = raw.slice(0, 20).map(rawToCard);
        if (!mounted) return;

        setFilteredResults(results);

        // setIsModalOpen(true);
        setIsModalOpen(results.length > 0);
      } catch (e) {
        console.error("Search FE error:", e);
        if (!mounted) return;
        setFilteredResults([]);
        setIsModalOpen(false);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [debouncedSearchTerm]);

  // ——— Mobil menyuda body scroll lock
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useEffect(() => {
    if (isMenuOpen) lockBodyScroll();
    else unlockBodyScroll();
    return () => unlockBodyScroll();
  }, [isMenuOpen]);

  // ——— Mobil search ikonuna kliklə modalı aç
  const openSearchManually = () => {
    if (filteredResults.length > 0) setIsModalOpen(true);
  };

  

  return (
    <nav className="w-full bg-white">
      <div
        ref={row1Ref}
        className="row-1 w-full bg-darkBg text-center flex justify-center items-center"
      >
        {currentTextIndex === 0 && (
          <Image src={"/assets/icons/vector.svg"} alt="vector-icon" width={21} height={21} className="object-contain" />
        )}
        {currentTextIndex === 1 && (
          <Image src={"/assets/icons/credit-card.svg"} alt="credit-card" width={21} height={21} className="object-contain" />
        )}
        {currentTextIndex === 2 && (
          <Image src={"/assets/icons/done.svg"} alt="done-icon" width={21} height={21} className="object-contain" />
        )}

        <TextSwitcher texts={textSwitcherTexts} onIndexChange={setCurrentTextIndex} />

        <a href="tel:+994502338811" className="fixedNumber">
          <BsTelephone /> +994 50 233 88 11
        </a>
        <a href="https://instagram.com/greenwich.aze" target="_blank" rel="noopener noreferrer" className="fixedSocialMedia">
          <FaInstagram /> greenwich.aze
        </a>
      </div>

      {/* Mobile-only top strip */}
      <div className="row-1-mobile">
        <a href="tel:+994502338811" className="fixedNumber">
          <BsTelephone /> +994 50 233 88 11
        </a>
        <a href="https://instagram.com/greenwich.aze" target="_blank" rel="noopener noreferrer" className="fixedSocialMedia">
          <FaInstagram /> greenwich.aze
        </a>
      </div>

      {/* Placeholder div — row-2 fixed olduqda burada yer saxlayır */}
      {fixed && <div style={{ height: row2Ref.current ? row2Ref.current.offsetHeight : 0 }} />}

      <div
        ref={row2Ref}
        className={`row-2 relative mx-auto flex items-center justify-between ${fixed ? "fixed-row" : ""}`}
      >
        {/* Search */}
        <SearchInput
          // onFocusOpenModal={() => setIsModalOpen(true)}
          onUserType={() => setTouched(true)} />

        {/* Mobile Burger Icon */}
        <div className="burgerIcon" onClick={() => setIsMenuOpen(true)}>
          <Image src={"/assets/icons/burger.svg"} alt="burger-icon" width={22} height={22} className="object-contain" />
        </div>

        {/* Logo */}
        <Link href="/" className="logo_box">
          <Image src={"/assets/icons/logo.png"} alt="logo-png" width={168} height={46} className="logo object-contain" priority />
        </Link>

        {/* Right icons */}
        <div className="row-2-icons flex items-center justify-center">
          <Link href="/products">
            <PiWatchLight />
          </Link>

          {/* Mobile search icon opens modal */}
          <Image
            src={"/assets/icons/searchMobile.svg"}
            alt="search-icon"
            width={20}
            height={20}
            className="object-contain searchMobile"
            onClick={openSearchManually}
          />

          <BagButton onClick={() => setBaglistOpen(true)} />
          <div className="relative flex justify-center items-center favorite-icon">
            <FavoritesButton onClick={() => setWishlistOpen(true)} />
          </div>
          <Link href="/location">
            <PiMapPinAreaLight />
          </Link>
        </div>
      </div>

      <div className="row_3">
        <ul className="flex justify-center items-center menuItemsList">
          {finalMenu.map((item, i) => (
            <li key={i}>
              <Link href={item.href} className={`menuLink ${isActive(item) ? "active" : ""}`}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Drawers */}
      <WishlistDrawer isOpen={wishlistOpen} onClose={() => setWishlistOpen(false)} />
      <BaglistDrawer isOpen={baglistOpen} onClose={() => setBaglistOpen(false)} />

      {/* Search Modal */}
      <SearchModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        results={filteredResults}
        query={searchTerm}
        touched={touched}
        loading={loading}
      />

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="mobileNavbar inset-0 bg-white z-50">
          <button onClick={() => setIsMenuOpen(false)}>
            <Image src={"/assets/icons/remove.svg"} alt="close-icon" width={25} height={25} className="object-contain" />
          </button>

          <ul className="flex">
            {finalMenu.map((item, idx) => (
              <li key={idx} className="flex justify-between items-center cursor-pointer">
                <Link
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`menuLink ${isActive(item) ? "active" : ""}`}
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
