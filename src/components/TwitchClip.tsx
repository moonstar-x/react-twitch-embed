import React from 'react';
import { DEFAULTS } from '../constants';
import { generateUrl, generateUrlDefaultOptions } from '../utils/TwitchClip';

// TODO: Remove parent forced
export interface TwitchClipProps extends React.HTMLAttributes<HTMLIFrameElement> {
  clip: string
  autoplay?: boolean
  muted?: boolean
  parent: string | string[]

  height?: string | number
  width?: string | number
}

// TODO: Create defaultProps.
// TODO: Use Component.defaultProps instead of constant ??.


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
  const clipUrl = generateUrl(clip, parent, {
    autoplay: autoplay ?? generateUrlDefaultOptions.autoplay,
    muted: muted ?? generateUrlDefaultOptions.muted,
  });

  return (
    <iframe
      title={title ?? 'TwitchClip'}
      height={height ?? DEFAULTS.MEDIA.HEIGHT}
      width={width ?? DEFAULTS.MEDIA.WIDTH}
      src={clipUrl}
      frameBorder={0}
      {...props}
    />
  );
};

export default TwitchClip;
