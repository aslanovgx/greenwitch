"use client";
import Image from "next/image";
import { useRef, useState, useCallback } from "react";

type Props = {
    src: string;
    width: number;
    height: number;
    zoom?: number;     // 2..3 ideal
    lensMin?: number;  // minimum lens ölçüsü
    isRound?: boolean;
    hiResSrc?: string; // 👈 əlavə
    priority?: boolean;
};

export default function ImageMagnifierBG({
    src,
    width,
    height,
    zoom = 2,
    lensMin = 40,
    isRound = false,
    hiResSrc,
    priority = false,
}: Props) {
    const wrapRef = useRef<HTMLDivElement>(null);
    const [show, setShow] = useState(false);
    const [cx, setCx] = useState(0);
    const [cy, setCy] = useState(0);

    // Next/Image yüklənəndən sonra optimized eyni-origin URL (CORS-free)
    const [bgUrl, setBgUrl] = useState<string>(src);
    const [natural, setNatural] = useState({ w: width, h: height });
    const [hiReady, setHiReady] = useState(false)

    // 🔹 Lens ölçüsü — artıq LENS_MIN həqiqətən işləyir
    const baseLens = lensMin ?? 220;
    const lensSize = Math.min(baseLens, Math.min(width, height)); // çox böyük olmasın deyə clamp
    const half = lensSize / 2;


    const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(n, max));

    const handleMove = (clientX: number, clientY: number) => {
        const bounds = wrapRef.current?.getBoundingClientRect();
        if (!bounds) return;
        const x = clientX - bounds.left;
        const y = clientY - bounds.top;

        // ƏVVƏL:
        // setCx(clamp(x, half, width - half));
        // setCy(clamp(y, half, height - half));

        // YENİ:
        setCx(clamp(x, 0, width));
        setCy(clamp(y, 0, height));
    };

    // Next/Image tamam olanda: natural ölçü + optimized URL
    const onDone = (img: HTMLImageElement) => {
        const w = img.naturalWidth || width;
        const h = img.naturalHeight || height;
        setNatural({ w, h });
        // YALNIZ hiRes hazır DEYİLSƏ currentSrc-ə keç
        const base = img.currentSrc || src;
        setBgUrl((prev) => (hiReady ? prev : base)); // NEW
    };

    // NEW: Hover zamanı hiRes preload
    const preloadHiRes = useCallback(() => {
        if (!hiResSrc || hiReady) return;
        if (typeof window === "undefined") return; // (optional, təhlükəsiz)
        const hi = new window.Image();
        hi.decoding = "async";
        hi.loading = "eager";
        hi.src = hiResSrc;
        hi.onload = () => {
            setHiReady(true);
            setBgUrl(hiResSrc);
        };
    }, [hiResSrc, hiReady]);


    // --- YENİ (INTUITIVE ZOOM) ---
    const bgW = width * zoom;   // zoom=1 → fon genişliyi div genişliyi qədər
    const bgH = height * zoom;  // zoom=1 → fon hündürlüyü div hündürlüyü qədər

    // const scaleX = 1;
    // const scaleY = 1;

    // zoom indi birbaşa div-ə görə hesablanır
    const bgPosX = -(cx * zoom - lensSize / 2);
    const bgPosY = -(cy * zoom - lensSize / 2);

    return (
        <div
            ref={wrapRef}
            style={{
                position: "relative",
                width,
                height,
                borderRadius: 12,
                overflow: "hidden",
                border: "1px solid #e5e7eb",
                userSelect: "none",
                touchAction: "none",
            }}
            onMouseEnter={() => { setShow(true); preloadHiRes(); }} // NEW
            onMouseLeave={() => setShow(false)}
            onMouseMove={(e) => handleMove(e.clientX, e.clientY)}
            onTouchStart={() => { setShow(true); preloadHiRes(); }}  // NEW
            onTouchEnd={() => setShow(false)}
            onTouchMove={(e) => {
                const t = e.touches[0];
                if (t) handleMove(t.clientX, t.clientY);
            }}
        >
            {/* Base şəkil (Next/Image – optimized, same-origin) */}
            <Image
                src={src}
                alt="product"
                fill
                sizes="(max-width: 640px) 420px,
       (max-width: 768px) 300px,
       (max-width: 1024px) 388px,
       539px"
                style={{ objectFit: "contain" }}
                draggable={false}
                onLoadingComplete={onDone}
                priority={priority}                // NEW
                fetchPriority={priority ? "high" : "auto"} // NEW
            />

            {/* Lens */}
            {show && (
                <div
                    style={{
                        position: "absolute",
                        top: cy - half,
                        left: cx - half,
                        width: lensSize,
                        height: lensSize,
                        pointerEvents: "none",
                        overflow: "hidden",
                        borderRadius: isRound ? "50%" : 8,
                        border: "1px solid rgba(0,0,0,0.4)",
                        boxShadow: "0 4px 14px rgba(0,0,0,0.25)",
                        // backgroundImage: `url(${bgUrl})`,
                        backgroundImage: `url("${bgUrl}")`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: `${bgW}px ${bgH}px`,
                        backgroundPosition: `${bgPosX}px ${bgPosY}px`,
                        zIndex: 10,
                        backdropFilter: "saturate(1.05)",
                    }}
                />
            )}
        </div>
    );
}
