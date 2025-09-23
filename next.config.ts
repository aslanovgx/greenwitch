import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.saat.az",
        pathname: "/**",
      },
    ],
    unoptimized: false,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  async rewrites() {
    return [
      {
        // /products/rolex-submariner-48 → /products/48
        source: "/products/:slug-:id(\\d+)",
        destination: "/products/:id",
      },
    ];
  },
};

export default nextConfig;
