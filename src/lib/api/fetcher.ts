// lib/api/fetcher.ts
type FetchOpts = { revalidate?: number; cache?: RequestCache };

export async function apiGet(path: string, opts: FetchOpts = {}) {
  const BASE = (process.env.API_SAAT_BASE_URL ?? 'https://api.saat.az/api')
  .trim()
  .replaceAll('"', '')
  .replace(/\/+$/, '');

  // əgər path tam URL-disə (https:// ilə başlayır), BASE əlavə etmə
  const isAbs = /^https?:\/\//i.test(path);
  const url = isAbs
    ? path
    : `${BASE}${path.startsWith('/') ? '' : '/'}${path}`;

  const isServer = typeof window === 'undefined';

  const fetchOpts: RequestInit & { next?: { revalidate?: number } } = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  };

  if (isServer) {
    fetchOpts.next = { revalidate: opts.revalidate ?? 300 }; // SSR/ISR
  } else {
    fetchOpts.cache = opts.cache ?? 'no-store'; // CSR
  }

  const res = await fetch(url, fetchOpts);
  const ct = res.headers.get('content-type') || '';

  if (!res.ok) throw new Error(`[${res.status}] ${url}`);
  if (!ct.includes('application/json')) {
    throw new Error(
      `Server JSON əvəzinə ${ct || 'naməlum content-type'} qaytardı: ${url}`
    );
  }

  return res.json();
}
