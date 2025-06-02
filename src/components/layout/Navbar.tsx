"use client";
import React, { useEffect, useState, useRef, useMemo } from "react";
import Image from "next/image";
import "@/components/layout/Navbar.css";
import { useFavorites } from "@/context/FavoritesContext";
// import { Heart } from "lucide-react";
import WishlistDrawer from "@/context/WishlistDrawer";

import mehsullar from '@/components/Mock/Home/mehsullar.json';
import { useSearch } from "@/context/SearchContext";
import useDebounce from "@/hooks/useDebounce";
import SearchModal from "@/components/common/SearchModal";

import TextSwitcher from "@/components/ui/TextSwitcher";
import SearchInput from "@/components/ui/SearchInput";
import FavoritesButton from "@/components/ui/FavoritesButton";

export default function Navbar() {
  const [fixed, setFixed] = useState(false);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  // const { favorites } = useFavorites();
  const [wishlistOpen, setWishlistOpen] = useState(false);

  // Yazı state-i burada yaradılır:
  const texts = ["100% Sertifikatlı Orijinal", "6 Ay Faizsiz Kredit", "2 İllik Zəmanət"];
  // const [currentTextIndex, setCurrentTextIndex] = useState(0);



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
    function handleScroll() {
      if (!row1Ref.current) return;

      const row1Bottom = row1Ref.current.getBoundingClientRect().bottom;
      setFixed(row1Bottom <= 0);
    }

    // ✅ İlk render zamanı bir dəfə çağır (səhifə reload olsa belə)
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  useEffect(() => {
    if (debouncedSearchTerm.trim() !== "") {
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
    }
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
        <TextSwitcher texts={texts} onIndexChange={setCurrentTextIndex} />

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

        {/* Logo */}
        <Image
          src={"/assets/icons/logo.png"}
          alt="logo-png"
          width={168}
          height={46}
          className="logo object-contain"
        />

        {/* Favorite Icon */}
        <div className="row-2-icons flex items-center justify-center">
          <Image
            src={"/assets/icons/shopping.svg"}
            alt="shopping-icon"
            width={30}
            height={30}
            className="object-contain"
          />
          <div className="relative flex justify-center items-center">
            <FavoritesButton onClick={() => setWishlistOpen(true)} />
          </div>
          <Image
            src={"/assets/icons/account.svg"}
            alt="account-icon"
            width={30}
            height={30}
            className="object-contain"
          />
        </div>
      </div>

      {/* Wishlist Drawer */}
      <WishlistDrawer isOpen={wishlistOpen} onClose={() => setWishlistOpen(false)} />
      <SearchModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        results={filteredResults}
      />

    </nav>
  );
}
