export const DEFAULT_SITE_URL = "https://xn--80adbi6agmb2c.xn--p1ai";

export function getSiteUrl(): string {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL;
  return siteUrl.replace(/\/$/, "");
}

export function absoluteUrl(path: string): string {
  const baseUrl = getSiteUrl();

  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  return `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
