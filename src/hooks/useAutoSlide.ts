"use client";
import { useState, useEffect } from "react";

export default function useAutoSlide(length: number, delay: number = 3000) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setHasStarted(true), 0);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => {
        setPrevIndex(prev); // burada əminik ki, əvvəlki index budur
        return (prev + 1) % length;
      });
    }, delay);

    return () => clearInterval(interval);
  }, [hasStarted, delay, length]);

  return { activeIndex, prevIndex };
}
