import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  // React Strict Mode (recommended for catching issues)
  reactStrictMode: true,

  // Images: generate modern formats to reduce size
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // If you use external domains, add them here
    remotePatterns: [
      // {
      //   protocol: 'https',
      //   hostname: 'example.com',
      // },
    ],
  },

  // Compiler: remove console.log in production (optional)
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  // Cache headers for static assets (improves reload time)
  async headers() {
    return [
      {
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/favicon.ico",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, must-revalidate",
          },
        ],
      },
    ];
  },

  // (Optional) If using static exports, uncomment:
  // output: 'standalone', // for Docker

  // (Optional) To improve performance on slow networks, you can limit prefetch
  // but it's enabled by default and works well.

  // For heavy components, use `next/dynamic` in the respective component files.
};

export default withBundleAnalyzer(nextConfig);