import { fetcher } from "../helpers/fetcher";
import { Option } from "@/types/Option";

type GenderListResponse = {
  genders: Option[];
};

export async function getAllGenders(): Promise<Option[]> {
  const data = await fetcher<GenderListResponse>("/api/Gender");
  return data.genders;
}
