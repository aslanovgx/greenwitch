import { fetcher } from "../helpers/fetcher";
import { Product } from "@/types/Product";

type ProductListResponse = {
  products: Product[];
};

export async function getAllProducts(): Promise<Product[]> {
  const data = await fetcher<ProductListResponse>("/api/Product/GetAll");
  return data.products;
}

export async function getFilteredProducts(query: string): Promise<Product[]> {
  const data = await fetcher<ProductListResponse>(
    `/api/Product/GetProductsByFilter?${query}`
  );
  return data.products;
}
