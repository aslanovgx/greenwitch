import { fetcher } from "../helpers/fetcher";
import { Option } from "@/types/Option";

type ColorListResponse = {
  colors: Option[];
};

export async function getAllColors(): Promise<Option[]> {
  const data = await fetcher<ColorListResponse>("/api/Color");
  return data.colors;
}
