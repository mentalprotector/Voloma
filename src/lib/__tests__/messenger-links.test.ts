import { describe, it, expect } from 'vitest';
import { buildMessengerUrl } from '@/lib/messenger-links';

describe('messenger-links', () => {
  describe('buildMessengerUrl', () => {
    it('returns Telegram contact URL', () => {
      const url = buildMessengerUrl('telegram', 'Hello World');
      expect(url).toContain('t.me/');
      expect(url).not.toContain(encodeURIComponent('Hello World'));
    });

    it('returns VK share URL containing vk.com and encoded message', () => {
      const url = buildMessengerUrl('vk', 'Share this');
      expect(url).toContain('vk.com/share.php');
      expect(url).toContain(encodeURIComponent('Share this'));
    });

    it('returns configured MAX profile URL', () => {
      const url = buildMessengerUrl('max', 'Test message');
      expect(url).toContain('max.ru/u/');
    });

    it('encodes special characters in message', () => {
      const url = buildMessengerUrl('vk', 'Test & more <tags>');
      expect(url).toContain(encodeURIComponent('Test & more <tags>'));
    });
  });
});
