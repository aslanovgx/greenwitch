// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone(); // ✅ clone

  // /products?page=1 → /products (SEO canonical)
  if (url.pathname === "/products" && url.searchParams.get("page") === "1") {
    url.searchParams.delete("page");
    return NextResponse.redirect(url, 308);
  }

  // /products/rolex-submariner-48 → /products/48 (pretty → id)
  const m = url.pathname.match(/^\/products\/[^/]+-(\d+)$/);
  if (m) {
    const id = m[1];
    const rewriteUrl = req.nextUrl.clone(); // ✅ ayrıca clone
    rewriteUrl.pathname = `/products/${id}`;
    return NextResponse.rewrite(rewriteUrl);
  }

  return NextResponse.next();
}

export const config = { matcher: ["/products", "/products/:path*"] };
