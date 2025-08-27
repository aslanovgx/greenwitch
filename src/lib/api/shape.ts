import { apiGet } from "./fetcher";
import type { Basic } from "./brand";

type RawBasic = { id?: number | string; name?: string };

export async function getShapes(): Promise<Basic[]> {
  const raw = await apiGet("/Shape");
  const list: RawBasic[] =
    Array.isArray(raw)          ? raw :
    Array.isArray(raw?.shapes)  ? raw.shapes :
    Array.isArray(raw?.data)    ? raw.data : [];

  return list
    .filter((x) => x?.id && x?.name)
    .map((x) => ({ id: Number(x.id), name: String(x.name) }));
}
