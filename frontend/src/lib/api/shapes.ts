import { fetcher } from "../helpers/fetcher";
import { Option } from "@/types/Option";

type ShapeListResponse = {
  shapes: Option[];
};

export async function getAllShapes(): Promise<Option[]> {
  const data = await fetcher<ShapeListResponse>("/api/Shape");
  return data.shapes;
}
