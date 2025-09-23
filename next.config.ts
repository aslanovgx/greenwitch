// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Prod-da Image Optimization açıq qalır (unoptimized vermirik!)
  images: {
    // API-dən gələn şəkillərə icazə
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.saat.az",
        // əgər bütün şəkillər /images/... altındadırsa belə saxla;
        // yoxdursa, "pathname: '/**'" de.
        pathname: "/images/**",
      },
    ],

    // Responsive srcset üçün cihaz ölçüləri (realistik dəyərlər)
    deviceSizes: [360, 640, 828, 1080, 1200, 1920, 2048, 2560],
    // kiçik ikon/thumbnail ölçüləri
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

    // Müasir formatlar (brauzer dəstəkləyirsə avtomatik çevrilir)
    formats: ["image/avif", "image/webp"],

    // Next.js Image Optimization cavabının CDN/edge cache müddəti (saniyə)
    minimumCacheTTL: 60 * 60 * 24 * 7, // 7 gün

    // SVG-ləri <Image src="/foo.svg"> kimi istifadə edəcəksənsə aç;
    // sən @svgr/webpack ilə komponent kimi import edirsən → lazım deyil.
    dangerouslyAllowSVG: false,

    // Image Optimization üçün sərt CSP (istəyə bağlı, təhlükəsizlik üçün yaxşıdır)
    contentSecurityPolicy:
      "default-src 'self'; script-src 'none'; sandbox; style-src 'unsafe-inline';",
  },

  // SVG-ləri React komponent kimi import etmək üçün (sənin mövcud qaydan saxlanılır)
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },

  // Güclü SEO üçün məhsul URL-lərinin təmizlənməsi (sənin qaydan saxlanılır)
  async rewrites() {
    return [
      {
        // /products/rolex-submariner-48 → /products/48
        source: "/products/:slug-:id(\\d+)",
        destination: "/products/:id",
      },
    ];
  },

  // Prod deploy üçün tövsiyə:
  // output: "standalone", // Docker və ya VPS-də daha asan deploy üçün (Vercel-də şərti deyil)
};

export default nextConfig;
