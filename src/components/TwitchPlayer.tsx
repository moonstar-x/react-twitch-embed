import React, { useEffect, useRef, useCallback } from 'react';
import useScript from '../hooks/useScript';
import usePrevious from '../hooks/usePrevious';
import { DEFAULTS, URLS } from '../constants';
import { noop } from '../utils/misc';
import { TwitchWindow, TwitchPlayerConstructor, TwitchPlayerInstance } from '../types';

export interface TwitchPlayerProps extends React.HTMLAttributes<HTMLDivElement> {
  parent?: string | string[]
  channel?: string
  video?: string
  collection?: string
  autoplay?: boolean
  muted?: boolean
  time?: string

  onCaptions?: () => void
  onEnded?: () => void
  onPause?: () => void
  onPlay?: () => void
  onPlaybackBlocked?: () => void
  onPlaying?: () => void
  onOffline?: () => void
  onOnline?: () => void
  onReady?: () => void
  onSeek?: () => void

  id: string
  height?: string | number
  width?: string | number
}

const defaultProps: Partial<TwitchPlayerProps> = {
  autoplay: true,
  muted: false,
  time: '0h0m0s',
  onCaptions: noop,
  onEnded: noop,
  onPause: noop,
  onPlay: noop,
  onPlaybackBlocked: noop,
  onPlaying: noop,
  onOffline: noop,
  onOnline: noop,
  onReady: noop,
  onSeek: noop,
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
      height: '100%',
      width: '100%'
    });

    player.addEventListener(Player.CAPTIONS, onCaptions ?? defaultProps.onCaptions!);
    player.addEventListener(Player.ENDED, onEnded ?? defaultProps.onEnded!);
    player.addEventListener(Player.PAUSE, onPause ?? defaultProps.onPause!);
    player.addEventListener(Player.PLAY, onPlay ?? defaultProps.onPlay!);
    player.addEventListener(Player.PLAYBACK_BLOCKED, onPlaybackBlocked ?? defaultProps.onPlaybackBlocked!);
    player.addEventListener(Player.PLAYING, onPlaying ?? defaultProps.onPlaying!);
    player.addEventListener(Player.OFFLINE, onOffline ?? defaultProps.onOffline!);
    player.addEventListener(Player.ONLINE, onOnline ?? defaultProps.onOnline!);
    player.addEventListener(Player.READY, onReady ?? defaultProps.onReady!);
    player.addEventListener(Player.SEEK, onSeek ?? defaultProps.onSeek!);

    return player;
  }, [
    autoplay,
    channel,
    collection,
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

      if (video && previousMedia?.video !== video) {
        player.current!.setVideo(`v${video}`);
        somethingChanged = true;
      }

      if (collection && previousMedia?.collection !== collection) {
        player.current!.setCollection(collection);
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
