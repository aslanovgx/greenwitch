'use client';
import Image from 'next/image';
import { useRef, useState } from 'react';

type Props = {
  src: string;
  zoom?: number;
  width: number;
  height: number;
  isRound?: boolean; // 🔹 Yeni prop: linza yumru olsunmu?
};

export default function ImageMagnifier({
  src,
  zoom = 2,
  width,
  height,
  isRound = false,
}: Props) {
  const [showLens, setShowLens] = useState(false);
  const [lensPosition, setLensPosition] = useState({ x: 0, y: 0 });
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const bounds = wrapperRef.current?.getBoundingClientRect();
    if (!bounds) return;

    const x = e.clientX - bounds.left;
    const y = e.clientY - bounds.top;

    setLensPosition({ x, y });
  };

  // 🔸 Kvadrat lens üçün ölçü – dairə üçün də eyni lazımdır
  const lensSize = Math.min(width, height) / zoom;

  return (
    <div
      ref={wrapperRef}
      style={{
        position: 'relative',
        width: `${width}px`,
        height: `${height}px`,
        overflow: 'hidden',
        border: '1px solid #ddd',
      }}
      onMouseEnter={() => setShowLens(true)}
      onMouseLeave={() => setShowLens(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Main image */}
      <Image
        src={src}
        alt="zoom-img"
        fill
        style={{ objectFit: 'cover' }}
        sizes={`${width}px`}
      />

      {/* Zoom Lens */}
      {showLens && (
        <div
          style={{
            position: 'absolute',
            pointerEvents: 'none',
            width: `${lensSize}px`,
            height: `${lensSize}px`,
            top: `${lensPosition.y - lensSize / 2}px`,
            left: `${lensPosition.x - lensSize / 2}px`,
            backgroundImage: `url(${src})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: `${width * zoom}px ${height * zoom}px`,
            backgroundPosition: `-${lensPosition.x * zoom - lensSize / 2}px -${lensPosition.y * zoom - lensSize / 2}px`,
            border: '1px solid black',
            borderRadius: isRound ? '50%' : '6px',
            boxShadow: '0 0 6px rgba(0,0,0,0.3)',
            zIndex: 10,
          }}
        />
      )}
    </div>
  );
}
