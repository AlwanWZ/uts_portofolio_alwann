import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: [
      'react-icons',
      'react-icons/si',
      'react-icons/fi',
      'react-icons/fa',
      'framer-motion',
    ],
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 3600,
  },
};

export default nextConfig;
