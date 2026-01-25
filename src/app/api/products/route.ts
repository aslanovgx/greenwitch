import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const API_BASE = process.env.API_SAAT_BASE_URL!; // https://api.saat.az/api
const API_KEY = process.env.API_SAAT_KEY!;

function buildTarget(req: NextRequest) {
  const url = new URL(req.url);
  return `${API_BASE}/Product${url.search}`; // ✅ /api/Product
}

export async function GET(req: NextRequest) {
  const target = buildTarget(req);

  const r = await fetch(target, {
    headers: { "X-API-KEY": API_KEY },
    cache: "no-store",
  });

  const buf = await r.arrayBuffer();

  return new NextResponse(buf, {
    status: r.status,
    headers: { "content-type": r.headers.get("content-type") ?? "" },
  });
}
