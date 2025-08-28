// lib/api/color.ts
import { apiGet } from "./fetcher";
import type { Basic } from "./brand";

export async function getColors(): Promise<Basic[]> {
  const raw = await apiGet("/Color");
  const list: { id: number; name: string }[] = raw?.colors ?? [];
  return list.map(c => ({ id: c.id, name: c.name }));
}
