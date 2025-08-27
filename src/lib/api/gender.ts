import { apiGet } from "./fetcher";
import type { Basic } from "./brand";

type RawBasic = { id?: number | string; name?: string };

export async function getGenders(): Promise<Basic[]> {
  const raw = await apiGet("/Gender");
  const list: RawBasic[] =
    Array.isArray(raw)           ? raw :
    Array.isArray(raw?.genders)  ? raw.genders :
    Array.isArray(raw?.data)     ? raw.data : [];

  return list
    .filter((x) => x?.id && x?.name)
    .map((x) => ({ id: Number(x.id), name: String(x.name) }));
}
