import { Product } from "@/types/Product";

type ProductListResponse = {
  products: Product[];
};

// 🔹 Bütün məhsullar
export async function getAllProducts(): Promise<Product[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Product`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data: ProductListResponse = await res.json();
   // 🔍 Debug üçün console log
  console.log("Full data from API:", data);
  console.log("Products array:", data.products);
  return data.products; // ✅ burada məhsullar arrayını qaytarırıq
}



// 🔹 Filterlənmiş məhsullar
// export async function getFilteredProducts(query?: string): Promise<Product[]> {
//   const url = query ? `/api/Product/GetProductsByFilter?${query}` : "/api/Product/GetProductsByFilter";
//   const data = await fetcher<ProductListResponse>(url);
//   return data.products;
// }

