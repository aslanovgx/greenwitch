import { fetcher } from "../helpers/fetcher";
import { Product } from "@/types/Product";

type BrandResponse = {
  brands: Product[];
};

export async function getAllBrands(): Promise<Product[]> {
  const data = await fetcher<BrandResponse>("/api/Brand");
  return data.brands;
}
