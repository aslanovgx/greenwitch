// app/api/Brand/route.ts  (və ya src/app/... quruluşunda)
import { NextResponse } from "next/server";

const API = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "") || "";

export async function GET() {
  try {
    if (!API) {
      return NextResponse.json({ error: "API base URL missing" }, { status: 500 });
    }

    const r = await fetch(`${API}/Brand`, { cache: "no-store" });

    const ct = r.headers.get("content-type") || "";
    if (!r.ok) {
      const text = await r.text().catch(() => "");
      return NextResponse.json(
        { error: `[${r.status}] ${r.statusText}`, preview: text.slice(0, 300) },
        { status: r.status }
      );
    }
    if (!ct.includes("application/json")) {
      const text = await r.text().catch(() => "");
      return NextResponse.json(
        { error: "Server JSON qaytarmadı", contentType: ct, preview: text.slice(0, 300) },
        { status: 500 }
      );
    }

    const data = await r.json();
    return NextResponse.json(data);
  } catch (e: any) {
    return NextResponse.json({ error: String(e?.message || e) }, { status: 500 });
  }
}
