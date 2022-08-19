import { URLS } from '../constants';

export interface TwitchChatGenerateUrlOptions {
  darkMode?: boolean
  parent?: string | string[]
  enableMigration?: boolean
}

export const generateUrlDefaultOptions: TwitchChatGenerateUrlOptions = {
  darkMode: false,
  parent: 'localhost',
  enableMigration: true
};

export const generateUrl = (channel: string, options = generateUrlDefaultOptions): string => {
  const fullOptions = { ...generateUrlDefaultOptions, ...options };
  const params = new URLSearchParams();
  params.append('migration', fullOptions.enableMigration!.toString());

  if (Array.isArray(fullOptions.parent)) {
    fullOptions.parent.forEach((parent) => params.append('parent', parent));
  } else {
    params.append('parent', fullOptions.parent!);
  }

  const startOfQuery = fullOptions.darkMode ? '?darkpopout&' : '?';

  return `${URLS.TWITCH_CHAT_URL}/${channel}/chat${startOfQuery}${params.toString()}`;
};
