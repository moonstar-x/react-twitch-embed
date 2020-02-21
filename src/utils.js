import { TWITCH_CHAT_URL, TWITCH_CLIP_URL } from './constants';

const getChatEmbedURL = (channel) => {
  return `${TWITCH_CHAT_URL}/${channel}/chat`;
};

const getClipEmbedURL = (clip, autoplay, muted) => {
  return `${TWITCH_CLIP_URL}?clip=${clip}&autoplay=${autoplay}&muted=${muted}`;
};

export {
  getChatEmbedURL,
  getClipEmbedURL
};
