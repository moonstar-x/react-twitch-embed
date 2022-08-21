import React, { useEffect, useRef, useCallback } from 'react';
import useScript from '../hooks/useScript';
import usePrevious from '../hooks/usePrevious';
import { DEFAULTS, URLS } from '../constants';
import { typedNoop, typedNoop2 } from '../utils/misc';
import { TwitchWindow, TwitchEmbedConstructor, TwitchEmbedInstance, OnPlayData, OnAuthenticateData } from '../types';
import { objectCompareWithIgnoredKeys } from '../utils/object';
import { clearElementById } from '../utils/document';

export interface TwitchEmbedProps extends React.HTMLAttributes<HTMLDivElement> {
  allowFullscreen?: boolean
  autoplay?: boolean
  channel?: string
  video?: string
  collection?: string
  withChat?: boolean
  muted?: boolean
  parent?: string | string[]
  darkMode?: boolean
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
  allowFullscreen: DEFAULTS.ALLOW_FULLSCREEN,
  autoplay: DEFAULTS.AUTOPLAY,
  withChat: DEFAULTS.WITH_CHAT,
  muted: DEFAULTS.MUTED,
  darkMode: DEFAULTS.DARK_MODE,
  time: DEFAULTS.TIME,
  hideControls: DEFAULTS.HIDE_CONTROLS,
  onAuthenticate: typedNoop2<TwitchEmbedInstance, OnAuthenticateData>(),
  onVideoPlay: typedNoop2<TwitchEmbedInstance, OnPlayData>(),
  onVideoPause: typedNoop<TwitchEmbedInstance>(),
  onVideoReady: typedNoop<TwitchEmbedInstance>(),
  id: DEFAULTS.ID.TWITCH_EMBED,
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

// TODO: Clear player on onMount
const TwitchEmbed: React.FC<TwitchEmbedProps> = (props) => {
  const {
    allowFullscreen,
    autoplay,
    channel,
    video,
    collection,
    withChat,
    muted,
    parent,
    darkMode,
    time,
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
    clearElementById(id!);

    const embed = new EmbedConstructor(id!, {
      allowfullscreen: allowFullscreen,
      autoplay,
      channel,
      video,
      collection,
      layout: withChat ? 'video-with-chat' : 'video',
      muted,
      parent: typeof parent === 'string' ? [parent] : parent,
      theme: darkMode ? 'dark' : 'light',
      time,
      controls: !hideControls,
      height: '100%',
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
    withChat,
    muted,
    parent,
    darkMode,
    time,
    hideControls,
    onAuthenticate,
    onVideoPause,
    onVideoPlay,
    onVideoReady,
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
