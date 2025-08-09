import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  compress: true,
  compiler: {
    removeConsole: isProd,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  output: "standalone",
  experimental: {
    scrollRestoration: true,
    optimizeCss: true,
    optimizeServerReact: true,
    appDocumentPreloading: true,
    serverSourceMaps: false,
    serverActions: {
      allowedOrigins: [
        "https://farah-studio.vercel.app",
        "https://farah-studiooo.vercel.app",
        "http://localhost:3000",
      ],
      bodySizeLimit: "10mb",
    },

    ...(isProd && {
      turbopackMinify: true,
      turbopackSourceMaps: false,
      turbopackTreeShaking: true,
    }),
  },
};

export default nextConfig;
