import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Your Next.js config options here */
};

module.exports = {
  ...nextConfig, // Spread the Next.js config options
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};