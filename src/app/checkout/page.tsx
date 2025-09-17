// src/app/checkout/page.tsx
import type { Metadata } from "next";
import CheckoutForm from "@/components/checkout/CheckoutForm";

export const metadata: Metadata = {
  title: "Checkout | SaatAZ",
  description: "Sifarişinizi təsdiqləyin və ödənişi tamamlayın.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/checkout" },
};

export default function CheckoutPage() {
  return (
    <section>
      <CheckoutForm />
    </section>
  );
}
