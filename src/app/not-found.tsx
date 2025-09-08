"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen px-4 text-center">
      <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Səhifə tapılmadı</h2>
      <p className="text-gray-600 mb-6 max-w-md">
        Axtardığınız səhifə mövcud deyil və ya silinib. Lütfən, ünvanı yoxlayın
        və ya ana səhifəyə qayıdın.
      </p>
      <Link
        href="/"
        className="px-6 py-3 rounded-lg bg-black text-white hover:bg-gray-800 transition"
      >
        Ana səhifəyə qayıt
      </Link>
    </div>
  );
}
