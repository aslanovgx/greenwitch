"use client";
import React, { useEffect, useState, useRef, useMemo } from "react";
import Link from 'next/link';
import Image from "next/image";
import "@/components/layout/Navbar.css";
import WishlistDrawer from "@/context/WishlistDrawer";
import BaglistDrawer from "@/context/BaglistDrawer";
import mehsullar from '@/components/Mock/Home/mehsullar.json';
import { useSearch } from "@/context/SearchContext";
import useDebounce from "@/hooks/useDebounce";
import SearchModal from "@/components/common/SearchModal";
import TextSwitcher from "@/components/ui/TextSwitcher";
import SearchInput from "@/components/ui/SearchInput";
import FavoritesButton from "@/components/ui/FavoritesButton";
import BagButton from "../ui/BagButton";
import { handleProfileClick, handleScroll, lockBodyScroll, unlockBodyScroll } from "@/utils/navbarUtils";
import menuItems from "@/components/layout/menuItems";
import textSwitcherTexts from "@/components/layout/textSwitcherTexts";

export default function Navbar() {
  const [fixed, setFixed] = useState(false);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [baglistOpen, setBaglistOpen] = useState(false);
  const { searchTerm } = useSearch();
  const debouncedSearchTerm = useDebounce(searchTerm, 1500);
  const filteredResults = useMemo(() => {
    console.log("🔍 filter çalışdı"); // << BURADAN yoxlayacaqsan
    return mehsullar.filter((item) =>
      `${item.title} ${item.desc}`.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
  }, [debouncedSearchTerm]);

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
        <TextSwitcher texts={textSwitcherTexts} onIndexChange={setCurrentTextIndex} />

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
          <Image
            src={"/assets/icons/watch-2.svg"}
            alt="watch2-icon"
            width={30}
            height={30}
            className="object-contain"
          />
          <Image
            src={"/assets/icons/searchMobile.svg"}
            alt="search-icon"
            width={20}
            height={20}
            className="object-contain searchMobile"
          />
          <BagButton onClick={() => setBaglistOpen(true)} />
          <div className="relative flex justify-center items-center">
            <FavoritesButton onClick={() => setWishlistOpen(true)} />
          </div>
          {/* <Image
            src={"/assets/icons/account.svg"}
            alt="account-icon"
            width={30}
            height={30}
            className="object-contain"
            onClick={handleProfileClick}
          /> */}
          <Link href="/location">
            <Image
              src="/assets/icons/location.svg"
              alt="location-icon"
              width={30}
              height={30}
              className="object-contain cursor-pointer"
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
          <li>Saatlar</li>
          <Link href="/location">
            <li>Mağazalar</li>
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
