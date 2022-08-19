import React from 'react';
import { DEFAULTS } from '../constants';
import { generateUrl, generateUrlDefaultOptions } from '../utils/TwitchClip';

export interface TwitchClipProps extends React.HTMLAttributes<HTMLIFrameElement> {
  clip: string
  autoplay?: boolean
  muted?: boolean
  parent: string | string[]
  enableMigration?: boolean

  height?: string | number
  width?: string | number
}

const TwitchClip: React.FC<TwitchClipProps> = ({
  clip,
  autoplay,
  muted,
  parent,
  enableMigration,

  title,
  height,
  width,
  ...props
}) => {
  const clipUrl = generateUrl(clip, parent, {
    autoplay: autoplay ?? generateUrlDefaultOptions.autoplay,
    muted: muted ?? generateUrlDefaultOptions.muted,
    enableMigration: enableMigration ?? generateUrlDefaultOptions.enableMigration
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
