// src/app/gift-card/page.tsx
import type { Metadata } from "next";
import SpecialOfferPage from "@/components/home/SpecialOffer/SpecialOfferPage";
import { Offer } from "@/data/specialOffers";

const giftCardContent: Offer = {
  title: "Hədiyyə Kartı",
  images: [
    "/assets/gift-card/image1.jpg",
    "/assets/gift-card/image2.jpg",
    "/assets/gift-card/image3.jpg",
    "/assets/gift-card/image4.png",
  ],
  sections: [
    {
      heading: "Tək Kart, Sonsuz Seçim",
      text: "İstənilən məbləğdə tərtib edilə bilən hədiyyə kartları, sevdiklərinizə mağazalarımızda sərbəst şəkildə alış-veriş etmək imkanı təqdim edən, həm praktiki, həm də zövqlü bir hədiyyə seçimidir. Hər münasibət və büdcəyə uyğun bu kartlarla, həm siz, həm də yaxınlarınız istədiklərini rahatlıqla seçə bilərsiniz.",
    },
    {
      heading: "Klassik Hədiyyə Kartı",
      text: "İstənilən məbləğdə tərtib edilə bilən hədiyyə kartları, sevdiklərinizə mağazalarımızda sərbəst şəkildə alış-veriş etmək imkanı təqdim edən, həm praktiki, həm də zövqlü bir hədiyyə seçimidir. Hər münasibət və büdcəyə uyğun bu kartlarla, həm siz, həm də yaxınlarınız istədiklərini rahatlıqla seçə bilərsiniz.",
      image: "/assets/gift-card/classic-gift-card.png",
    },
    {
      heading: "Premium Hədiyyə Kartı",
      text: "Xüsusi qablaşdırma və əlavə üstünlüklərlə təqdim olunur, fərqli və yadda qalan.",
      image: "/assets/gift-card/premium-gift-card.png",
    },
  ],
};

export const metadata: Metadata = {
  title: "Hədiyyə Kartı | SaatAZ",
  description:
    "SaatAZ Hədiyyə Kartı – sevdiklərinizə sərbəst seçim imkanı verən, həm praktiki, həm də zövqlü hədiyyə. Klassik və Premium kart variantları ilə fərqli hədiyyə təcrübəsi.",
  alternates: { canonical: "/gift-card" },
  openGraph: {
    type: "website",
    siteName: "SaatAZ",
    locale: "az_AZ",
    title: "Hədiyyə Kartı | SaatAZ",
    description:
      "Sevdikləriniz üçün sərbəst seçim imkanı. Klassik və Premium SaatAZ hədiyyə kartları.",
    images: [{ url: giftCardContent.images[0], width: 1200, height: 630, alt: "SaatAZ Hədiyyə Kartı" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hədiyyə Kartı | SaatAZ",
    description:
      "SaatAZ Hədiyyə Kartı – sevdiklərinizə sərbəst seçim imkanı verən mükəmməl hədiyyə.",
    images: [giftCardContent.images[0]],
  },
  robots: { index: true, follow: true },
};

export default function GiftCardPage() {
  return <SpecialOfferPage offer={giftCardContent} />;
}
