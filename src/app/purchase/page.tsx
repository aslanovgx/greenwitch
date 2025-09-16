// src/app/purchase/page.tsx
import type { Metadata } from "next";
import { Suspense } from "react";
import PurchaseContent from "@/components/purchase/PurchaseContent";

// 🚫 SEO: noindex, nofollow
export const metadata: Metadata = {
  title: "Satınalma Prosesi | SaatAZ",
  description: "Sifarişinizi təsdiqləyin və satınalma prosesini tamamlayın.",
  robots: { index: false, follow: false },
};

export default function PurchasePage() {
  return (
    <section>
      {/* ✅ burada Suspense */}
      <Suspense fallback={null}>
        <PurchaseContent />
      </Suspense>
    </section>
  );
}
