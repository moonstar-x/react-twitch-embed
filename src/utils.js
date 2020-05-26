import { TWITCH_CHAT_URL, TWITCH_CLIP_URL } from './constants';

const getChatEmbedURL = (channel, theme) => {
  const themeQuery = theme === 'dark' ? '?darkpopout' : '';
  return `${TWITCH_CHAT_URL}/${channel}/chat${themeQuery}`;
};

const getClipEmbedURL = (clip, autoplay, muted) => {
  return `${TWITCH_CLIP_URL}?clip=${clip}&autoplay=${autoplay}&muted=${muted}`;
};

export {
  getChatEmbedURL,
  getClipEmbedURL
};
