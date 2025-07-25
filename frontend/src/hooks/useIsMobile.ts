'use client';

import { useEffect, useState } from 'react';

export default function useIsMobile(maxWidth: number = 641) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= maxWidth);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, [maxWidth]);

    return isMobile;
}
