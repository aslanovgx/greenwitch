import { fetcher } from "../helpers/fetcher";
import { Option } from "@/types/Option";

export async function getAllBrands(): Promise<Option[]> {
  const data = await fetcher<any>("/api/Brand");
  console.log("Brand API raw data:", data);

  if (Array.isArray(data)) {
    return data; // düz array gəlirsə
  }

  if (data.brands) {
    return data.brands;
  }

  if (data.items) {
    return data.items;
  }

  return [];
}
