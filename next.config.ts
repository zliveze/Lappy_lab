import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    domains: [
      'i.pinimg.com',
      'lappyhacking.vercel.app',
      'foxfio.com',
      'www.techspot.com',
      'codestory.ai'
    ],
    unoptimized: true,
  },
  reactStrictMode: true,
};

export default nextConfig; 