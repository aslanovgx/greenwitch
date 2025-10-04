import { NextRequest, NextResponse } from "next/server";

const API_BASE = process.env.API_SAAT_BASE_URL!;
const API_KEY  = process.env.API_SAAT_KEY!;

function buildTarget(req: NextRequest) {
  const url = new URL(req.url);
  const qs = url.search;
  // Sabit endpoint: yalnız kökə yönləndirirsiniz (lazım olduqca düzəldin)
  return `${API_BASE}${qs}`;
}

async function forward(req: NextRequest, method: string) {
  const target = buildTarget(req);
  const init: RequestInit = {
    method,
    headers: {
      "X-API-KEY": API_KEY,
      ...(req.headers.get("content-type")
        ? { "Content-Type": req.headers.get("content-type")! }
        : {}),
    },
  };

  if (method !== "GET" && method !== "HEAD") {
    init.body = await req.arrayBuffer();
  }

  const r = await fetch(target, init);
  const contentType = r.headers.get("content-type") || "";
  const buf = await r.arrayBuffer();

  return new NextResponse(buf, {
    status: r.status,
    headers: { "content-type": contentType },
  });
}

export async function GET(req: NextRequest)    { return forward(req, "GET"); }
export async function POST(req: NextRequest)   { return forward(req, "POST"); }
export async function PUT(req: NextRequest)    { return forward(req, "PUT"); }
export async function PATCH(req: NextRequest)  { return forward(req, "PATCH"); }
export async function DELETE(req: NextRequest) { return forward(req, "DELETE"); }

// export const dynamic = "force-dynamic";
