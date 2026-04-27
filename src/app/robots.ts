import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://voloma.94.140.224.220.sslip.io";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/_next/", "/images/cashpo/configs/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
