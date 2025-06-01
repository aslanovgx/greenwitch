// 'use client';
// import { useRef, useState, useEffect } from 'react';
// import { FixedSizeList as List, ListChildComponentProps } from 'react-window';
// import ProductCard from './ProductCard'; // Əgər başqa yerdədirsə, path-ı düz yaz
// import { Product } from '@/types/Product';
// import { ChevronLeft, ChevronRight } from 'lucide-react';

// interface VirtualProductListProps {
//     products: Product[];
// }

// export default function VirtualProductList({ products }: VirtualProductListProps) {

//     const outerRef = useRef<HTMLDivElement | null>(null);

//     const [canScrollLeft, setCanScrollLeft] = useState(false);
//     const [canScrollRight, setCanScrollRight] = useState(true);

//     const containerRef = useRef<HTMLDivElement>(null);
//     const [containerWidth, setContainerWidth] = useState(1440);
//     const [itemSize, setItemSize] = useState(260); // default

//     const scrollBy = (offset: number) => {
//         if (outerRef.current) {
//             outerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
//         }
//     };

//     const checkScrollPosition = () => {
//         const el = outerRef.current;
//         if (el) {
//             setCanScrollLeft(el.scrollLeft > 0);
//             setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
//         }
//     };

//     useEffect(() => {
//         const el = outerRef.current;
//         if (!el) return;

//         checkScrollPosition();
//         el.addEventListener('scroll', checkScrollPosition);

//         return () => {
//             el.removeEventListener('scroll', checkScrollPosition);
//         };
//     }, []);

//     // Hər bir render olunan sıranın komponenti
//     const Row = ({ index, style }: ListChildComponentProps) => {
//         const item = products[index];
//         if (!item) return null;

//         return (
//             <div style={style} className="pr-4">
//                 <ProductCard item={item} />
//             </div>
//         );
//     };

//     useEffect(() => {
//         const updateSize = () => {
//             if (containerRef.current) {
//                 const width = containerRef.current.clientWidth;

//                 // Kartların ekrana görə sayı
//                 const itemsPerRow = width > 1200 ? 5 : width > 900 ? 4 : width > 600 ? 2 : 1;

//                 // Yeni item ölçüsü (padding nəzərə alınır)
//                 const newSize = Math.floor((width - (itemsPerRow - 1) * 16) / itemsPerRow);
//                 setContainerWidth(width);
//                 setItemSize(newSize);
//             }
//         };

//         updateSize();
//         window.addEventListener('resize', updateSize);
//         return () => window.removeEventListener('resize', updateSize);
//     }, []);

//     return (
//         <div
//             ref={containerRef}
//             className="relative w-full max-w-[1440px] mx-auto px-4"
//         >


//             {/* SOL OX */}
//             {canScrollLeft && (
//                 <button onClick={() => scrollBy(-300)} className="cursor-pointer absolute left-4 top-1/2 -translate-y-1/2 z-1  bg-[#CBCBCB] p-2 rounded-full shadow hover:bg-gray-300 transition">
//                     <ChevronLeft size={24} className="text-black" />
//                 </button>
//             )}

//             <List
//                 outerRef={outerRef}
//                 height={440} // Kart hündürlüyü
//                 itemCount={products.length}
//                 // itemSize={260} // Kart eni + gap
//                 itemSize={itemSize + 16} // itemWidth + gap
//                 layout="horizontal"
//                 // width={1440} // Görünən sahənin eni
//                 width={containerWidth} // ✅ Dinamik genişlik
//                 className="react-window"
//             >
//                 {Row}
//             </List>

//             {/* SAĞ OX */}

//             {canScrollRight && (
//                 <button onClick={() => scrollBy(300)} className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 z-1  bg-[#CBCBCB] p-2 rounded-full shadow hover:bg-gray-300 transition">
//                     <ChevronRight size={24} className="text-black" />
//                 </button>
//             )}
//         </div>
//     );
// }