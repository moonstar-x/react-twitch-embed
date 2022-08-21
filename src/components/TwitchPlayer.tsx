import React, { useEffect, useRef, useCallback } from 'react';
import useScript from '../hooks/useScript';
import usePrevious from '../hooks/usePrevious';
import { DEFAULTS, URLS } from '../constants';
import { typedNoop, typedNoop2 } from '../utils/misc';
import { objectCompareWithIgnoredKeys } from '../utils/object';
import { TwitchWindow, TwitchPlayerConstructor, TwitchPlayerInstance, OnPlayData, OnSeekData } from '../types';

export interface TwitchPlayerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onEnded' | 'onPause' | 'onPlay' | 'onPlaying'> {
  channel?: string
  video?: string
  collection?: string
  parent?: string | string[]
  autoplay?: boolean
  muted?: boolean
  time?: string
  allowFullscreen?: boolean
  playsInline?: boolean
  hideControls?: boolean

  onCaptions?: (player: TwitchPlayerInstance, captions: string) => void
  onEnded?: (player: TwitchPlayerInstance) => void
  onPause?: (player: TwitchPlayerInstance) => void
  onPlay?: (player: TwitchPlayerInstance, data: OnPlayData) => void
  onPlaybackBlocked?: (player: TwitchPlayerInstance) => void
  onPlaying?: (player: TwitchPlayerInstance) => void
  onOffline?: (player: TwitchPlayerInstance) => void
  onOnline?: (player: TwitchPlayerInstance) => void
  onReady?: (player: TwitchPlayerInstance) => void
  onSeek?: (player: TwitchPlayerInstance, data: OnSeekData) => void

  id?: string
  height?: string | number
  width?: string | number
}

const defaultProps: Partial<TwitchPlayerProps> = {
  autoplay: DEFAULTS.AUTOPLAY,
  muted: DEFAULTS.MUTED,
  time: DEFAULTS.TIME,
  allowFullscreen: DEFAULTS.ALLOW_FULLSCREEN,
  playsInline: DEFAULTS.INLINE,
  hideControls: DEFAULTS.HIDE_CONTROLS,
  onCaptions: typedNoop2<TwitchPlayerInstance, string>(),
  onEnded: typedNoop<TwitchPlayerInstance>(),
  onPause: typedNoop<TwitchPlayerInstance>(),
  onPlay: typedNoop2<TwitchPlayerInstance, OnPlayData>(),
  onPlaybackBlocked: typedNoop<TwitchPlayerInstance>(),
  onPlaying: typedNoop<TwitchPlayerInstance>(),
  onOffline: typedNoop<TwitchPlayerInstance>(),
  onOnline: typedNoop<TwitchPlayerInstance>(),
  onReady: typedNoop<TwitchPlayerInstance>(),
  onSeek: typedNoop2<TwitchPlayerInstance, OnSeekData>(),
  id: DEFAULTS.ID.TWITCH_PLAYER,
  height: DEFAULTS.MEDIA.HEIGHT,
  width: DEFAULTS.MEDIA.WIDTH
};

const nonReconstructTriggeringProps: (keyof TwitchPlayerProps)[] = ['channel', 'video', 'collection', 'height', 'width'];
const shouldReconstructPlayer = (previousProps: TwitchPlayerProps | undefined, props: TwitchPlayerProps): boolean => {
  return objectCompareWithIgnoredKeys(
    previousProps as Record<string, unknown> ?? {},
    props as Record<string, unknown>,
    nonReconstructTriggeringProps
  );
};

const TwitchPlayer: React.FC<TwitchPlayerProps> = (props) => {
  const {
    channel,
    video,
    collection,
    parent,
    autoplay,
    muted,
    time,
    allowFullscreen,
    playsInline,
    hideControls,

    onCaptions,
    onEnded,
    onPause,
    onPlay,
    onPlaybackBlocked,
    onPlaying,
    onOffline,
    onOnline,
    onReady,
    onSeek,

    id,
    height,
    width,
    ...restOfProps
  } = props;

  const { loading, error } = useScript(URLS.TWITCH_PLAYER_URL);
  const previousProps = usePrevious(props);
  const player = useRef<TwitchPlayerInstance>();

  const createPlayer = useCallback((Player: TwitchPlayerConstructor) => {
    const divHolder = document.getElementById(id!);
    if (divHolder) {
      divHolder.innerHTML = '';
    }

    const player = new Player(id!, {
      channel,
      video,
      collection,
      parent: typeof parent === 'string' ? [parent] : parent,
      autoplay,
      muted,
      time,
      allowfullscreen: allowFullscreen,
      playsinline: playsInline,
      controls: !hideControls,
      height: '100%',
      width: '100%'
    });

    player.addEventListener(Player.CAPTIONS, (captions: string) => onCaptions!(player, captions));
    player.addEventListener(Player.ENDED, () => onEnded!(player));
    player.addEventListener(Player.PAUSE, () => onPause!(player));
    player.addEventListener(Player.PLAY, (data: OnPlayData) => onPlay!(player, data));
    player.addEventListener(Player.PLAYBACK_BLOCKED, () => onPlaybackBlocked!(player));
    player.addEventListener(Player.PLAYING, () => onPlaying!(player));
    player.addEventListener(Player.OFFLINE, () => onOffline!(player));
    player.addEventListener(Player.ONLINE, () => onOnline!(player));
    player.addEventListener(Player.READY, () => onReady!(player));
    player.addEventListener(Player.SEEK, (data: OnSeekData) => onSeek!(player, data));

    return player;
  }, [
    channel,
    video,
    collection,
    parent,
    autoplay,
    muted,
    time,
    allowFullscreen,
    playsInline,
    hideControls,
    onCaptions,
    onEnded,
    onOffline,
    onOnline,
    onPause,
    onPlay,
    onPlaybackBlocked,
    onPlaying,
    onReady,
    onSeek,
    id
  ]);

  useEffect(() => {
    if (loading) {
      return;
    }

    if (error) {
      console.error(error);
      return;
    }

    if (!player.current || shouldReconstructPlayer(previousProps, props)) {
      player.current = createPlayer((window as TwitchWindow).Twitch!.Player!);
      return;
    }

    if (channel && previousProps?.channel !== channel) {
      player.current!.setChannel(channel);
    }

    if (video && previousProps?.video !== video) {
      player.current!.setVideo(video, 0);
    }

    if (collection && previousProps?.collection !== collection) {
      player.current!.setCollection(collection, video);
    }
  }, [channel, collection, createPlayer, error, loading, previousProps, props, video]);

  if (loading) {
    return null;
  }

  return (
    <div
      id={id}
      style={{
        height,
        width
      }}
      {...restOfProps}
    />
  );
};

TwitchPlayer.defaultProps = defaultProps;

export default TwitchPlayer;
