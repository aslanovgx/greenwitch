// hooks/useLabelColors.ts
"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Colors = Record<1 | 2 | 3, string>;

type CacheShape = {
  version: number;
  ts: number;            // saxlanma vaxtı
  fp: string;            // fingerprint (aktiv rənglərin imzası)
  data: Colors;
};

const LS_KEY = "labelColors:v3";

// TTL günlərini ENV-dən oxu (məs: 30, 60...). Default 90 gün.
const TTL_DAYS = Math.max(
  1,
  Number.parseInt(process.env.NEXT_PUBLIC_LABEL_TTL_DAYS ?? "90", 10) || 90
);
const TTL_MS = TTL_DAYS * 24 * 60 * 60 * 1000;

// ----- util -----
function safeParse<T>(raw: string | null): T | null {
  try { return raw ? (JSON.parse(raw) as T) : null; } catch { return null; }
}
function isExpired(ts: number) { return Date.now() - ts > TTL_MS; }

// `labelSettings` → {colors, fp} çıxart
// Gözlənilən input:
// { "labelSettings": [ { id, color, type: 1|2|3, isActive: boolean }, ... ] }
function extractActiveColors(input: any): { colors: Colors | null; fp: string } {
  const arr = Array.isArray(input?.labelSettings) ? input.labelSettings : null;
  if (!arr) return { colors: null, fp: "" };

  // Eyni type üçün bir neçə true ola bilərsə, ən yeni (ən böyük id) götürək.
  const byType: Record<1|2|3, { id: number; color: string } | undefined> = { 1: undefined, 2: undefined, 3: undefined };

  for (const it of arr) {
    const t = Number(it?.type) as 1|2|3;
    if ((t === 1 || t === 2 || t === 3) && it?.isActive && typeof it?.color === "string") {
      const cur = byType[t];
      if (!cur || Number(it.id) > cur.id) {
        byType[t] = { id: Number(it.id), color: String(it.color) };
      }
    }
  }

  if (!byType[1]?.color || !byType[2]?.color || !byType[3]?.color) {
    return { colors: null, fp: "" };
  }

  const colors: Colors = { 1: byType[1]!.color, 2: byType[2]!.color, 3: byType[3]!.color };
  const fp = `${byType[1]!.id}:${byType[1]!.color}|${byType[2]!.id}:${byType[2]!.color}|${byType[3]!.id}:${byType[3]!.color}`;
  return { colors, fp };
}

// Endpoint-i istəsən ENV ilə dəyiş: NEXT_PUBLIC_LABELS_ENDPOINT
async function fetchColorsFromAPI(): Promise<{ colors: Colors | null; fp: string }> {
  const base = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/$/, "");
  const endpoint = process.env.NEXT_PUBLIC_LABELS_ENDPOINT || "/api/LabelColors"; 
  const url = `${base}${endpoint}`;

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) return { colors: null, fp: "" };

  const json = await res.json();

  // 1) Sənin verdiyin struktur (labelSettings) üçün
  if (Array.isArray(json?.labelSettings)) {
    return extractActiveColors(json);
  }

  // 2) Əgər köhnə format olsa (1/2/3 və ya best/new/discount), burdan da dəstək:
  const alt = normalizeLegacy(json);
  return alt ?? { colors: null, fp: "" };
}

function normalizeLegacy(input: any): { colors: Colors; fp: string } | null {
  if (!input) return null;
  // birbaşa 1/2/3
  if (input["1"] && input["2"] && input["3"]) {
    const colors = { 1: String(input["1"]), 2: String(input["2"]), 3: String(input["3"]) } as Colors;
    const fp = `x:${colors[1]}|x:${colors[2]}|x:${colors[3]}`;
    return { colors, fp };
  }
  // semantic
  const pick = (o: any, k: string) => o?.[k] ?? o?.[k.toUpperCase()] ?? o?.[k.toLowerCase()];
  const best = pick(input, "best");
  const nw   = pick(input, "new");
  const disc = pick(input, "discount") ?? pick(input, "ENDİRİM") ?? pick(input, "discountBadge");
  if (best && nw && disc) {
    const colors = { 1: String(best), 2: String(nw), 3: String(disc) } as Colors;
    const fp = `x:${colors[1]}|x:${colors[2]}|x:${colors[3]}`;
    return { colors, fp };
  }
  return null;
}

// Manual invalidate (lazım olsa)
export function invalidateLabelColorsCache() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(LS_KEY);
}

export default function useLabelColors() {
  // İlk açılış fallback — boş qalmasın
  const [colors, setColors] = useState<Colors>({ 1: "#DADADA", 2: "#75A7B0", 3: "#EBD078" });
  const [loading, setLoading] = useState(true);
  const mounted = useRef(false);

  // 1) İlk paint-də localStorage
  useMemo(() => {
    if (typeof window === "undefined") return;
    const cached = safeParse<CacheShape>(localStorage.getItem(LS_KEY));
    if (cached?.version === 3 && cached.data && !isExpired(cached.ts)) {
      setColors(cached.data);
      setLoading(false);
    }
  }, []);

  // 2) Arxa planda server yoxlaması (TTL + fingerprint)
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;

    (async () => {
      try {
        const fresh = await fetchColorsFromAPI();
        if (!fresh.colors) { setLoading(false); return; }

        const cached = safeParse<CacheShape>(localStorage.getItem(LS_KEY));

        const needUpdate =
          !cached?.data ||
          cached.version !== 3 ||
          isExpired(cached.ts) ||
          cached.fp !== fresh.fp;   // 🔑 aktiv rənglər dəyişibsə dərhal yenilə

        if (needUpdate) {
          setColors(fresh.colors);
          const payload: CacheShape = {
            version: 3,
            ts: Date.now(),
            fp: fresh.fp,
            data: fresh.colors,
          };
          localStorage.setItem(LS_KEY, JSON.stringify(payload));
        }
      } catch {
        // səssiz saxla
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { colors, loading };
}
