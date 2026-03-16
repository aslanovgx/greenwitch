// src/app/about/page.tsx
import type { Metadata } from "next";
import SpecialOfferPage from "@/components/home/SpecialOffer/SpecialOfferPage";
import { getAboutPage } from "@/lib/api/about";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const aboutContent = await getAboutPage();
    const firstImage = aboutContent.images?.[0];

    return {
      title: "Haqqımızda | SaatAZ",
      description:
        "SaatAZ və BayGroup – Azərbaycanda rəsmi brend distributor. Fossil, Emporio Armani, Michael Kors, Diesel və digər brendlərin orijinal saatlarının rəsmi satış ünvanı.",
      alternates: { canonical: "/about" },
      openGraph: {
        type: "website",
        title: "Haqqımızda | SaatAZ",
        description:
          "BayGroup və SaatAZ – Azərbaycanda premium brend saatların rəsmi distribyutoru. Missiyamız, dəyərlərimiz və məhsul çeşidimiz haqqında daha ətraflı öyrənin.",
        images: firstImage
          ? [
              {
                url: firstImage,
                width: 1200,
                height: 630,
                alt: "SaatAZ Haqqımızda",
              },
            ]
          : [],
        siteName: "SaatAZ",
        locale: "az_AZ",
      },
      twitter: {
        card: "summary_large_image",
        title: "Haqqımızda | SaatAZ",
        description:
          "Azərbaycanda premium brend saatların rəsmi distribyutoru SaatAZ və BayGroup haqqında ətraflı məlumat.",
        images: firstImage ? [firstImage] : [],
      },
      robots: { index: true, follow: true },
    };
  } catch {
    return {
      title: "Haqqımızda | SaatAZ",
      description:
        "SaatAZ və BayGroup – Azərbaycanda rəsmi brend distributor. Fossil, Emporio Armani, Michael Kors, Diesel və digər brendlərin orijinal saatlarının rəsmi satış ünvanı.",
      alternates: { canonical: "/about" },
      openGraph: {
        type: "website",
        title: "Haqqımızda | SaatAZ",
        description:
          "BayGroup və SaatAZ – Azərbaycanda premium brend saatların rəsmi distribyutoru. Missiyamız, dəyərlərimiz və məhsul çeşidimiz haqqında daha ətraflı öyrənin.",
        siteName: "SaatAZ",
        locale: "az_AZ",
      },
      twitter: {
        card: "summary_large_image",
        title: "Haqqımızda | SaatAZ",
        description:
          "Azərbaycanda premium brend saatların rəsmi distribyutoru SaatAZ və BayGroup haqqında ətraflı məlumat.",
      },
      robots: { index: true, follow: true },
    };
  }
}

export default async function AboutPage() {
  const aboutContent = await getAboutPage();

  return <SpecialOfferPage offer={aboutContent} />;
}