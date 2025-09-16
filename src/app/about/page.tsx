// src/app/about/page.tsx
import type { Metadata } from "next";
import SpecialOfferPage from "@/components/home/SpecialOffer/SpecialOfferPage";
import { Offer } from "@/data/specialOffers";

const aboutContent: Offer = {
  title: "Haqqımızda",
  images: [
    "/assets/about/image1.jpg",
    "/assets/about/image2.png",
    "/assets/about/image3.jpg",
    "/assets/about/image4.jpg",
  ],
  sections: [
    {
      heading: "Brendimiz haqqında",
      text: "BayGroup şirkəti olaraq Azərbaycanda orijinallığa və keyfiyyətə önəm verən müştərilər üçün dünyaca tanınmış, seçilmiş markaları təqdim edirik. Şirkəmiz Fossil, Emporio Armani, Michael Kors, Armani Exchange, Diesel, Lacoste, Tommy Hilfiger, Calvin Klein, Anne Klein, DKNY, Swiss Military Hanova və digər markaların Azərbaycanda rəsmi distributorudur. Bay Group şirkəti qol saatlarının Azərbaycanda pərakəndə, korporativ və topdan satışını həyata keçirir. Bizim təqdim etdiyimiz hər bir saat sadəcə bir aksessuar deyil, həyat tərzinizi tamamlayan dəyərli bir seçimdir.",
    },
    {
      heading: "Missiyamız",
      text: "Məqsədimiz — müştərilərimizə sadəcə bir saat deyil, zamanı dəyərə çevirən bir həyat tərzi təqdim etməkdir. Biz, hər kəsin şəxsi tərzinə və ehtiyacına uyğun saat tapa bilməsi üçün çalışırıq.",
      image: "/assets/about/image11.jpg",
    },
    {
      heading: "Dəyərlərimiz",
      text: [
        "Orijinallıq və zəmanət: Bütün təqdim etdiyimiz məhsullar orijinaldır və beynəlxalq zəmanət təqdim edilir.",
        "Müştəri məmnuniyyəti: Hər bir müştərimiz bizim üçün dəyərlidir. Satış prosesinin hər mərhələsində fərdi yanaşma və etibarlı dəstək ilə hər zaman sizinləyik.",
        "Peşəkar xidmət: Komandamız məhsul seçimi, qulluq və texniki dəstək mərhələlərində sizə tam peşəkarlıqla xidmət göstərir.",
      ],
    },
    {
      heading: "Məhsul çeşidimiz",
      text: [
        "Greenwich saat mağazaları şəbəkəsində hər zövqə və həyat tərzinə uyğun qadın və kişi modelləri mövcuddur:",
        "Klassik və müasir dizaynlar",
        "Avtomatik və kvars mexanizmlər",
        "Suya davamlı modellər",
        "Lüks və gündəlik istifadə üçün fərqli üslublar",
      ],
    },
    {
      heading: "Haradayıq?",
      text: "Greenwich saat mağazaları şəbəkəsi olaraq təqdim etdiyimiz brendlərin saatlarını Azərbaycanın aparıcı ticarət mərkəzlərində, həmçinin rəsmi onlayn saytımızdan əldə edə bilərsiniz. Onlayn sifarişlə ölkənin istənilən bölgəsinə sürətli və təhlükəsiz çatdırılma həyata keçiririk.",
    },
  ],
};

const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  title: "Haqqımızda | SaatAZ",
  description:
    "SaatAZ və BayGroup – Azərbaycanda rəsmi brend distributor. Fossil, Emporio Armani, Michael Kors, Diesel və digər brendlərin orijinal saatlarının rəsmi satış ünvanı.",
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/about`,
    siteName: "SaatAZ",
    locale: "az_AZ",
    title: "Haqqımızda | SaatAZ",
    description:
      "BayGroup və SaatAZ – Azərbaycanda premium brend saatların rəsmi distribyutoru. Missiyamız, dəyərlərimiz və məhsul çeşidimiz haqqında daha ətraflı öyrənin.",
    images: [
      {
        url: `${SITE_URL}${aboutContent.images[0]}`,
        width: 1200,
        height: 630,
        alt: "SaatAZ Haqqımızda",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Haqqımızda | SaatAZ",
    description:
      "Azərbaycanda premium brend saatların rəsmi distribyutoru SaatAZ və BayGroup haqqında ətraflı məlumat.",
    images: [`${SITE_URL}${aboutContent.images[0]}`],
  },
  robots: { index: true, follow: true },
};

export default function AboutPage() {
  return <SpecialOfferPage offer={aboutContent} />;
}
