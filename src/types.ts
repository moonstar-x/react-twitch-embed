export interface TwitchPlayerInstance {
  setChannel: (channel: string) => void
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
  }
}
