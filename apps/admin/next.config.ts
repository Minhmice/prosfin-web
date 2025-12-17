import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  transpilePackages: ["@prosfin/ui"],
  // Turbopack configuration (Next.js 16 uses Turbopack by default)
  turbopack: {
    // Turbopack will automatically ignore common patterns like node_modules, .next, .git
    // Additional ignore patterns can be configured here if needed
  },
};

export default nextConfig;

