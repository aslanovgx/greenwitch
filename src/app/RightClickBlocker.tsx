"use client";

import { useEffect } from "react";

export function RightClickBlocker() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const host = window.location.hostname;

    // 🧩 localhost və 127.0.0.1 üçün icazə ver, yəni heç nə etmə
    if (host === "localhost" || host === "127.0.0.1") return;

    // 🔒 qalan bütün domenlərdə sağ klik blok
    const handler = (e: MouseEvent) => {
      e.preventDefault();
    };

    document.addEventListener("contextmenu", handler);
    return () => document.removeEventListener("contextmenu", handler);
  }, []);

  return null;
}
