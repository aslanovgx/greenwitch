// src/app/purchase/page.tsx
import type { Metadata } from "next";
import { Suspense } from "react";
import PurchaseContent from "@/components/purchase/PurchaseContent";

export const metadata: Metadata = {
  title: "Satınalma Prosesi | SaatAZ",
  description: "Sifarişinizi təsdiqləyin və satınalma prosesini tamamlayın.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/purchase" },
};

export default function PurchasePage() {
  return (
    <section>
      <Suspense fallback={null}>
        <PurchaseContent />
      </Suspense>
    </section>
  );
}
