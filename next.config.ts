import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.saat.az",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "saat.az", // əgər public/ və ya CDN-dən nəsə çəkəcəksə
        pathname: "/**",
      },
    ],
    unoptimized: false, // default optimizasiya aktiv qalsın
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
