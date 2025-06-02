"use client";

import { useEffect, useState, useRef } from "react";

type TextSwitcherProps = {
  texts: string[];
  delay?: number;
  onIndexChange?: (index: number) => void;
};

export default function TextSwitcher({
  texts,
  delay = 3000,
  onIndexChange,
}: TextSwitcherProps) {
  const [index, setIndex] = useState(0);
  const [hasMounted, setHasMounted] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!hasMounted || texts.length === 0) return;

    intervalRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, delay);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [texts, delay, hasMounted]);

  useEffect(() => {
    if (texts.length > 0) {
      onIndexChange?.(index);
    }
  }, [index, onIndexChange, texts.length]);

  if (!hasMounted) return <p>{texts[0]}</p>;

  return <p>{texts.length > 0 ? texts[index] : ""}</p>;
}
