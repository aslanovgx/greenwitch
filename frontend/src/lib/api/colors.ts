import { fetcher } from "../helpers/fetcher";
import { Product } from "@/types/Product";

type ColorResponse = {
  colors: Product[];
};

export async function getAllColors(): Promise<Product[]> {
  const data = await fetcher<ColorResponse>("/api/Color");
  return data.colors;
}
