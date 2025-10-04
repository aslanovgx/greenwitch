import { NextRequest, NextResponse } from "next/server";

const API_BASE = process.env.API_SAAT_BASE_URL!;
const API_KEY  = process.env.API_SAAT_KEY!;

function buildTarget(req: NextRequest, segments: string[]) {
  const url = new URL(req.url);
  const qs = url.search; // ?a=1&b=2
  return `${API_BASE}/${segments.join("/")}${qs}`;
}

async function forward(req: NextRequest, method: string, segments: string[]) {
  const target = buildTarget(req, segments);
  const init: RequestInit = {
    method,
    headers: {
      "X-API-KEY": API_KEY,
      // orijinal content-type varsa ötür
      ...(req.headers.get("content-type") ? { "Content-Type": req.headers.get("content-type")! } : {}),
    }
  };

  if (method !== "GET" && method !== "HEAD") {
    init.body = await req.arrayBuffer(); // form/json hər ikisi işləsin
  }

  const r = await fetch(target, init);
  // JSON dönməyən cavablar üçün də təhlükəsiz qaytarış:
  const contentType = r.headers.get("content-type") || "";
  const buf = await r.arrayBuffer();

  return new NextResponse(buf, {
    status: r.status,
    headers: {
      "content-type": contentType
    }
  });
}

export async function GET(req: NextRequest, { params }: { params: { path: string[] } }) {
  return forward(req, "GET", params.path);
}
export async function POST(req: NextRequest, { params }: { params: { path: string[] } }) {
  return forward(req, "POST", params.path);
}
export async function PUT(req: NextRequest, { params }: { params: { path: string[] } }) {
  return forward(req, "PUT", params.path);
}
export async function PATCH(req: NextRequest, { params }: { params: { path: string[] } }) {
  return forward(req, "PATCH", params.path);
}
export async function DELETE(req: NextRequest, { params }: { params: { path: string[] } }) {
  return forward(req, "DELETE", params.path);
}
