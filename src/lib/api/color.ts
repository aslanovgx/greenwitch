import { apiGet } from "./fetcher";
import type { Basic } from "./brand";

export async function getColors(): Promise<Basic[]> {
  const raw = await apiGet("/Color");
  const list =
    Array.isArray(raw) ? raw :
    Array.isArray(raw?.colors) ? raw.colors :
    Array.isArray(raw?.data) ? raw.data : [];
  return list.map((x: any) => ({ id: Number(x.id), name: String(x.name) }));
}
