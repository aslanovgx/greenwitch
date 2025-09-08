import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // DEV
      {
        protocol: "https",
        hostname: "**.ngrok-free.app",
        pathname: "/**",
      },

      // PROD (əsas domenin)
      {
        protocol: "https",
        hostname: "saat.az",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.saat.az",
        pathname: "/**",
      },

      // Əgər API və ya şəkillər ayrıca hostdandırsa (məs: api.saat.az və ya cdn.saat.az)
      {
        protocol: "https",
        hostname: "api.saat.az",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.saat.az",
        pathname: "/**",
      },
    ],
    unoptimized: true, // ❌ devdə test üçün true edə bilərsən, amma prod üçün yaxşıdır ki, false qalsın
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

export default nextConfig;
