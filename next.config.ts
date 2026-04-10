import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typedRoutes: true,
  output: "standalone",
  images: {
    formats: ["image/webp", "image/avif"],
  },
};

export default nextConfig;
