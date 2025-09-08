// lib/api/fetcher.ts
const BASE = (process.env.NEXT_PUBLIC_API_URL ?? '')
  .trim()
  .replaceAll('"', '')          // ehtiyat üçün
  .replace(/\/+$/, '');         // sondakı /-ları sil

export async function apiGet(path: string) {
  const url = `${BASE}${path.startsWith('/') ? '' : '/'}${path}`;

  // —— Timeout setup
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000); // 10s timeout

  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'ngrok-skip-browser-warning': 'true', // əsas hissə buradır
        'Accept': 'application/json',
      },
      cache: 'no-store',
      signal: controller.signal, // 👈 timeout üçün siqnal
    });

    const ct = res.headers.get('content-type') || '';

    if (!res.ok) {
      const text = await res.text().catch(() => '');
      throw new Error(
        `[${res.status}] ${url}\nResponse: ${text.slice(0, 200)}`
      );
    }

    if (!ct.includes('application/json')) {
      const text = await res.text().catch(() => '');
      throw new Error(
        `Server JSON əvəzinə ${ct} qaytardı: ${url}\nBody: ${text.slice(0, 200)}`
      );
    }

    return res.json();
  } catch (err: any) {
    if (err.name === 'AbortError') {
      throw new Error(`Request timeout (10s): ${url}`);
    }
    throw err;
  } finally {
    clearTimeout(timeout); // yaddaşı təmizlə
  }
}
