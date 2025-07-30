import { fetcher } from "../helpers/fetcher";
import { Product } from "@/types/Product";

type GenderResponse = {
  genders: Product[];
};

export async function getAllGenders(): Promise<Product[]> {
  const data = await fetcher<GenderResponse>("/api/Gender/GetAll");
  return data.genders;
}

