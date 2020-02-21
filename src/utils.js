import { TWITCH_CHAT_URL } from './constants';

const getChatEmbedURL = (channel) => {
  return `${TWITCH_CHAT_URL}/${channel}/chat`;
};

export {
  getChatEmbedURL
};
