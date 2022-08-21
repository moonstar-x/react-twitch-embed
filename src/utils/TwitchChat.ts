import { URLS, DEFAULTS } from '../constants';

export interface TwitchChatGenerateUrlOptions {
  darkMode?: boolean
}

const generateUrlDefaultOptions: TwitchChatGenerateUrlOptions = {
  darkMode: DEFAULTS.DARK_MODE
};

export const generateUrl = (
  channel: string,
  parent: string | string[],
  options = generateUrlDefaultOptions
): string => {
  const fullOptions = { ...generateUrlDefaultOptions, ...options };
  const params = new URLSearchParams();

  if (Array.isArray(parent)) {
    parent.forEach((parent) => params.append('parent', parent));
  } else {
    params.append('parent', parent);
  }

  const startOfQuery = fullOptions.darkMode ? '?darkpopout&' : '?';

  return `${URLS.TWITCH_CHAT_URL}/${channel}/chat${startOfQuery}${params.toString()}`;
};
