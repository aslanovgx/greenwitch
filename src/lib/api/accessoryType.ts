import { apiGet } from "./fetcher";
import type { Basic } from "./brand";

export async function getAccessoryTypes(): Promise<Basic[]> {
  const raw = await apiGet("/AccessoryType");
  const list: { id: number; name: string }[] = Array.isArray(raw) ? raw : [];
  return list.map((item) => ({
    id: item.id,
    name: item.name,
  }));
}