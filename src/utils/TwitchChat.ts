import { URLS } from '../constants';

export interface TwitchChatGenerateUrlOptions {
  darkMode?: boolean
  enableMigration?: boolean
}

export const generateUrlDefaultOptions: TwitchChatGenerateUrlOptions = {
  darkMode: false,
  enableMigration: true
};

export const generateUrl = (
  channel: string,
  parent: string | string[],
  options = generateUrlDefaultOptions
): string => {
  const fullOptions = { ...generateUrlDefaultOptions, ...options };
  const params = new URLSearchParams();
  params.append('migration', fullOptions.enableMigration!.toString());

  if (Array.isArray(parent)) {
    parent.forEach((parent) => params.append('parent', parent));
  } else {
    params.append('parent', parent);
  }

  const startOfQuery = fullOptions.darkMode ? '?darkpopout&' : '?';

  return `${URLS.TWITCH_CHAT_URL}/${channel}/chat${startOfQuery}${params.toString()}`;
};