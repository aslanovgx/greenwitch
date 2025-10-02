// app/api/saat/[...path]/route.ts
import { NextRequest, NextResponse } from "next/server";

const BASE = process.env.API_SAAT_BASE_URL!;
const API_KEY = process.env.API_SAAT_KEY!;

function targetUrl(req: NextRequest, pathParts: string[]) {
  const url = new URL(req.url);
  const qs = url.search; // ?page=1...
  const path = pathParts.join("/");
  return `${BASE}/${path}${qs}`;
}

async function pipeUpstream(method: string, req: NextRequest, path: string[]) {
  const init: RequestInit = {
    method,
    headers: {
      "X-API-KEY": API_KEY,
      // istəsən Accept, Content-Type ötür:
      ...(req.headers.get("content-type") ? { "Content-Type": req.headers.get("content-type")! } : {}),
    },
    // GET/HEAD-də body olmaz
    body: method === "GET" || method === "HEAD" ? undefined : await req.arrayBuffer(),
    cache: "no-store",
  };

  const res = await fetch(targetUrl(req, path), init);

  // cavabı olduğu kimi ötür
  const headers = new Headers(res.headers);
  headers.delete("set-cookie"); // lazım deyilsə
  return new NextResponse(res.body, { status: res.status, headers });
}

export async function GET(req: NextRequest, ctx: { params: { path: string[] } }) {
  return pipeUpstream("GET", req, ctx.params.path);
}
export async function POST(req: NextRequest, ctx: { params: { path: string[] } }) {
  return pipeUpstream("POST", req, ctx.params.path);
}
export async function PUT(req: NextRequest, ctx: { params: { path: string[] } }) {
  return pipeUpstream("PUT", req, ctx.params.path);
}
export async function PATCH(req: NextRequest, ctx: { params: { path: string[] } }) {
  return pipeUpstream("PATCH", req, ctx.params.path);
}
export async function DELETE(req: NextRequest, ctx: { params: { path: string[] } }) {
  return pipeUpstream("DELETE", req, ctx.params.path);
}
