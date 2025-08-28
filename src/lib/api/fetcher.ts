// lib/api/fetcher.ts
/**
 * Env-də /api olsun-olmasın, sonu həmişə /api ilə bitən baza qaytarır.
 * Məs: https://xxx.ngrok-free.app  -> https://xxx.ngrok-free.app/api
 *      https://xxx.ngrok-free.app/api -> https://xxx.ngrok-free.app/api
 */
export function apiBase(): string {
  const raw = (process.env.NEXT_PUBLIC_API_URL ?? "")
    .trim()
    .replaceAll('"', "")        // ehtiyat üçün
    .replace(/\/+$/g, "");      // sondakı /-ları sil

  if (!raw) throw new Error("NEXT_PUBLIC_API_URL boşdur");

  return /\/api$/i.test(raw) ? raw : `${raw}/api`;
}

/** path-ı baza ilə düzgün birləşdirir (başdakı /-ları təmizləyir) */
export function apiUrl(path: string): string {
  const base = apiBase();                // .../api
  const clean = String(path ?? "").replace(/^\/+/, "");
  return `${base}/${clean}`;             // .../api/clean
}

/** Tam URL olub-olmadığını yoxla */
function isAbsoluteUrl(u: string) {
  return /^https?:\/\//i.test(u);
}

async function readTextSafely(res: Response, max = 200) {
  try {
    const txt = await res.text();
    return txt.length > max ? `${txt.slice(0, max)}…` : txt;
  } catch {
    return "";
  }
}

/**
 * GET util:
 * - path: "/Product?size=20" kimi NİSBİ yol VƏ YA tam URL ola bilər.
 * - JSON qaytarır; 204 üçün null qaytarır.
 */
export async function apiGet<T = unknown>(pathOrUrl: string): Promise<T> {
  const url = isAbsoluteUrl(pathOrUrl) ? pathOrUrl : (
    pathOrUrl.startsWith("/api/")
      ? // İmkan veririk ki, birbaşa /api/ ilə də çağırılsın
        `${apiBase()}${pathOrUrl.replace(/^\/api/, "")}`
      : apiUrl(pathOrUrl) // default: .../api/<path>
  );

  const res = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "ngrok-skip-browser-warning": "true",
    },
    cache: "no-store",
  });

  const ct = res.headers.get("content-type") || "";

  if (!res.ok) {
    const snippet = await readTextSafely(res);
    throw new Error(`[${res.status}] ${url}${snippet ? ` :: ${snippet}` : ""}`);
  }

  // 204 No Content
  if (res.status === 204) return null as T;

  if (!ct.includes("application/json")) {
    const snippet = await readTextSafely(res);
    throw new Error(`Server JSON əvəzinə '${ct}' qaytardı: ${url}${snippet ? ` :: ${snippet}` : ""}`);
  }

  return res.json() as Promise<T>;
}
