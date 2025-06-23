'use client';
import Image from 'next/image';
import { useRef, useState } from 'react';

type Props = {
  src: string;
  zoom: number;
  width: number;
  height: number;
};

export default function ImageMagnifier({ src, zoom = 2, width, height }: Props) {
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

  const lensSize = {
    width: width / zoom,
    height: height / zoom,
  };

  return (
    <div
      ref={wrapperRef}
      style={{
        position: 'relative',
        width,
        height,
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
            width: `${lensSize.width}px`,
            height: `${lensSize.height}px`,
            top: `${lensPosition.y - lensSize.height / 2}px`,
            left: `${lensPosition.x - lensSize.width / 2}px`,
            backgroundImage: `url(${src})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: `${width * zoom}px ${height * zoom}px`,
            backgroundPosition: `-${lensPosition.x * zoom - lensSize.width / 2}px -${lensPosition.y * zoom - lensSize.height / 2}px`,
            border: '1px solid black',
            borderRadius: '0px', // Dəyirmi istəmirsənsə 0, dairə istəyirsənsə '50%'
            boxShadow: '0 0 5px rgba(0,0,0,0.3)',
            zIndex: 10,
          }}
        />
      )}
    </div>
  );
}
