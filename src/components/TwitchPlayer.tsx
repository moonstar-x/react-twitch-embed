import React, { useEffect, useRef, useCallback } from 'react';
import useScript from '../hooks/useScript';
import usePrevious from '../hooks/usePrevious';
import { DEFAULTS, URLS } from '../constants';
import { typedNoop, typedNoop2 } from '../utils/misc';
import { TwitchWindow, TwitchPlayerConstructor, TwitchPlayerInstance, OnPlayData, OnSeekData } from '../types';

// TODO: Remove forced ID
export interface TwitchPlayerProps {
  parent?: string | string[]
  channel?: string
  video?: string
  collection?: string
  autoplay?: boolean
  muted?: boolean
  time?: string
  playsInline?: boolean
  allowFullscreen?: boolean
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

  id: string
  height?: string | number
  width?: string | number
}

// TODO: Use Component.defaultProps instead of constant ??.

const defaultProps: Partial<TwitchPlayerProps> = {
  autoplay: true,
  muted: false,
  time: '0h0m0s',
  playsInline: true,
  allowFullscreen: true,
  hideControls: false,
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
  height: DEFAULTS.MEDIA.HEIGHT,
  width: DEFAULTS.MEDIA.WIDTH
};

const TwitchPlayer: React.FC<TwitchPlayerProps> = ({
  parent,
  channel,
  video,
  collection,
  autoplay,
  muted,
  time,
  playsInline,
  allowFullscreen,
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
  ...props
}) => {
  const { loading, error } = useScript(URLS.TWITCH_PLAYER_URL);
  const previousMedia = usePrevious({ channel, video, collection });
  const player = useRef<TwitchPlayerInstance>();

  const createPlayer = useCallback((Player: TwitchPlayerConstructor) => {
    document.getElementById(id)!.innerHTML = ''; // TODO: Revise this

    const player = new Player(id, {
      parent: typeof parent === 'string' ? [parent] : parent,
      channel,
      video,
      collection,
      autoplay: autoplay ?? defaultProps.autoplay,
      muted: muted ?? defaultProps.muted,
      time: time ?? defaultProps.time,
      playsinline: playsInline ?? defaultProps.playsInline,
      allowfullscreen: allowFullscreen ?? defaultProps.allowFullscreen,
      controls: !hideControls ?? !defaultProps.hideControls,
      height: '100%',
      width: '100%'
    });

    player.addEventListener(Player.CAPTIONS, (captions: string) => {
      const handler = onCaptions ?? defaultProps.onCaptions!;
      return handler(player, captions);
    });
    player.addEventListener(Player.ENDED, () => {
      const handler = onEnded ?? defaultProps.onEnded!;
      return handler(player);
    });
    player.addEventListener(Player.PAUSE, () => {
      const handler = onPause ?? defaultProps.onPause!;
      return handler(player);
    });
    player.addEventListener(Player.PLAY, (data: OnPlayData) => {
      const handler = onPlay ?? defaultProps.onPlay!;
      return handler(player, data);
    });
    player.addEventListener(Player.PLAYBACK_BLOCKED, () => {
      const handler = onPlaybackBlocked ?? defaultProps.onPlaybackBlocked!;
      return handler(player);
    });
    player.addEventListener(Player.PLAYING, () => {
      const handler = onPlaying ?? defaultProps.onPlaying!;
      return handler(player);
    });
    player.addEventListener(Player.OFFLINE, () => {
      const handler = onOffline ?? defaultProps.onOffline!;
      return handler(player);
    });
    player.addEventListener(Player.ONLINE, () => {
      const handler = onOnline ?? defaultProps.onOnline!;
      return handler(player);
    });
    player.addEventListener(Player.READY, () => {
      const handler = onReady ?? defaultProps.onReady!;
      return handler(player);
    });
    player.addEventListener(Player.SEEK, (data: OnSeekData) => {
      const handler = onSeek ?? defaultProps.onSeek!;
      return handler(player, data);
    });

    return player;
  }, [
    allowFullscreen,
    autoplay,
    channel,
    collection,
    hideControls,
    id,
    muted,
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
    parent,
    playsInline,
    time,
    video
  ]);

  useEffect(() => {
    if (loading) {
      return;
    }

    if (error) {
      console.error(error);
      return;
    }

    // TODO: Multiple props updating containing channel might cause the others to be ignored.
    if (player.current) {
      let somethingChanged = false;

      if (channel && previousMedia?.channel !== channel) {
        player.current!.setChannel(channel);
        somethingChanged = true;
      }

      // TODO: Check video setting with v.
      if (video && previousMedia?.video !== video) {
        player.current!.setVideo(`v${video}`, 0);
        somethingChanged = true;
      }

      if (collection && previousMedia?.collection !== collection) {
        player.current!.setCollection(collection, video ? `v${video}` : undefined);
        somethingChanged = true;
      }

      if (somethingChanged) {
        return;
      }
    }

    player.current = createPlayer((window as TwitchWindow).Twitch!.Player!);
  }, [
    channel,
    collection,
    createPlayer,
    error,
    loading,
    previousMedia,
    video
  ]);

  return (
    <div
      id={id}
      style={{
        height: height ?? defaultProps.height,
        width: width ?? defaultProps.width
      }}
      {...props}
    />
  );
};

export default TwitchPlayer;
