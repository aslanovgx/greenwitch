// src/app/products/page.tsx
import type { Metadata } from "next";
import { Suspense } from "react";
import Contact from "@/components/home/Contact/Contact";
import FilterCards from "@/components/products/FilterCards/FilterCards";
import FilterSection from "@/components/products/FilterSection/FilterSection";

const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

// Next 15: searchParams Promise gəlir – düzgün tip
type SearchParamsPromise = Promise<Record<string, string | string[] | undefined>>;

export async function generateMetadata(
  { searchParams }: { searchParams: SearchParamsPromise }
): Promise<Metadata> {
  const sp = await searchParams;

  const base = SITE_URL.replace(/\/+$/, "");
  const canonical = `${base}/products`;

  // boş/undefined olmayan query açarlarını çıxar
  const keys = Object.keys(sp ?? {}).filter((k) => {
    const v = sp?.[k];
    return Array.isArray(v) ? v.length > 0 : v !== undefined && v !== "";
  });

  // yalnız səhifələmə varsa index; başqa filter olduqda noindex
  const onlyPageParam =
    keys.length === 0 || (keys.length === 1 && keys[0] === "page");

  return {
    title: "Məhsullar | SaatAZ",
    description:
      "Kişi, qadın və unisex orijinal brend saat modelləri. Rəsmi zəmanət və sərfəli qiymətlər.",
    alternates: { canonical },
    robots: { index: onlyPageParam, follow: true },
    openGraph: {
      type: "website",
      url: canonical,
      siteName: "SaatAZ",
      locale: "az_AZ",
      title: "Məhsullar | SaatAZ",
      description:
        "Orijinal brend saat kataloqu. Filtr və kateqoriyalar üzrə axtarın.",
      images: [
        {
          url: `${base}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: "SaatAZ məhsullar",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Məhsullar | SaatAZ",
      description:
        "Azərbaycanda premium brend saat kataloqu. Rəsmi zəmanət və sərfəli qiymətlər.",
      images: [`${base}/og-image.jpg`],
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
