// app/api/probe/route.ts
export async function GET() {
  const url = "https://api.saat.az/images/products/1-638941504725587481.jpg"; // ← səndə açılmayan hansıdırsa onu qoy
  try {
    const r = await fetch(url, { method: "GET" }); // HEAD yox, GET
    return new Response(`status=${r.status} ct=${r.headers.get("content-type")}`, { status: 200 });
  } catch (e: any) {
    return new Response(`error=${e?.message || e}`, { status: 500 });
  }
}
