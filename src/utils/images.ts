// src/utils/images.ts
export function buildImageUrl(rel?: string) {
  const raw = String(rel ?? "").trim();
  if (!raw) {
    console.log("[buildImageUrl] boş rel gəldi");
    return "";
  }

  const FILE_HOST = (process.env.NEXT_PUBLIC_FILE_HOST ?? "https://api.saat.az")
    .replace(/\/+$/, ""); // sonda / sil

  let url = raw;

  // Əgər absolute URL-dirsə → hostu çıxardaq, təmiz path götürək
  if (/^https?:\/\//i.test(url)) {
    url = url.replace(/^https?:\/\/[^/]+/i, "");
  }

  // Başdakı artıq /-ları sil
  url = url.replace(/^\/+/, "");

  // İkiqat images/products → bir dəfə qalsın
  url = url.replace(/images\/products\/images\/products/, "images/products");

  // ardıcıl // təmizlə
  url = url.replace(/\/{2,}/g, "/");

  const finalUrl = `${FILE_HOST}/${url}`;
//   console.log("[buildImageUrl]", { rel, url, finalUrl });

  return finalUrl;
}
