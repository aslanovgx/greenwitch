// "use client";

// import { useEffect, useState } from "react";

// type AutoSwitcherProps = {
//     length: number;
//     delay?: number;
//     onIndexChange: (index: number) => void;
// };

// export default function AutoSwitcher({
//     length,
//     delay = 3000,
//     onIndexChange,
// }: AutoSwitcherProps) {
//     const [index, setIndex] = useState(0);

//     useEffect(() => {
//         const interval = setInterval(() => {
//             setIndex((prev) => {
//                 const next = (prev + 1) % length;
//                 onIndexChange(next);
//                 return next;
//             });
//         }, delay);

//         return () => clearInterval(interval);
//     }, [length, delay, onIndexChange]);

//     return null; // Sadəcə logic-dir, render yoxdur
// }
