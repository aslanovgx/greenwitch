// lib/utils/imagePair.ts
import { toAbs } from "@/lib/utils/url";

type ProductLike = {
  images?: string[];      // list endpoint
  thumbnails?: string[];  // detail endpoint
};

export function buildImagePair(p: ProductLike) {
  // mənbəni birləşdir: detail varsa onu, yoxsa list
  const raw = Array.isArray(p.thumbnails) && p.thumbnails.length
    ? p.thumbnails
    : (Array.isArray(p.images) ? p.images : []);

  // təmizlə + absolute et + dublikatları sil
  const gallery = [...new Set(
    raw
      .map(v => String(v ?? "").trim())
      .filter(Boolean)
      .map(toAbs)                         // "images/..." → "https://.../images/..."
  )];

  const cover = gallery[0] ?? "/placeholder.png";
  const hover = gallery[1] ?? gallery[0] ?? "/placeholder.png";

  return { cover, hover, gallery };
}
