// "use client";
// import { useState } from "react";
// import Image, { ImageProps } from "next/image";

// type Props = ImageProps & {
//   className?: string;
// };

// export default function ImageWithFade({ className = "", ...props }: Props) {
//   const [loaded, setLoaded] = useState(false);

//   return (
//     <Image
//       {...props}
//       onLoadingComplete={() => setLoaded(true)}
//       className={`${className} transition-opacity duration-500 ease-in-out ${loaded ? "opacity-100" : "opacity-0"}`}
//     />
//   );
// }
