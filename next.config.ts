import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["cdn.sanity.io"], // Allowed external image domains
  },
  experimental: {
    // runtime: "nodejs", // Ensure Node.js runtime instead of Edge
  },
};

export default nextConfig;
