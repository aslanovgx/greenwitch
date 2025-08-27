import { apiGet } from "./fetcher";
import type { Basic } from "./brand";

export async function getGenders(): Promise<Basic[]> {
  const raw = await apiGet("/Gender");
  const list =
    Array.isArray(raw) ? raw :
    Array.isArray(raw?.genders) ? raw.genders :
    Array.isArray(raw?.data) ? raw.data : [];
  return list.map((x: any) => ({ id: Number(x.id), name: String(x.name) }));
}
