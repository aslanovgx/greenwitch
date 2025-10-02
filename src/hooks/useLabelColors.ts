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

/* ── helpers ────────────────────────────────────────────────────────────── */
const isRecord = (v: unknown): v is Record<string, unknown> =>
  typeof v === "object" && v !== null;

function safeParse<T>(raw: string | null): T | null {
  try { return raw ? (JSON.parse(raw) as T) : null; } catch { return null; }
}
function isExpired(ts: number) { return Date.now() - ts > TTL_MS; }

/* BE cavabı üçün minimal tip */
type LabelSettingItem = {
  id: number;
  type: 1 | 2 | 3;
  isActive: boolean;
  color: string;
};

/* Unknown → LabelSettingItem[] təhlükəsiz çıxarma */
function readLabelSettings(input: unknown): LabelSettingItem[] {
  if (!isRecord(input)) return [];
  const arr = Array.isArray((input as Record<string, unknown>).labelSettings)
    ? ((input as Record<string, unknown>).labelSettings as unknown[])
    : [];
  const out: LabelSettingItem[] = [];

  for (const it of arr) {
    if (!isRecord(it)) continue;
    const id = Number(it.id);
    const typeNum = Number(it.type);
    const type = (typeNum === 1 || typeNum === 2 || typeNum === 3) ? (typeNum as 1 | 2 | 3) : undefined;
    const isActive = Boolean(it.isActive);
    const color = typeof it.color === "string" ? it.color : undefined;

    if (Number.isFinite(id) && id > 0 && type && isActive && color) {
      out.push({ id, type, isActive, color });
    }
  }
  return out;
}

/* legacy formatları normalizasiya edən pick */
function pickKey(o: unknown, k: string): unknown {
  if (!isRecord(o)) return undefined;
  const lower = k.toLowerCase();
  const upper = k.toUpperCase();
  const rec = o as Record<string, unknown>;
  return rec[k] ?? rec[upper] ?? rec[lower];
}

/* ── Extractors ─────────────────────────────────────────────────────────── */
function extractActiveColors(input: unknown): { colors: Colors | null; fp: string } {
  const arr = readLabelSettings(input);
  if (!arr.length) return { colors: null, fp: "" };

  const byType: Partial<Record<1 | 2 | 3, { id: number; color: string }>> = {};

  for (const it of arr) {
    if (it.isActive) {
      const cur = byType[it.type];
      if (!cur || it.id > cur.id) byType[it.type] = { id: it.id, color: it.color };
    }
  }

  const c1 = byType[1]?.color, c2 = byType[2]?.color, c3 = byType[3]?.color;
  if (!c1 || !c2 || !c3) return { colors: null, fp: "" }; // ✅ 3-ü də ŞƏRTDİR

  const colors: Colors = { 1: c1, 2: c2, 3: c3 };
  const fp = `${byType[1]!.id}:${c1}|${byType[2]!.id}:${c2}|${byType[3]!.id}:${c3}`;
  return { colors, fp };
}

function normalizeLegacy(input: unknown): { colors: Colors; fp: string } | null {
  if (!isRecord(input)) return null;

  // format: { "1": "#hex", "2": "#hex", "3": "#hex" }
  if ("1" in input && "2" in input && "3" in input) {
    const c1 = String((input as Record<string, unknown>)["1"]);
    const c2 = String((input as Record<string, unknown>)["2"]);
    const c3 = String((input as Record<string, unknown>)["3"]);
    if (c1 && c2 && c3) {
      const colors: Colors = { 1: c1, 2: c2, 3: c3 };
      const fp = `x:${colors[1]}|x:${colors[2]}|x:${colors[3]}`;
      return { colors, fp };
    }
  }

  // format: { best: "#hex", new: "#hex", discount: "#hex" | ENDİRİM | discountBadge }
  const best = pickKey(input, "best");
  const nw = pickKey(input, "new");
  const disc = pickKey(input, "discount") ?? pickKey(input, "ENDİRİM") ?? pickKey(input, "discountBadge");

  if (typeof best === "string" && typeof nw === "string" && typeof disc === "string") {
    const colors: Colors = { 1: best, 2: nw, 3: disc };
    const fp = `x:${colors[1]}|x:${colors[2]}|x:${colors[3]}`;
    return { colors, fp };
  }
  return null;
}

/* ── API ────────────────────────────────────────────────────────────────── */
async function fetchColorsFromAPI(): Promise<{ colors: Colors | null; fp: string }> {
  const base = (process.env.API_SAAT_BASE_URL ?? "").replace(/\/$/, ""); // .../api
  const url = `${base}/LabelSettings`; // ✅ doğru endpoint

  const res = await fetch(url, {
    cache: "no-store",
    headers: { "ngrok-skip-browser-warning": "true" },
  });
  if (!res.ok) return { colors: null, fp: "" };

  const json = await res.json();
  if (isRecord(json) && Array.isArray(json.labelSettings)) {
    return extractActiveColors(json);
  }
  const alt = normalizeLegacy(json);
  return alt ?? { colors: null, fp: "" };
}

export function invalidateLabelColorsCache() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(LS_KEY);
}

/* ── Hook ───────────────────────────────────────────────────────────────── */
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
