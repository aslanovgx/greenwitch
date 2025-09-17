// src/app/special-offer/[id]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SpecialOfferPage from "@/components/home/SpecialOffer/SpecialOfferPage";
import { specialOffers, type Offer } from "@/data/specialOffers";

type Props = {
  params: Promise<{ id: string }>;
};

function textToDescription(txt: string | string[] | undefined, max = 300): string {
  const raw = Array.isArray(txt) ? txt.join(" ") : (txt ?? "");
  const s = raw.trim().replace(/\s+/g, " ");
  return s.length > max ? s.slice(0, max - 1) + "…" : s || "SaatAZ kampaniyaları və endirimli məhsullar.";
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const offer: Offer | undefined = specialOffers[id];
  const canonical = `/special-offer/${id}`;

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
  const firstImg = offer.images?.[0] ?? "/og-image.jpg";

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      siteName: "SaatAZ",
      locale: "az_AZ",
      title,
      description,
      images: [{ url: firstImg, width: 1200, height: 630, alt: offer.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [firstImg],
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
