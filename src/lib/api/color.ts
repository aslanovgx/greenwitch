import { apiGet } from "./fetcher";
import type { Basic } from "./brand";

type RawBasic = { id?: number | string; name?: string };

export async function getColors(): Promise<Basic[]> {
  const raw = await apiGet("/Color");
  const list: RawBasic[] =
    Array.isArray(raw)          ? raw :
    Array.isArray(raw?.colors)  ? raw.colors :
    Array.isArray(raw?.data)    ? raw.data : [];
    
  return list
    .filter((x) => x?.id && x?.name)
    .map((x) => ({ id: Number(x.id), name: String(x.name) }));
}
