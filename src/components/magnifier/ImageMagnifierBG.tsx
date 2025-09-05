"use client";
import Image from "next/image";
import { useRef, useState } from "react";

type Props = {
    src: string;
    width: number;
    height: number;
    zoom?: number;     // 2..3 ideal
    lensMin?: number;  // minimum lens ölçüsü
    isRound?: boolean;
    hiResSrc?: string; // 👈 əlavə
};

export default function ImageMagnifierBG({
    src,
    width,
    height,
    zoom = 2,
    lensMin = 40,
    isRound = false,
    hiResSrc,
}: Props) {
    const wrapRef = useRef<HTMLDivElement>(null);
    const [show, setShow] = useState(false);
    const [cx, setCx] = useState(0);
    const [cy, setCy] = useState(0);

    // Next/Image yüklənəndən sonra optimized eyni-origin URL (CORS-free)
    const [bgUrl, setBgUrl] = useState<string>(src);
    const [natural, setNatural] = useState({ w: width, h: height });

    const lensSize = Math.max(lensMin, Math.min(width, height) / zoom);
    const half = lensSize / 2;

    const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(n, max));

    const handleMove = (clientX: number, clientY: number) => {
        const bounds = wrapRef.current?.getBoundingClientRect();
        if (!bounds) return;
        const x = clientX - bounds.left;
        const y = clientY - bounds.top;
        setCx(clamp(x, half, width - half));
        setCy(clamp(y, half, height - half));
    };

    // Next/Image tamam olanda: natural ölçü + optimized URL
    const onDone = (img: HTMLImageElement) => {
        const w = img.naturalWidth || width;
        const h = img.naturalHeight || height;
        setNatural({ w, h });
        // hiRes varsa onu, yoxdursa currentSrc-ni istifadə et
        setBgUrl(hiResSrc || img.currentSrc || src);
        // currentSrc = Next-in proxylənmiş eyni-origin URL-i → background üçün idealdır
        if (img.currentSrc) setBgUrl(img.currentSrc);
    };

    const bgW = natural.w * zoom;
    const bgH = natural.h * zoom;
    const scaleX = natural.w / width;
    const scaleY = natural.h / height;

    const bgPosX = -(cx * scaleX * zoom - lensSize / 2);
    const bgPosY = -(cy * scaleY * zoom - lensSize / 2);

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
            onMouseEnter={() => setShow(true)}
            onMouseLeave={() => setShow(false)}
            onMouseMove={(e) => handleMove(e.clientX, e.clientY)}
            onTouchStart={() => setShow(true)}
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
                sizes={`${width}px`}
                style={{ objectFit: "contain" }}
                draggable={false}
                onLoadingComplete={onDone}
                priority={false}
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
                        backgroundImage: `url(${bgUrl})`,
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
