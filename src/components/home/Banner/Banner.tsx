// src/components/home/Banner/Banner.tsx
"use client";

import { useState } from "react";
import styles from "./Banner.module.css";
import FadeImage from "@/components/FadeImage";
import useAutoSlide from "@/hooks/useAutoSlide";
import type { InfoSection } from "@/lib/api/infoSections";
import { buildImageUrl } from "@/utils/images";
type BannerSet = { images: { src: string; alt: string; url?: string | null }[] };


function chunk3<T>(arr: T[]): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += 3) out.push(arr.slice(i, i + 3));
  return out;
}

// SSR-dən gələn section-ları BannerSet-ə map edən helper
function sectionsToSets(sections: InfoSection[] = []): BannerSet[] {
  const active = (sections ?? []).filter((s) => s.status);
  const mapped: BannerSet[] = active.flatMap((sec) => {
    const imgs = (sec.images ?? []).map((im, i) => ({
      src: buildImageUrl(im.imagePath),
      alt: `${sec.title ?? "section"}-${i + 1}`,
      url: sec.url ?? undefined, // 👈 burada url saxlanılır
    }));
    return chunk3(imgs).map((block) => ({ images: block }));
  });
  return mapped.filter((s) => s.images.length === 3);
}

export default function Banner({ initialSections = [] }: { initialSections?: InfoSection[] }) {
  const [sets] = useState<BannerSet[]>(() => sectionsToSets(initialSections));
  const slideCount = Math.max(sets.length, 1);
  const { activeIndex, prevIndex } = useAutoSlide(slideCount);

  if (!sets.length) return null;

  const curr = sets[activeIndex % sets.length];
  const prev = sets[prevIndex % sets.length];

  return (
    <div className={`${styles.row_4} max-w-[1262px] mx-auto flex justify-center items-center`}>
      <div className="flex justify-center items-center w-full">
        {curr.images.map((img, idx) => (
          <div key={`${img.src}-${idx}`} className={`relative ${styles[`banner_${idx + 1}`]}`}>
            {img.url ? (
              <a href={img.url} target="_blank" rel="noopener noreferrer">
                <FadeImage
                  current={{ src: curr.images[idx].src, title: curr.images[idx].alt }}
                  previous={{ src: prev.images[idx].src, title: prev.images[idx].alt }}
                  activeIndex={activeIndex}
                  prevIndex={prevIndex}
                />
              </a>
            ) : (
              <FadeImage
                current={{ src: curr.images[idx].src, title: curr.images[idx].alt }}
                previous={{ src: prev.images[idx].src, title: prev.images[idx].alt }}
                activeIndex={activeIndex}
                prevIndex={prevIndex}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
