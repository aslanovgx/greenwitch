// src/app/thanks/page.tsx

import ThanksPage from "@/components/thanks/ThanksPage";
import type { Metadata } from "next";
import Link from "next/link";

// ✅ SEO metadata
export const metadata: Metadata = {
  title: "Təşəkkür edirik | SaatAZ",
  description: "Sifarişiniz uğurla qeydə alındı.",
  robots: { index: false, follow: false },
};

export default function Thanks() {
  return (
    <>
      <ThanksPage />
    </>
  );
}
