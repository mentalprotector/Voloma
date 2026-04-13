import { describe, it, expect } from 'vitest';
import { buildMessengerUrl } from '@/lib/messenger-links';

describe('messenger-links', () => {
  describe('buildMessengerUrl', () => {
    it('returns Telegram URL containing t.me/ and encoded message', () => {
      const url = buildMessengerUrl('telegram', 'Hello World');
      expect(url).toContain('t.me/');
      expect(url).toContain(encodeURIComponent('Hello World'));
    });

    it('returns VK URL containing vk.com/', () => {
      const url = buildMessengerUrl('vk', 'Share this');
      expect(url).toContain('vk.com/');
    });

    it('returns a non-empty string for max', () => {
      const url = buildMessengerUrl('max', 'Test message');
      expect(url).toBeTruthy();
      expect(url.length).toBeGreaterThan(0);
    });

    it('encodes special characters in message', () => {
      const url = buildMessengerUrl('telegram', 'Test & more <tags>');
      expect(url).toContain(encodeURIComponent('Test & more <tags>'));
    });
  });
});
