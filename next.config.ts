import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  typedRoutes: true,
  output: isGitHubPages ? "export" : "standalone",
  basePath,
  assetPrefix: basePath || undefined,
  trailingSlash: isGitHubPages,
  images: {
    formats: ["image/webp", "image/avif"],
    unoptimized: isGitHubPages,
  },
};

export default nextConfig;
