// lib/utils/url.ts
function isAbs(u: string) {
  return /^https?:\/\//i.test(u) || /^data:/.test(u) || /^blob:/.test(u);
}

/** Backend-dən gələn "images/..." kimi yolları tam URL-ə çevirir */
export function toAbs(rel: string) {
  const raw = String(rel ?? "").trim();
  if (!raw) return "";

  // Əgər artıq absolute-dursa, olduğu kimi qaytar (amma backslash və boşluqları təmizlə)
  if (isAbs(raw)) {
    return raw.replace(/\\/g, "/").replace(/\s/g, "%20");
  }

  // ENV-dən kök (API) götür, /api-nin sonunu kəs ki, fayl kökünə join edək
  const API = (process.env.API_SAAT_BASE_URL ?? "").trim().replaceAll('"', "");
  const ROOT = API.replace(/\/api\/?$/i, "").replace(/\/+$/, ""); // .../api → ...

  // Windows slash → / ; lider slashi sil ; "images//..." double slash-ı aradan qaldır
  const cleanPath = raw
    .replace(/\\/g, "/")
    .replace(/^\/+/, "")
    .replace(/\s/g, "%20");

  // Tam URL
  let url = `${ROOT}/${cleanPath}`;

  // Bəzi ngrok hallarında header verə bilmədiyimiz üçün warning-i keçmək üçün query əlavə edirik
  try {
    const u = new URL(url);
    u.searchParams.set("ngrok-skip-browser-warning", "true");
    url = u.toString();
  } catch {
    /* noop */
  }

  return url;
}
