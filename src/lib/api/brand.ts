import { apiGet } from "./fetcher";

export type Basic = { id: number; name: string };

export async function getBrands(): Promise<Basic[]> {
  const raw = await apiGet("/Brand");

  // raw.brands həmişə array olacaq
  const list: { id: number; name: string }[] = raw?.brands ?? [];

  return list.map(b => ({
    id: b.id,
    name: b.name,
  }));
}
