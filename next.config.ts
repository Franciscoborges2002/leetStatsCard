import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.leetcode.com',

      },
    ],
    unoptimized: true,//disables the proxy optimization
  },
};

export default nextConfig;
