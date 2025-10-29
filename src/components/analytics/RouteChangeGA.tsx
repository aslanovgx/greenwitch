// src/components/analytics/RouteChangeGA.tsx
"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function RouteChangeGA({ GA_ID }: { GA_ID: string }) {
    const pathname = usePathname();
    const search = useSearchParams()?.toString();

    useEffect(() => {
        if (!GA_ID || typeof window === "undefined") return;
        const page_path = search ? `${pathname}?${search}` : pathname;
        // @ts-ignore
        window.gtag?.("config", GA_ID, { page_path });
    }, [pathname, search, GA_ID]);

    return null;
}
