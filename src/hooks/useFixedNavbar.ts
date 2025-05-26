// import { useState, useEffect } from "react";


// export const useFixedNavbar = (row1Ref: React.RefObject<HTMLElement>) => {
//     const [fixed, setFixed] = useState(false);

//     useEffect(() => {
//         function handleScroll() {
//             if (!row1Ref.current) return;

//             const row1Bottom = row1Ref.current.getBoundingClientRect().bottom;
//             if (row1Bottom <= 0) {
//                 setFixed(true);
//             } else {
//                 setFixed(false);
//             }
//         }

//         window.addEventListener("scroll", handleScroll);
//         return () => window.removeEventListener("scroll", handleScroll);
//     }, []);
//     return fixed;
// };
