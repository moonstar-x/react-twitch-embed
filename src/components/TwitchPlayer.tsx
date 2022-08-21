import React, { useEffect, useRef, useCallback } from 'react';
import useScript from '../hooks/useScript';
import usePrevious from '../hooks/usePrevious';
import { DEFAULTS, URLS } from '../constants';
import { typedNoop, typedNoop2 } from '../utils/misc';
import { TwitchWindow, TwitchPlayerConstructor, TwitchPlayerInstance, OnPlayData, OnSeekData } from '../types';

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

  id?: string
  height?: string | number
  width?: string | number
}

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
  id: 'twitch-player',
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
    const divHolder = document.getElementById(id!);
    if (divHolder) {
      divHolder.innerHTML = '';
    }

    const player = new Player(id!, {
      parent: typeof parent === 'string' ? [parent] : parent,
      channel,
      video,
      collection,
      autoplay,
      muted,
      time,
      playsinline: playsInline,
      allowfullscreen: allowFullscreen,
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

      if (video && previousMedia?.video !== video) {
        player.current!.setVideo(video, 0);
        somethingChanged = true;
      }

      if (collection && previousMedia?.collection !== collection) {
        player.current!.setCollection(collection, video);
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
        height,
        width
      }}
      {...props}
    />
  );
};

TwitchPlayer.defaultProps = defaultProps;

export default TwitchPlayer;
