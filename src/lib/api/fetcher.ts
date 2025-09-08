// lib/api/fetcher.ts
const BASE = (process.env.NEXT_PUBLIC_API_URL ?? '')
  .trim()
  .replaceAll('"','')           // ehtiyat üçün
  .replace(/\/+$/, '');         // sondakı /-ları sil

export async function apiGet(path: string) {
  const url = `${BASE}${path.startsWith('/') ? '' : '/'}${path}`;
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'ngrok-skip-browser-warning': 'true', // əsas hissə buradır
      'Accept': 'application/json',
    },
    cache: 'no-store',
  });

  const ct = res.headers.get('content-type') || '';
  if (!res.ok) throw new Error(`[${res.status}] ${url}`);
  if (!ct.includes('application/json')) {
    throw new Error(`Server JSON əvəzinə ${ct} qaytardı: ${url}`);
  }
  return res.json();
}
