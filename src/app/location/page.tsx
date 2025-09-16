// app/location/page.tsx
import type { Metadata } from "next";
import Contact from "@/components/home/Contact/Contact";
import MapView from "@/components/MapView";

const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  title: "Mağazalar və Ünvanlar | SaatAZ",
  description:
    "SaatAZ mağazalarının ünvanları və xəritə görünüşü. Rəsmi satış nöqtələrimiz və əlaqə məlumatları.",
  alternates: { canonical: `${SITE_URL}/location` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/location`,
    title: "Mağazalar və Ünvanlar | SaatAZ",
    description:
      "SaatAZ mağazalarının ünvanları və xəritə görünüşü. Rəsmi satış nöqtələrimiz və əlaqə məlumatları.",
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "SaatAZ mağaza ünvanları",
      },
    ],
    siteName: "SaatAZ",
    locale: "az_AZ",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mağazalar və Ünvanlar | SaatAZ",
    description:
      "Rəsmi SaatAZ mağazalarının ünvanlarını və xəritəsini öyrənin.",
    images: [`${SITE_URL}/og-image.jpg`],
  },
  robots: { index: true, follow: true },
};

export default function LocationPage() {
  return (
    <section>
      <MapView />
      <Contact />
    </section>
  );
}
