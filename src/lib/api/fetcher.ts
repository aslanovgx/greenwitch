// lib/api/fetcher.ts
export type FetchOpts = {
  revalidate?: number;          // SSR/ISR üçün saniyə (serverdə işləyir)
  cache?: RequestCache;         // CSR üçün cache siyasəti (brauzerdə işləyir)
  signal?: AbortSignal;         // (ops.) abort/timeout
  headers?: Record<string, string>; // (ops.) əlavə header-lər
};

export async function apiGet<T = unknown>(path: string, opts: FetchOpts = {}) {
  const BASE = (process.env.NEXT_PUBLIC_API_URL ?? '')
    .trim()
    .replaceAll('"', '')
    .replace(/\/+$/, '');

  if (!BASE) throw new Error('NEXT_PUBLIC_API_URL təyin edilməyib');

  const url = `${BASE}${path.startsWith('/') ? '' : '/'}${path}`;
  const isServer = typeof window === 'undefined';

  const fetchOpts: RequestInit & { next?: { revalidate?: number } } = {
    method: 'GET',
    headers: {
      'ngrok-skip-browser-warning': 'true',
      'Accept': 'application/json',
      ...(opts.headers ?? {}),
    },
    signal: opts.signal,
  };

  if (isServer) {
    // ✅ Backend IMemoryCache (5 dəq) ilə uyğun olsun deyə default 300s
    fetchOpts.next = { revalidate: opts.revalidate ?? 300 };
  } else {
    // ✅ CSR tərəfdə filter/search üçün hər zaman təzə çəkmək daha yaxşıdır
    fetchOpts.cache = opts.cache ?? 'no-store';
  }

  const res = await fetch(url, fetchOpts);
  const ct = res.headers.get('content-type') || '';

  if (!res.ok) {
    let body = '';
    try { body = await res.text(); } catch {}
    throw new Error(`[${res.status}] ${url}${body ? ` — ${body}` : ''}`);
  }

  if (!ct.includes('application/json')) {
    throw new Error(`Server JSON əvəzinə ${ct || 'naməlum content-type'} qaytardı: ${url}`);
  }

  return res.json() as Promise<T>;
}
