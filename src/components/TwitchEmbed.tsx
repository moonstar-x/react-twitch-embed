import React, { useEffect, useRef, useCallback } from 'react';
import useScript from '../hooks/useScript';
import usePrevious from '../hooks/usePrevious';
import { DEFAULTS, URLS } from '../constants';
import { typedNoop, typedNoop2 } from '../utils/misc';
import { TwitchWindow, TwitchEmbedConstructor, TwitchEmbedInstance, OnPlayData, OnAuthenticateData } from '../types';

// TODO: Revise functionality for video and collection
export interface TwitchEmbedProps extends React.HTMLAttributes<HTMLDivElement> {
  channel: string
  parent?: string | string[]
  allowFullscreen?: boolean
  withChat?: boolean
  darkMode?: boolean
  autoplay?: boolean
  muted?: boolean

  onAuthenticate?: (embed: TwitchEmbedInstance, data: OnAuthenticateData) => void
  onVideoPlay?: (embed: TwitchEmbedInstance, data: OnPlayData) => void
  onVideoPause?: (embed: TwitchEmbedInstance) => void
  onVideoReady?: (embed: TwitchEmbedInstance) => void

  id?: string
  height?: string | number
  width?: string | number
}

const defaultProps: Partial<TwitchEmbedProps> = {
  allowFullscreen: true,
  withChat: true,
  darkMode: true,
  autoplay: true,
  muted: false,
  onAuthenticate: typedNoop2<TwitchEmbedInstance, OnAuthenticateData>(),
  onVideoPlay: typedNoop2<TwitchEmbedInstance, OnPlayData>(),
  onVideoPause: typedNoop<TwitchEmbedInstance>(),
  onVideoReady: typedNoop<TwitchEmbedInstance>(),
  id: 'twitch-embed',
  height: DEFAULTS.MEDIA.HEIGHT,
  width: DEFAULTS.MEDIA.WIDTH
};

const TwitchEmbed: React.FC<TwitchEmbedProps> = ({
  channel,
  parent,
  allowFullscreen,
  withChat,
  darkMode,
  autoplay,
  muted,

  onAuthenticate,
  onVideoPlay,
  onVideoPause,
  onVideoReady,

  id,
  height,
  width,
  ...props
}) => {
  const { loading, error } = useScript(URLS.TWITCH_EMBED_URL);
  const previousChannel = usePrevious(channel);
  const embed = useRef<TwitchEmbedInstance>();

  const createEmbed = useCallback((EmbedConstructor: TwitchEmbedConstructor) => {
    const divHolder = document.getElementById(id!);
    if (divHolder) {
      divHolder.innerHTML = '';
    }

    const embed = new EmbedConstructor(id!, {
      allowfullscreen: allowFullscreen,
      autoplay,
      channel,
      height: '100%',
      layout: withChat ? 'video-with-chat' : 'video',
      muted,
      parent: typeof parent === 'string' ? [parent] : parent,
      theme: darkMode ? 'dark' : 'light',
      width: '100%'
    });

    embed.addEventListener(EmbedConstructor.AUTHENTICATE, (data: OnAuthenticateData) => onAuthenticate!(embed, data));
    embed.addEventListener(EmbedConstructor.VIDEO_PLAY, (data: OnPlayData) => onVideoPlay!(embed, data));
    embed.addEventListener(EmbedConstructor.VIDEO_PAUSE, () => onVideoPause!(embed));
    embed.addEventListener(EmbedConstructor.VIDEO_READY, () => onVideoReady!(embed));

    return embed;
  }, [
    allowFullscreen,
    autoplay,
    channel,
    darkMode,
    id,
    muted,
    onAuthenticate,
    onVideoPause,
    onVideoPlay,
    onVideoReady,
    parent,
    withChat
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
    if (embed.current && previousChannel !== channel) {
      embed.current.getPlayer().setChannel(channel);
      return;
    }

    embed.current = createEmbed((window as TwitchWindow).Twitch!.Embed!);
  }, [
    loading,
    error,
    createEmbed,
    allowFullscreen,
    darkMode,
    id,
    onAuthenticate,
    onVideoPause,
    onVideoPlay,
    onVideoReady,
    parent,
    withChat,
    channel,
    previousChannel
  ]);

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
      {...props}
    />
  );
};

TwitchEmbed.defaultProps = defaultProps;

export default TwitchEmbed;
