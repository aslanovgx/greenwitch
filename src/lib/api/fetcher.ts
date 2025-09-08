// lib/api/fetcher.ts
type FetchOpts = { revalidate?: number; cache?: RequestCache };

export async function apiGet(path: string, opts: FetchOpts = {}) {
  const BASE = (process.env.NEXT_PUBLIC_API_URL ?? '')
    .trim()
    .replaceAll('"','')
    .replace(/\/+$/, '');
  const url = `${BASE}${path.startsWith('/') ? '' : '/'}${path}`;
  const isServer = typeof window === "undefined";

  // ✅ fetch konfiqurasiyası üçün düzgün tip
  const fetchOpts: RequestInit & { next?: { revalidate: number } } = {
    method: 'GET',
    headers: {
      'ngrok-skip-browser-warning': 'true',
      'Accept': 'application/json',
    },
  };

  if (isServer) {
    fetchOpts.next = { revalidate: opts.revalidate ?? 60 }; // ISR serverdə
  } else {
    fetchOpts.cache = opts.cache ?? 'no-store';             // clientdə no-store
  }

  const res = await fetch(url, fetchOpts);
  const ct = res.headers.get('content-type') || '';
  if (!res.ok) throw new Error(`[${res.status}] ${url}`);
  if (!ct.includes('application/json')) {
    throw new Error(`Server JSON əvəzinə ${ct} qaytardı: ${url}`);
  }
  return res.json();
}
