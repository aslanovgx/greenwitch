// lib/api/url.ts

/** NEXT_PUBLIC_API_URL nə olursa-olsun, həmişə doğru /api/... yoluna birləşdirir */
export function apiUrl(path: string) {
  const base = (process.env.NEXT_PUBLIC_API_URL ?? "").trim().replace(/\/+$/, "");

  // path həmişə /api ilə getsin
  const p = path.startsWith("/api") ? path : `/api${path.startsWith("/") ? path : `/${path}`}`;

  // əgər base də /api ilə bitirsə → /api/api/ olmaz
  return (base + p).replace(/\/api\/api\//g, "/api/");
}
