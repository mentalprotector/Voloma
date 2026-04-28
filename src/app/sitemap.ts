import type { MetadataRoute } from "next";

import { getSiteUrl } from "@/lib/site-url";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();
  const lastModified = new Date(process.env.SITE_LASTMOD || "2026-04-28");

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/configurator`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];
}
