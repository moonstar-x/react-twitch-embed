export interface OnPlayData {
  sessionId: string
}

export interface OnSeekData {
  position: number
}

export interface OnAuthenticateData {
  displayName: string
  id: string
  profileImageURL: string
}

export interface PlayerQuality {
  bitrate: number
  codecs: string
  group: string
  height: number
  framerate?: number
  isDefault: boolean
  name: string
  width: number
}

export interface PlaybackStats {
  backendVersion: string
  bufferSize: number
  codecs: string
  displayResolution: string
  fps: number
  hlsLatencyBroadcaster: number
  playbackRate: number
  skippedFrames: number
  videoResolution: string
}

export interface PlayerState {
  channelID: string
  channelName: string
  collectionID: string
  currentTime: number
  duration: number
  ended: boolean
  muted: boolean
  playback: 'Idle' | 'Ready' | 'Buffering' | 'Playing' | 'Ended'
  qualitiesAvailable: string[]
  quality: string
  stats: {
    videoStats: PlaybackStats
  }
  videoID: string
  volume: number
}

export interface TwitchPlayerInstance extends EventTarget {
  disableCaptions: () => void
  enableCaptions: () => void
  pause: () => void
  play: () => void
  seek: (timestamp: number) => void
  setChannel: (channel: string) => void
  setCollection: (collection: string, videoId?: string) => void
  setQuality: (quality: string) => void
  setVideo: (video: string, timestamp: number) => void
  getMuted: () => boolean
  setMuted: (muted: boolean) => void
  getVolume: () => number
  setVolume: (volumeLevel: number) => void
  getPlaybackStats: () => PlaybackStats
  getChannel: () => string | undefined
  getCurrentTime: () => number
  getDuration: () => number
  getEnded: () => boolean
  getQualities: () => PlayerQuality[]
  getQuality: () => string
  getVideo: () => string | undefined
  isPaused: () => boolean

  getChannelId: () => string | undefined
  getCollection: () => string | undefined
  getPlayerState: () => PlayerState
  setChannelId: (channelId: string) => void

  addEventListener: (event: string, callback: (...args: any[]) => void) => void
}

export interface TwitchPlayerConstructorOptions {
  allowfullscreen?: boolean
  autoplay?: boolean
  channel?: string
  collection?: string
  controls?: boolean
  height?: string | number
  muted?: boolean
  parent?: string[]
  playsinline?: boolean
  time?: string
  video?: string
  width?: string | number
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

export interface TwitchEmbedInstance extends TwitchPlayerInstance {
  getPlayer: () => TwitchPlayerInstance
}

export interface TwitchEmbedConstructorOptions {
  allowfullscreen?: boolean
  autoplay?: boolean
  channel?: string
  collection?: string
  controls?: boolean
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
