import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  devIndicators: false,
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
    cpus: 10,
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
    turbopackMinify: true,
    turbopackSourceMaps: process.env.NODE_ENV !== "production",
    turbopackTreeShaking: true,
  },
};

export default nextConfig;
