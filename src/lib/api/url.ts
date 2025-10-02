// lib/api/url.ts

/** API_SAAT_BASE_URL nə olursa-olsun, həmişə doğru /api/... yoluna birləşdirir */
export function apiUrl(path: string) {
  const base = (process.env.API_SAAT_BASE_URL ?? "").trim().replace(/\/+$/, "");

  // path həmişə /api ilə getsin
  const p = path.startsWith("/api") ? path : `/api${path.startsWith("/") ? path : `/${path}`}`;

  // əgər base də /api ilə bitirsə → /api/api/ olmaz
  return (base + p).replace(/\/api\/api\//g, "/api/");
}
