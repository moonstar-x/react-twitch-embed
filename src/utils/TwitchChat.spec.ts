import { generateUrl } from './TwitchChat';
import { URLS } from '../constants';

const channel = 'channel';

describe('Utils -> TwitchChat', () => {
  describe('generateUrl()', () => {
    it('should return a string with the correct URL.', () => {
      const url = generateUrl(channel);
      expect(url).toContain(URLS.TWITCH_CHAT_URL);
    });

    it('should return a string with the provided channel.', () => {
      const url = generateUrl(channel);
      expect(url).toContain('/channel/chat');
    });

    it('should return a string with dark mode if enabled.', () => {
      const url = generateUrl(channel, { darkMode: true });
      expect(url).toContain('?darkpopout&');
    });

    it('should return a string without dark mode if disabled.', () => {
      const url = generateUrl(channel, { darkMode: false });
      expect(url).not.toContain('?darkpopout&');
    });

    it('should return a string with migration true if enabled.', () => {
      const url = generateUrl(channel, { enableMigration: true });
      expect(url).toContain('migration=true');
    });

    it('should return a string with migration false if disabled.', () => {
      const url = generateUrl(channel, { enableMigration: false });
      expect(url).toContain('migration=false');
    });

    it('should return a string with a single parent if parent is a string.', () => {
      const url = generateUrl(channel, { parent: 'localhost' });
      expect(url).toContain('parent=localhost');
    });

    it('should return a string with multiple parents if parent is an array.', () => {
      const parents = ['host1', 'host2', 'host3'];
      const url = generateUrl(channel, { parent: parents });

      parents.forEach((parent) => {
        expect(url).toContain(`parent=${parent}`);
      });
    });

    it('should return a string with all the default options if no options are provided.', () => {
      const url = generateUrl(channel);

      expect(url).not.toContain('?darkpopout&');
      expect(url).toContain('parent=localhost');
      expect(url).toContain('migration=true');
    });
  });
});
