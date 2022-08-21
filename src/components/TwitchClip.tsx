import React from 'react';
import useHostname from '../hooks/useHostname';
import { DEFAULTS } from '../constants';
import { generateUrl } from '../utils/TwitchClip';

export interface TwitchClipProps extends React.HTMLAttributes<HTMLIFrameElement> {
  clip: string
  parent?: string | string[]
  autoplay?: boolean
  muted?: boolean

  title?: string
  height?: string | number
  width?: string | number
}

const defaultProps: Partial<TwitchClipProps> = {
  autoplay: DEFAULTS.AUTOPLAY,
  muted: DEFAULTS.MUTED,
  title: DEFAULTS.TITLE.TWITCH_CLIP,
  height: DEFAULTS.MEDIA.HEIGHT,
  width: DEFAULTS.MEDIA.WIDTH
};

const TwitchClip: React.FC<TwitchClipProps> = ({
  clip,
  parent,
  autoplay,
  muted,

  title,
  height,
  width,
  ...props
}) => {
  const hostname = useHostname();

  if (!parent && !hostname) {
    return null;
  }

  const clipUrl = generateUrl(clip, parent ?? hostname!, {
    autoplay,
    muted
  });

  return (
    <iframe
      title={title}
      height={height}
      width={width}
      src={clipUrl}
      frameBorder={0}
      {...props}
    />
  );
};

TwitchClip.defaultProps = defaultProps;

export default TwitchClip;
