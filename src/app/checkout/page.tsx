// src/app/checkout/page.tsx

import type { Metadata } from "next";
import CheckoutForm from "@/components/checkout/CheckoutForm";

// 🚫 SEO: checkout səhifəsi noindex olmalıdır
export const metadata: Metadata = {
  title: "Checkout | SaatAZ",
  description: "Sifarişinizi təsdiqləyin və ödənişi tamamlayın.",
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return (
    <section>
      <CheckoutForm />
    </section>
  );
}
