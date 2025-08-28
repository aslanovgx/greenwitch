import { apiGet } from "./fetcher";

export type Basic = { id: number; name: string };

export async function getBrands(): Promise<Basic[]> {
  const raw = await apiGet("/Brand");

  // müxtəlif strukturları tut:
  const list =
    Array.isArray(raw)            ? raw :
    Array.isArray(raw?.brands)    ? raw.brands :
    Array.isArray(raw?.data)      ? raw.data :
    [];

  // id / name sahələrinə normallaşdır
  return list
    .filter((x: any) => x && (x.name ?? x.title))
    .map((x: any) => ({
      id: Number(x.id ?? x.value ?? x.key),
      name: String(x.name ?? x.title),
    }));
}
