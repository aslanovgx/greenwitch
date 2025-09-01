// hooks/useLabelColors.ts
"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Colors = Partial<Record<1 | 2 | 3, string>>; // ✅ boş başlaya bilər

type CacheShape = {
  version: number;
  ts: number;
  fp: string;
  data: Colors;  // ✅ partial ola bilər
};

const LS_KEY = "labelColors:v3";

const TTL_DAYS = Math.max(
  1,
  Number.parseInt(process.env.NEXT_PUBLIC_LABEL_TTL_DAYS ?? "90", 10) || 90
);
const TTL_MS = TTL_DAYS * 24 * 60 * 60 * 1000;

function safeParse<T>(raw: string | null): T | null {
  try { return raw ? (JSON.parse(raw) as T) : null; } catch { return null; }
}
function isExpired(ts: number) { return Date.now() - ts > TTL_MS; }

function extractActiveColors(input: any): { colors: Colors | null; fp: string } {
  const arr = Array.isArray(input?.labelSettings) ? input.labelSettings : null;
  if (!arr) return { colors: null, fp: "" };

  const byType: Partial<Record<1 | 2 | 3, { id: number; color: string }>> = {};

  for (const it of arr) {
    const t = Number(it?.type) as 1 | 2 | 3;
    if ((t === 1 || t === 2 || t === 3) && it?.isActive && typeof it?.color === "string") {
      const cur = byType[t];
      if (!cur || Number(it.id) > cur.id) {
        byType[t] = { id: Number(it.id), color: String(it.color) };
      }
    }
  }

  const c1 = byType[1]?.color, c2 = byType[2]?.color, c3 = byType[3]?.color;
  if (!c1 || !c2 || !c3) return { colors: null, fp: "" }; // ✅ 3-ü də ŞƏRTDİR

  const colors: Colors = { 1: c1, 2: c2, 3: c3 };
  const fp = `${byType[1]!.id}:${c1}|${byType[2]!.id}:${c2}|${byType[3]!.id}:${c3}`;
  return { colors, fp };
}

function normalizeLegacy(input: any): { colors: Colors; fp: string } | null {
  if (!input) return null;
  if (input["1"] && input["2"] && input["3"]) {
    const colors: Colors = { 1: String(input["1"]), 2: String(input["2"]), 3: String(input["3"]) };
    const fp = `x:${colors[1]}|x:${colors[2]}|x:${colors[3]}`;
    return { colors, fp };
  }
  const pick = (o: any, k: string) => o?.[k] ?? o?.[k.toUpperCase()] ?? o?.[k.toLowerCase()];
  const best = pick(input, "best");
  const nw = pick(input, "new");
  const disc = pick(input, "discount") ?? pick(input, "ENDİRİM") ?? pick(input, "discountBadge");
  if (best && nw && disc) {
    const colors: Colors = { 1: String(best), 2: String(nw), 3: String(disc) };
    const fp = `x:${colors[1]}|x:${colors[2]}|x:${colors[3]}`;
    return { colors, fp };
  }
  return null;
}

async function fetchColorsFromAPI(): Promise<{ colors: Colors | null; fp: string }> {
  const base = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/$/, ""); // .../api
  const url = `${base}/LabelSettings`; // ✅ doğru endpoint

  const res = await fetch(url, {
    cache: "no-store",
    headers: { "ngrok-skip-browser-warning": "true" },
  });
  if (!res.ok) return { colors: null, fp: "" };

  const json = await res.json();
  if (Array.isArray(json?.labelSettings)) {
    return extractActiveColors(json);
  }
  const alt = normalizeLegacy(json);
  return alt ?? { colors: null, fp: "" };
}

export function invalidateLabelColorsCache() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(LS_KEY);
}

export default function useLabelColors() {
  const [colors, setColors] = useState<Colors>({}); // ✅ boş — default rəng yoxdur
  const [loading, setLoading] = useState(true);
  const mounted = useRef(false);

  // 1) İlk paint: localStorage varsa götür (yenə də default rəng YOX)
  useMemo(() => {
    if (typeof window === "undefined") return;
    const cached = safeParse<CacheShape>(localStorage.getItem(LS_KEY));
    if (cached?.version === 3 && cached.data && !isExpired(cached.ts)) {
      setColors(cached.data);
      setLoading(false);
    }
  }, []);

  // 2) Server yoxlaması (TTL + fingerprint)
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;

    (async () => {
      try {
        const fresh = await fetchColorsFromAPI();
        if (!fresh.colors) { setLoading(false); return; } // ✅ 3 tip də gəlməyibsə, heç nə dəyişmirik

        const cached = safeParse<CacheShape>(localStorage.getItem(LS_KEY));
        const needUpdate =
          !cached?.data ||
          cached.version !== 3 ||
          isExpired(cached.ts) ||
          cached.fp !== fresh.fp;

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
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // ✅ hazırdırsa true: 3 tipin hamısı var
  const ready = Boolean(colors[1] && colors[2] && colors[3]);

  return { colors, loading, ready };
}
