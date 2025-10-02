// src/app/api/og-screenshot/route.ts
import type { NextRequest } from "next/server";
import chromium from "@sparticuz/chromium";
import puppeteer from "puppeteer-core";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const VIEWPORT = { width: 1200, height: 630 } as const;

// Buffer/Uint8Array -> saf ArrayBuffer (SAB problemi olmaz)
function toArrayBufferCopy(buf: Uint8Array): ArrayBuffer {
  const ab = new ArrayBuffer(buf.byteLength);
  new Uint8Array(ab).set(buf);
  return ab;
}

function absolutize(url: string, base: string) {
  try {
    return new URL(url, base).toString();
  } catch {
    return base;
  }
}

async function getExecutablePath() {
  if (process.env.NODE_ENV === "production") {
    return await chromium.executablePath();
  }
  // Lokal dev üçün Chrome path (macOS nümunəsi):
  return (
    process.env.CHROME_PATH ||
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
  );
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const path = searchParams.get("path") || "/";
  const site = process.env.NEXT_PUBLIC_BASE_URL || "https://saat.az";
  const targetUrl = absolutize(path, site);

  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: VIEWPORT,
    executablePath: await getExecutablePath(),
    headless: true, // və ya "new" (versiyadan asılı olaraq)
  });

  try {
    const page = await browser.newPage();
    await page.setViewport(VIEWPORT);

    try {
      await page.goto(targetUrl, {
        waitUntil: "networkidle0",
        timeout: 60_000,
      });
    } catch {
      // bəzi səhifələr tam networkidle olmur
      await page.goto(targetUrl, {
        waitUntil: "domcontentloaded",
        timeout: 30_000,
      });
      // köhnə waitForTimeout əvəzinə
      await new Promise((r) => setTimeout(r, 800));
    }

    const jpeg = (await page.screenshot({
      type: "jpeg",
      quality: 85,
      fullPage: false,
    })) as Uint8Array;

    const ab = toArrayBufferCopy(jpeg);

    return new Response(ab, {
      headers: {
        "Content-Type": "image/jpeg",
        "Cache-Control":
          "public, max-age=0, s-maxage=21600, stale-while-revalidate=86400",
      },
    });
  } finally {
    await browser.close();
  }
}
