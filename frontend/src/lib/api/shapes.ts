import { fetcher } from "../helpers/fetcher";
import { Product } from "@/types/Product";

type ShapeResponse = {
  shapes: Product[];
};

export async function getAllShapes(): Promise<Product[]> {
  const data = await fetcher<ShapeResponse>("/api/Shape");
  return data.shapes;
}
