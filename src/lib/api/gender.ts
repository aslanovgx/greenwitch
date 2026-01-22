// lib/api/gender.ts
import { apiGet } from "./fetcher";
import type { Basic } from "./brand";

export async function getGenders(): Promise<Basic[]> {
  const raw = await apiGet("/Gender");
  const list: { id: number; name: string }[] = raw?.genders ?? [];
  return list.map(g => ({ id: g.id, name: g.name }));
}
