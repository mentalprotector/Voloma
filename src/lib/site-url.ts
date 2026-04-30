export const DEFAULT_SITE_URL = "https://xn--80adbi6agmb2c.xn--p1ai";
const PRODUCTION_HOSTS = new Set(["xn--80adbi6agmb2c.xn--p1ai", "воломавуд.рф"]);

export function getSiteUrl(): string {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL;
  const normalizedUrl = new URL(siteUrl);

  if (PRODUCTION_HOSTS.has(normalizedUrl.hostname.toLowerCase())) {
    normalizedUrl.protocol = "https:";
  }

  return normalizedUrl.toString().replace(/\/$/, "");
}

export function absoluteUrl(path: string): string {
  const baseUrl = getSiteUrl();

  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  return `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
