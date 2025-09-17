// src/app/products/page.tsx
import type { Metadata } from "next";
import { Suspense } from "react";
import Contact from "@/components/home/Contact/Contact";
import FilterCards from "@/components/products/FilterCards/FilterCards";
import FilterSection from "@/components/products/FilterSection/FilterSection";

type SearchParamsPromise = Promise<Record<string, string | string[] | undefined>>;

export async function generateMetadata(
  { searchParams }: { searchParams: SearchParamsPromise }
): Promise<Metadata> {
  const sp = await searchParams;

  const canonical = "/products";
  const keys = Object.keys(sp ?? {}).filter((k) => {
    const v = sp?.[k];
    return Array.isArray(v) ? v.length > 0 : v !== undefined && v !== "";
  });

  const onlyPageParam =
    keys.length === 0 || (keys.length === 1 && keys[0] === "page");

  return {
    title: "Məhsullar | SaatAZ",
    description:
      "Kişi, qadın və uşaq orijinal brend saat modelləri. Rəsmi zəmanət və sərfəli qiymətlər.",
    alternates: { canonical },
    robots: { index: onlyPageParam, follow: true },
    openGraph: {
      type: "website",
      siteName: "SaatAZ",
      locale: "az_AZ",
      title: "Məhsullar | SaatAZ",
      description:
        "Orijinal brend saat kataloqu. Filtr və kateqoriyalar üzrə axtarın.",
      images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "SaatAZ məhsullar" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Məhsullar | SaatAZ",
      description:
        "Azərbaycanda premium brend saat kataloqu. Rəsmi zəmanət və sərfəli qiymətlər.",
      images: ["/og-image.jpg"],
    },
  };
}

export default function ProductsPage() {
  return (
    <>
      <section>
        <Suspense fallback={<div className="py-10 text-center">Filtrlər yüklənir…</div>}>
          <FilterSection />
        </Suspense>
      </section>

      <section>
        <Suspense fallback={<div className="py-10 text-center">Məhsullar yüklənir…</div>}>
          <FilterCards />
        </Suspense>
      </section>

      <section>
        <Contact />
      </section>
    </>
  );
}
