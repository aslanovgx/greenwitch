// lib/urls.ts
// Slug generator – brand + name → "rolex-submariner"
export const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();

// Pretty URL qurmaq üçün helper
export const buildProductUrl = (id: number, brandName?: string, name?: string) => {
  const slug = slugify(`${brandName ?? ""} ${name ?? ""}`.trim());
  return `/products/${slug}-${id}`;
};
