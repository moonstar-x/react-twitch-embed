import { URLS, DEFAULTS } from '../constants';

export interface TwitchPlayerNonInteractiveMedia {
  channel?: string
  video?: string
  collection?: string
}

export interface TwitchPlayerNonInteractiveOptions {
  autoplay?: boolean
  muted?: boolean
  time?: string
}

const generateUrlDefaultOptions: TwitchPlayerNonInteractiveOptions = {
  autoplay: DEFAULTS.AUTOPLAY,
  muted: DEFAULTS.MUTED,
  time: DEFAULTS.TIME
};

export const generateUrl = (
  media: TwitchPlayerNonInteractiveMedia,
  parent: string | string[],
  options = generateUrlDefaultOptions
): string => {
  const fullOptions = { ...generateUrlDefaultOptions, ...options };
  const params = new URLSearchParams();

  if (media.channel) {
    params.append('channel', media.channel);
  } else {
    if (media.video) {
      params.append('video', media.video);
    }

    if (media.collection) {
      params.append('collection', media.collection);
    }
  }

  Object.entries(fullOptions).forEach(([key, value]) => {
    params.append(key, value.toString());
  });

  if (Array.isArray(parent)) {
    parent.forEach((parent) => params.append('parent', parent));
  } else {
    params.append('parent', parent);
  }

  return `${URLS.TWITCH_PLAYER_NON_INTERACTIVE_URL}/?${params.toString()}`;
};
