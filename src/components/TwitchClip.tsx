import React from 'react';
import useHostname from '../hooks/useHostname';
import { DEFAULTS } from '../constants';
import { generateUrl, generateUrlDefaultOptions } from '../utils/TwitchClip';

export interface TwitchClipProps extends React.HTMLAttributes<HTMLIFrameElement> {
  clip: string
  autoplay?: boolean
  muted?: boolean
  parent?: string | string[]

  title?: string
  height?: string | number
  width?: string | number
}

const defaultProps: Partial<TwitchClipProps> = {
  autoplay: generateUrlDefaultOptions.autoplay,
  muted: generateUrlDefaultOptions.muted,
  title: 'TwitchClip',
  height: DEFAULTS.MEDIA.HEIGHT,
  width: DEFAULTS.MEDIA.WIDTH
};

const TwitchClip: React.FC<TwitchClipProps> = ({
  clip,
  autoplay,
  muted,
  parent,

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
