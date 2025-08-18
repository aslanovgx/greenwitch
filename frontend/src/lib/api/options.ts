import { fetcher } from "../helpers/fetcher";
import { Option } from "@/types/Option";

// 🔹 Genders
export async function getAllGenders(): Promise<Option[]> {
  const data = await fetcher<{ genders: Option[] }>("/Gender");
  return data.genders;  // <-- array-i qaytarırıq
}

// 🔹 Brands
export async function getAllBrands(): Promise<Option[]> {
  const data = await fetcher<Option[]>("/Brand");
  return data;
}

// 🔹 Colors
export async function getAllColors(): Promise<Option[]> {
  const data = await fetcher<Option[]>("/Color");
  return data;
}

// 🔹 Shapes
export async function getAllShapes(): Promise<Option[]> {
  const data = await fetcher<Option[]>("/Shape");
  return data;
}
