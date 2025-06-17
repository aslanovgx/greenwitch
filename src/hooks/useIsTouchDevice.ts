'use client';
import { useEffect, useState } from 'react';

export default function useIsTouchDevice(): boolean {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const match = window.matchMedia('(hover: none) and (pointer: coarse)');
      setIsTouch(match.matches);
    }
  }, []);

  return isTouch;
}
