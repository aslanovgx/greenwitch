"use client";

import { useState } from "react";
import styles from "./ImageGrid.module.css";
import FadeImage from "@/components/FadeImage";
import useAutoSlide from "@/hooks/useAutoSlide";
import type { VisualSection } from "@/lib/api/visualSections";
import { buildImageUrl } from "@/utils/images";

type ImageData = {
  src: string;
  title: string;
};

type ImageSet = {
  left: ImageData;
  rightTop: ImageData;
  rightBottom: ImageData;
};

function sectionsToImageSets(sections: VisualSection[] = []): ImageSet[] {
  return (sections ?? [])
    .filter((section) => section.status)
    .map((section) => {
      const images = section.images ?? [];

      if (images.length < 3) return null;

      return {
        left: {
          src: buildImageUrl(images[0].imagePath),
          title: `visual-section-${section.id}-left`,
        },
        rightTop: {
          src: buildImageUrl(images[1].imagePath),
          title: `visual-section-${section.id}-right-top`,
        },
        rightBottom: {
          src: buildImageUrl(images[2].imagePath),
          title: `visual-section-${section.id}-right-bottom`,
        },
      };
    })
    .filter(Boolean) as ImageSet[];
}

export default function ImageGrid({
  initialSections = [],
}: {
  initialSections?: VisualSection[];
}) {
  const [imageSets] = useState<ImageSet[]>(() => sectionsToImageSets(initialSections));

  const slideCount = Math.max(imageSets.length, 1);
  const { activeIndex, prevIndex } = useAutoSlide(slideCount);

  if (!imageSets.length) return null;

  const curr = imageSets[activeIndex % imageSets.length];
  const prev = imageSets[prevIndex % imageSets.length];

  return (
    <div className={`${styles.ImageGrid} flex flex-wrap justify-self-center mx-auto`}>
      <div className={`${styles.leftImage} relative`}>
        <div className={`${styles.img} relative`}>
          <FadeImage
            current={curr.left}
            previous={prev.left}
            activeIndex={activeIndex}
            prevIndex={prevIndex}
          />
        </div>
      </div>

      <div className={`${styles.rightImage} flex flex-col`}>
        <div className={`${styles.img} relative`}>
          <FadeImage
            current={curr.rightTop}
            previous={prev.rightTop}
            activeIndex={activeIndex}
            prevIndex={prevIndex}
          />
        </div>

        <div className={`${styles.img} relative`}>
          <FadeImage
            current={curr.rightBottom}
            previous={prev.rightBottom}
            activeIndex={activeIndex}
            prevIndex={prevIndex}
          />
        </div>
      </div>
    </div>
  );
}