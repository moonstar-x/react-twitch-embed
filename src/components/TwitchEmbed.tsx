import React, { useEffect, useRef, useCallback } from 'react';
import useScript from '../hooks/useScript';
import usePrevious from '../hooks/usePrevious';
import { DEFAULTS, URLS } from '../constants';
import { typedNoop, typedNoop2 } from '../utils/misc';
import { TwitchWindow, TwitchEmbedConstructor, TwitchEmbedInstance, OnPlayData, OnAuthenticateData } from '../types';
import { objectCompareWithIgnoredKeys } from '../utils/object';

// TODO: Check default values for every component.
export interface TwitchEmbedProps extends React.HTMLAttributes<HTMLDivElement> {
  channel?: string
  video?: string
  collection?: string
  parent?: string | string[]
  allowFullscreen?: boolean
  withChat?: boolean
  darkMode?: boolean
  autoplay?: boolean
  muted?: boolean
  time?: string
  hideControls?: boolean

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
  time: '0h0m0s',
  hideControls: false,
  onAuthenticate: typedNoop2<TwitchEmbedInstance, OnAuthenticateData>(),
  onVideoPlay: typedNoop2<TwitchEmbedInstance, OnPlayData>(),
  onVideoPause: typedNoop<TwitchEmbedInstance>(),
  onVideoReady: typedNoop<TwitchEmbedInstance>(),
  id: 'twitch-embed',
  height: DEFAULTS.MEDIA.HEIGHT,
  width: DEFAULTS.MEDIA.WIDTH
};

const nonReconstructTriggeringProps: (keyof TwitchEmbedProps)[] = ['channel', 'video', 'collection', 'height', 'width'];
const shouldReconstructEmbed = (previousProps: TwitchEmbedProps | undefined, props: TwitchEmbedProps): boolean => {
  return objectCompareWithIgnoredKeys(
    previousProps as Record<string, unknown> ?? {},
    props as Record<string, unknown>,
    nonReconstructTriggeringProps
  );
};

const TwitchEmbed: React.FC<TwitchEmbedProps> = (props) => {
  const {
    channel,
    video,
    collection,
    parent,
    allowFullscreen,
    withChat,
    darkMode,
    autoplay,
    muted,
    hideControls,

    onAuthenticate,
    onVideoPlay,
    onVideoPause,
    onVideoReady,

    id,
    height,
    width,
    ...restOfProps
  } = props;

  const { loading, error } = useScript(URLS.TWITCH_EMBED_URL);
  const previousProps = usePrevious(props);
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
      collection,
      video,
      height: '100%',
      layout: withChat ? 'video-with-chat' : 'video',
      muted,
      controls: !hideControls,
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
    video,
    collection,
    darkMode,
    id,
    muted,
    hideControls,
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

    if (!embed.current || shouldReconstructEmbed(previousProps, props)) {
      embed.current = createEmbed((window as TwitchWindow).Twitch!.Embed!);
      return;
    }

    if (channel && previousProps?.channel !== channel) {
      embed.current!.getPlayer().setChannel(channel);
    }

    if (video && previousProps?.video !== video) {
      embed.current!.getPlayer().setVideo(video, 0);
    }

    if (collection && previousProps?.collection !== collection) {
      embed.current!.getPlayer().setCollection(collection, video);
    }
  }, [channel, collection, createEmbed, error, loading, previousProps, props, video]);

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

TwitchEmbed.defaultProps = defaultProps;

export default TwitchEmbed;
