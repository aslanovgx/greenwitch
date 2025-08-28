// lib/api/shape.ts
import { apiGet } from "./fetcher";
import type { Basic } from "./brand";

export async function getShapes(): Promise<Basic[]> {
  const raw = await apiGet("/Shape");
  const list: { id: number; name: string }[] = raw?.shapes ?? [];
  return list.map(s => ({ id: s.id, name: s.name }));
}
