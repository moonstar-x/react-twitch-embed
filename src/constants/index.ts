export const URLS = {
  TWITCH_EMBED_URL: 'https://embed.twitch.tv/embed/v1.js',
  TWITCH_CHAT_URL: 'https://www.twitch.tv/embed',
  TWITCH_CLIP_URL: 'https://clips.twitch.tv/embed',
  TWITCH_PLAYER_URL: 'https://player.twitch.tv/js/embed/v1.js',
  TWITCH_PLAYER_NON_INTERACTIVE_URL: 'https://player.twitch.tv'
};

export const DEFAULTS = {
  CHAT: {
    HEIGHT: 550,
    WIDTH: 350
  },
  MEDIA: {
    HEIGHT: 480,
    WIDTH: 940
  },
  ID: {
    TWITCH_EMBED: 'twitch-embed',
    TWITCH_PLAYER: 'twitch-player'
  },
  TITLE: {
    TWITCH_CHAT: 'TwitchChat',
    TWITCH_CLIP: 'TwitchClip',
    TWITCH_PLAYER_NON_INTERACTIVE: 'TwitchPlayerNonInteractive'
  },
  ALLOW_FULLSCREEN: true,
  AUTOPLAY: true,
  WITH_CHAT: true,
  MUTED: false,
  DARK_MODE: true,
  TIME: '0h0m0s',
  HIDE_CONTROLS: false,
  INLINE: true
};

export const STORYBOOK_DEFAULTS = {
  channel: 'moonstar_x',
  channels: ['moonstar_x', 'minibambu', 'LCS', 'LLA', 'ibai'],
  clips: [
    'AdventurousBusyWormTwitchRaid-7vDEE8L5ur9j9dzi',
    'ColdbloodedSavagePterodactylTheTarFu-nB9EPedzd7eI1Rih'
  ],
  video: '260075663',
  videos: ['260075663', '503792888', '443327254'],
  videoInCollection: '444741819',
  collection: 'pFPJIZ6FORWE5g',
  collections: ['pFPJIZ6FORWE5g', '4B-kpic7DRc5ww']
};
