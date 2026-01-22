const API_BASE = (process.env.NEXT_PUBLIC_API_BASE ?? "https://api.saat.az/api").replace(/\/+$/,"");
const ASSET_BASE = (process.env.NEXT_PUBLIC_ASSET_BASE ?? "https://api.saat.az").replace(/\/+$/,"");

export function buildImageUrl(rel?: string) {
  const raw = String(rel ?? "").trim();
  if (!raw) return "";

  // Əgər artıq absolute-dirsə → encode edib qaytar
  if (/^https?:\/\//i.test(raw)) return encodeURI(raw);

  // Backslash → slash
  let path = raw.replace(/\\/g, "/");

  // Başında slash yoxdursa əlavə et
  if (!path.startsWith("/")) path = `/${path}`;

  // Şəkillər üçün /images kökü ASSET_BASE ilə getməlidir, /api ilə yox
  const base = path.startsWith("/images/") ? ASSET_BASE : API_BASE;

  return encodeURI(`${base}${path}`.replace(/([^:]\/)\/+/g, "$1"));
}
