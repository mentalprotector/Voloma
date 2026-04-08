/**
 * Messenger platform types and configuration
 */

/** Supported messenger platforms */
export type MessengerKey = "telegram" | "vk" | "max";

/** Messenger display labels */
export const MESSENGER_LABELS: Record<MessengerKey, string> = {
  telegram: "Telegram",
  vk: "VK",
  max: "MAX",
} as const;
