import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compress: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
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
        "http://localhost:3000",
      ],
      bodySizeLimit: "10mb",
    },
    turbopackMinify: true,
    turbopackSourceMaps: process.env.NODE_ENV !== "production",
    turbopackTreeShaking: true,
  },
};

export default nextConfig;
