"use client";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import "@/components/layout/Navbar.css";
import { useFavorites } from "@/context/FavoritesContext";
// import { Heart } from "lucide-react";
import WishlistDrawer from "@/context/WishlistDrawer";

export default function Navbar() {
  const [fixed, setFixed] = useState(false);
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);
  const { favorites } = useFavorites();
  const [wishlistOpen, setWishlistOpen] = useState(false);

  // Yazı state-i burada yaradılır:
  const texts = ["100% Sertifikatlı Orijinal", "6 Ay Faizsiz Kredit", "2 İllik Zəmanət"];
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    function handleScroll() {
      if (!row1Ref.current) return;

      const row1Bottom = row1Ref.current.getBoundingClientRect().bottom;
      if (row1Bottom <= 0) {
        setFixed(true);
      } else {
        setFixed(false);
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

        <p>{texts[currentTextIndex]}</p> {/* Yazı buradan yenilənir */}
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
        <div className="row-2-search flex items-center">
          <Image
            src={"/assets/icons/search.svg"}
            alt="search-icon"
            width={30}
            height={30}
            className="object-contain"
          />
          <input
            type="text"
            placeholder="Axtar..."
            className="border rounded px-2 py-1 text-sm focus:outline-none"
          />
        </div>

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
            <button onClick={() => setWishlistOpen(true)} className="relative">
              <Image
                src={"/assets/icons/heart.svg"}
                alt="heart-icon"
                width={30}
                height={30}
                className="object-contain"
              />
              {/* <Heart className="w-[30px] h-[30px] font-light cursor-pointer" /> */}
              {favorites.length > 0 && (
                <span className="absolute -top-0 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center shadow">
                  {favorites.length}
                </span>
              )}
            </button>
          </div>
          {/* <Image
            src={"/assets/icons/heart.svg"}
            alt="heart-icon"
            width={30}
            height={30}
            className="object-contain"
          /> */}
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
    </nav>
  );
}
