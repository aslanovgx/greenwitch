import { apiGet } from "./fetcher";
import type { Basic } from "./brand";

export async function getShapes(): Promise<Basic[]> {
  const raw = await apiGet("/Shape");
  const list =
    Array.isArray(raw) ? raw :
    Array.isArray(raw?.shapes) ? raw.shapes :
    Array.isArray(raw?.data) ? raw.data : [];
  return list.map((x: any) => ({ id: Number(x.id), name: String(x.name) }));
}
