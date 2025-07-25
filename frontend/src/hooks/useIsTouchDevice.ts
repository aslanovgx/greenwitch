'use client';

import { useEffect, useState } from 'react';

export default function useIsTouchDevice(): boolean {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const hasTouch =
      ('ontouchstart' in window ||
        navigator.maxTouchPoints > 1) &&
      window.matchMedia('(hover: none), (pointer: coarse)').matches;

    setIsTouch(hasTouch);
  }, []);

  return isTouch;
}
