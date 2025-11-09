"use client";
import Image, { ImageProps } from "next/image";

export default function SafeImage(props: ImageProps) {
  return (
    <Image
      {...props}
      draggable={false}
      onContextMenu={(e) => e.preventDefault()}
    />
  );
}
