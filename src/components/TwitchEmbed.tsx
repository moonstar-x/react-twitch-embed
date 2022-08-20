import React, { useEffect, useRef, useCallback } from 'react';
import useScript from '../hooks/useScript';
import usePrevious from '../hooks/usePrevious';
import { DEFAULTS, URLS } from '../constants';
import { noop, typedNoop } from '../utils/misc';
import { TwitchWindow, TwitchEmbedConstructor, TwitchEmbedInstance } from '../types';

// TODO: Revise functionality for video and collection
// TODO: Remove forced ID
// TODO: Events should expose embed.
export interface TwitchEmbedProps extends React.HTMLAttributes<HTMLDivElement> {
  channel: string
  parent?: string | string[] | null
  allowFullscreen?: boolean
  withChat?: boolean
  darkMode?: boolean
  autoplay?: boolean
  muted?: boolean

  onAuthenticate?: () => void
  onVideoPlay?: () => void
  onVideoPause?: () => void
  onVideoReady?: (embed: TwitchEmbedInstance) => void

  id: string
  height?: string | number
  width?: string | number
}

// TODO: Remove the parent default
const defaultProps: Partial<TwitchEmbedProps> = {
  parent: null,
  allowFullscreen: true,
  withChat: true,
  darkMode: true,
  autoplay: true,
  muted: false,
  onAuthenticate: noop,
  onVideoPlay: noop,
  onVideoPause: noop,
  onVideoReady: typedNoop<TwitchEmbedInstance>(),
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
  const embed = useRef<TwitchEmbedInstance | null>(null); // TODO: Remove null

  const createEmbed = useCallback((EmbedConstructor: TwitchEmbedConstructor) => {
    document.getElementById(id)!.innerHTML = ''; // TODO: Revise this

    const embed = new EmbedConstructor(id, {
      allowfullscreen: allowFullscreen ?? defaultProps.allowFullscreen,
      autoplay: autoplay ?? defaultProps.autoplay,
      channel,
      height: '100%',
      layout: withChat ? 'video-with-chat' : 'video',
      muted: muted ?? defaultProps.muted,
      parent: typeof parent === 'string' ? [parent] : parent,
      theme: darkMode ? 'dark' : 'light',
      width: '100%'
    });

    embed.addEventListener(EmbedConstructor.AUTHENTICATE, onAuthenticate ?? defaultProps.onAuthenticate!);
    embed.addEventListener(EmbedConstructor.VIDEO_PLAY, onVideoPlay ?? defaultProps.onVideoPlay!);
    embed.addEventListener(EmbedConstructor.VIDEO_PAUSE, onVideoPause ?? defaultProps.onVideoPause!);
    embed.addEventListener(EmbedConstructor.VIDEO_READY, () => {
      const handler = onVideoReady ?? defaultProps.onVideoReady!;
      return handler(embed);
    });

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

  // TODO: Remove this efefct.
  useEffect(() => {
    if (!embed || !embed.current || !channel) {
      return;
    }

    embed.current.getPlayer().setChannel(channel);
  }, [embed, channel]);

  if (loading) {
    return null;
  }

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

export default TwitchEmbed;
