// src/app/purchase/page.tsx
import { Suspense } from "react";
import PurchaseContent from "@/components/purchase/PurchaseContent";

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
