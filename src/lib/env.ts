// lib/env.ts
export function getPublicApiBase(): string {
  const raw = process.env.NEXT_PUBLIC_API_URL ?? "";
  // başlanğıc/son tırnaqları və boşluqları sil
  const clean = raw.trim().replace(/^['"]+|['"]+$/g, "");
  if (!clean) throw new Error("Missing NEXT_PUBLIC_API_URL");
  return clean.replace(/\/+$/, "");
}