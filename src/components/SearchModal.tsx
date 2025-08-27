// // src/components/SearchModal.tsx
// "use client";
// import { Product } from "@/types/Product";
// import Image from "next/image";
// import { X } from "lucide-react";

// export default function SearchModal({
//   isOpen,
//   onClose,
//   results,
// }: {
//   isOpen: boolean;
//   onClose: () => void;
//   results: Product[];
// }) {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex justify-center items-center">
//       <div className="bg-white rounded-lg w-[90%] max-w-[600px] max-h-[80vh] overflow-y-auto p-6 shadow-lg relative">
//         <button onClick={onClose} className="absolute top-3 right-3 text-gray-600 hover:text-black">
//           <X />
//         </button>
//         <h2 className="text-lg font-semibold mb-4">Axtarış nəticələri ({results.length})</h2>

//         {results.length === 0 ? (
//           <p>Heç bir uyğun məhsul tapılmadı.</p>
//         ) : (
//           <div className="space-y-4">
//             {results.map((item) => (
//               <div key={item.id} className="flex items-center gap-4 border-b pb-2">
//                 <Image
//                   src={item.images[0]}
//                   alt={item.name}
//                   width={60}
//                   height={60}
//                   className="rounded object-cover"
//                 />
//                 <div>
//                   <p className="font-medium text-sm">{item.title}</p>
//                   <p className="text-xs text-gray-500">{item.desc}</p>
//                   <p className="text-red-700 text-sm font-bold mt-1">{item.price}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
