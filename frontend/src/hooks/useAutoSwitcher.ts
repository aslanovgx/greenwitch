import { useEffect, useState } from "react";

export function useAutoSwitcher(length: number, delay = 3000): number {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % length);
        }, delay);

        return () => clearInterval(interval);
    }, [length, delay]);

    return index;
}
