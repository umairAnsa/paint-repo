import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: '/about',   destination: '/about-us',   permanent: true },
      { source: '/contact', destination: '/contact-us', permanent: true },
    ];
  },
  allowedDevOrigins: ["*.ngrok-free.app", "*.ngrok.io"],
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [390, 640, 828, 1080, 1200, 1920],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        // Google reviewer profile photos
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        // Blog post images from main WordPress site
        protocol: "https",
        hostname: "normpainting.com",
      },
      {
        // Blog images uploaded via admin
        protocol: "https",
        hostname: "norm-painting-backend.onrender.com",
      },
      {
        // Local dev backend
        protocol: "http",
        hostname: "localhost",
        port: "5000",
      },
    ],
  },
};

export default nextConfig;
