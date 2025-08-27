import { apiGet } from "./fetcher";

export type Basic = { id: number; name: string };

type RawBasic = { id?: number | string; name?: string; title?: string; value?: number | string; key?: number | string };

export async function getBrands(): Promise<Basic[]> {
  const raw = await apiGet("/Brand");

  const list: RawBasic[] =
    Array.isArray(raw)         ? raw :
    Array.isArray(raw?.brands) ? raw.brands :
    Array.isArray(raw?.data)   ? raw.data :
    [];

  return list
    .filter((x) => x && (x.name ?? x.title))
    .map((x) => ({
      id: Number(x.id ?? x.value ?? x.key),
      name: String(x.name ?? x.title),
    }));
}
