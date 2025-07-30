import { fetcher } from "../helpers/fetcher";
import { Option } from "@/types/Option";

type BrandListResponse = {
  brands: Option[];
};

export async function getAllBrands(): Promise<Option[]> {
  const data = await fetcher<BrandListResponse>("/api/Brand");
  return data.brands;
}
