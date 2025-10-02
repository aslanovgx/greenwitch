// lib/env.ts
export function getPublicApiBase(): string {
  const raw = process.env.API_SAAT_BASE_URL ?? "";
  // başlanğıc/son tırnaqları və boşluqları sil
  const clean = raw.trim().replace(/^['"]+|['"]+$/g, "");
  if (!clean) throw new Error("Missing API_SAAT_BASE_URL");
  return clean.replace(/\/+$/, "");
}