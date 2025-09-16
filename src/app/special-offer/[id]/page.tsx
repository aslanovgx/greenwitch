// src/app/special-offer/[id]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SpecialOfferPage from "@/components/home/SpecialOffer/SpecialOfferPage";
import { specialOffers, type Offer } from "@/data/specialOffers";

type Props = {
  params: Promise<{ id: string }>;
};

// helper: sections[0].text (string | string[]) -> string
function textToDescription(txt: string | string[] | undefined, max = 300): string {
  const raw = Array.isArray(txt) ? txt.join(" ") : (txt ?? "");
  const s = raw.trim().replace(/\s+/g, " ");
  return s.length > max ? s.slice(0, max - 1) + "…" : s || "SaatAZ kampaniyaları və endirimli məhsullar.";
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const offer: Offer | undefined = specialOffers[id];

  const base = (process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000").replace(/\/+$/, "");
  const canonical = `${base}/special-offer/${id}`;

  if (!offer) {
    return {
      title: "Xüsusi təklif tapılmadı | SaatAZ",
      description: "Axtardığınız kampaniya mövcud deyil və ya bitib.",
      alternates: { canonical },
      robots: { index: false, follow: false },
    };
  }

  const title = `${offer.title} | Xüsusi Təklif | SaatAZ`;
  const description = textToDescription(offer.sections?.[0]?.text);

  // OG/Twitter şəkli: ilk şəkil varsa onu götür, yoxdursa fallback
  const firstImg = offer.images?.[0];
  const ogUrl = firstImg
    ? (firstImg.startsWith("http") ? firstImg : `${base}${firstImg}`)
    : `${base}/og-image.jpg`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      url: canonical,
      siteName: "SaatAZ",
      locale: "az_AZ",
      title,
      description,
      images: [{ url: ogUrl, width: 1200, height: 630, alt: offer.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogUrl],
    },
    robots: { index: true, follow: true },
  };
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const offer: Offer | undefined = specialOffers[id];
  if (!offer) return notFound();

  return <SpecialOfferPage offer={offer} id={parseInt(id)} />;
}
