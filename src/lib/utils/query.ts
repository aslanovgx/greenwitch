// lib/utils/query.ts
export function buildSearchParams(params: Record<string, string | number | undefined>) {
  const qp = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && String(v).length > 0) qp.set(k, String(v));
  });
  const qs = qp.toString();
  return qs ? `?${qs}` : "";
}
