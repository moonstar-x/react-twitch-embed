// TODO: Improve these types

export interface TwitchPlayerInstance extends EventTarget {
  setChannel: (channel: string) => void
  setVideo: (video: string) => void
  setCollection: (collection: string) => void
}

export interface TwitchPlayerConstructorOptions {
  channel?: string
  video?: string
  collection?: string
  height?: string | number
  parent?: string[]
  width?: string | number
  autoplay?: boolean
  muted?: boolean
  time?: string
  playsinline?: boolean
  allowfullscreen?: boolean
  controls?: boolean
}

export interface TwitchPlayerConstructor {
  new (id: string, options: TwitchPlayerConstructorOptions): TwitchPlayerInstance

  CAPTIONS: string
  ENDED: string
  PAUSE: string
  PLAY: string
  PLAYBACK_BLOCKED: string
  PLAYING: string
  OFFLINE: string
  ONLINE: string
  READY: string
  SEEK: string
}

export interface TwitchEmbedInstance extends EventTarget {
  getPlayer: () => TwitchPlayerInstance
}

export interface TwitchEmbedConstructorOptions {
  allowfullscreen?: boolean
  autoplay?: boolean
  channel?: string
  collection?: string
  height?: string | number
  layout?: 'video-with-chat' | 'video'
  muted?: boolean
  parent?: string[] | null
  theme?: 'light' | 'dark'
  time?: string
  video?: string
  width?: string | number
}

export interface TwitchEmbedConstructor {
  new (id: string, options: TwitchEmbedConstructorOptions): TwitchEmbedInstance

  AUTHENTICATE: string
  VIDEO_PLAY: string
  VIDEO_PAUSE: string
  VIDEO_READY: string
}

export interface TwitchWindow extends Window {
  Twitch?: {
    Embed?: TwitchEmbedConstructor
    Player?: TwitchPlayerConstructor
  }
}
