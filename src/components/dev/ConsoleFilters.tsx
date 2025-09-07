// src/components/dev/ConsoleFilters.tsx
"use client";

import { useEffect } from "react";

export default function ConsoleFilters() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;

    const blockList = [
      /Image with src .* has "fill" but is missing "sizes"/i,
      /has "fill" prop and "sizes" prop of "100vw", but image is not rendered at full viewport width/i,
      /either width or height modified, but not the other/i,
      // istəsən başqa Next/Image mesajlarını da əlavə edə bilərsən:
      /Image with src .* has an invalid "sizes" property/i,
    ];

    const origWarn = console.warn.bind(console);

    console.warn = (...args: unknown[]) => {
      const text = args.map(a =>
        typeof a === "string" ? a : (a as any)?.message ?? ""
      ).join(" ");

      if (blockList.some(rx => rx.test(text))) {
        // swallow
        return;
      }
      origWarn(...args);
    };

    return () => {
      console.warn = origWarn; // cleanup
    };
  }, []);

  return null;
}
