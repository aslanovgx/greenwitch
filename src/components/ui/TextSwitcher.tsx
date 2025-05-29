"use client";
import { useEffect, useState } from "react";

export default function TextSwitcher({
  texts,
  onIndexChange,
}: {
  texts: string[];
  onIndexChange?: (index: number) => void;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => {
        const newIndex = (prev + 1) % texts.length;
        return newIndex;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [texts]);

  // Yeni effect: index dəyişəndə parent-a xəbər ver
  useEffect(() => {
    if (onIndexChange) {
      onIndexChange(index);
    }
  }, [index, onIndexChange]);

  return <p>{texts[index]}</p>;
}
