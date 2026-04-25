/**
 * Messenger sharing URLs and link generation utilities
 */
import type { MessengerKey } from "@/types/messenger";

/** Base sharing URLs for each messenger */
const MESSENGER_BASE_URLS: Record<MessengerKey, string> = {
  telegram: "https://t.me/+79219078882",
  vk: "https://vk.com/share.php?url=https%3A%2F%2Fvoloma.ru%2Fconfigurator",
  max: "https://max.ru/u/f9LHodD0cOKBmpKA6Cwfjf3Dm1PtsYOjX3qNW5h6Sha8jBo6SkYT1JEPscA",
} as const;

/**
 * Build messenger sharing URL with pre-filled text
 */
export function buildMessengerUrl(target: MessengerKey, message: string): string {
  const baseUrl = MESSENGER_BASE_URLS[target];
  const encodedMessage = encodeURIComponent(message);

  if (target === "telegram") {
    return baseUrl;
  }

  if (target === "vk") {
    return `${baseUrl}&comment=${encodedMessage}`;
  }

  return baseUrl;
}
