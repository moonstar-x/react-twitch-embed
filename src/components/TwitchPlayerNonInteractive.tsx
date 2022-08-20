import React from 'react';
import useHostname from '../hooks/useHostname';
import { DEFAULTS } from '../constants';
import { generateUrl, generateUrlDefaultOptions } from '../utils/TwitchPlayerNonInteractive';

export interface TwitchPlayerNonInteractiveProps extends React.HTMLAttributes<HTMLIFrameElement> {
  channel?: string
  video?: string
  collection?: string
  autoplay?: boolean
  muted?: boolean
  time?: string
  parent?: string | string[]

  title?: string
  height?: string | number
  width?: string | number
}

const defaultProps: Partial<TwitchPlayerNonInteractiveProps> = {
  autoplay: generateUrlDefaultOptions.autoplay,
  muted: generateUrlDefaultOptions.muted,
  time: generateUrlDefaultOptions.time,
  title: 'TwitchPlayerNonInteractive',
  height: DEFAULTS.MEDIA.HEIGHT,
  width: DEFAULTS.MEDIA.WIDTH
};

const TwitchPlayerNonInteractive: React.FC<TwitchPlayerNonInteractiveProps> = ({
  channel,
  video,
  collection,
  autoplay,
  muted,
  time,
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

  const playerUrl = generateUrl({
    channel,
    video,
    collection
  }, parent ?? hostname!, {
    autoplay,
    muted,
    time
  });

  return (
    <iframe
      title={title}
      height={height}
      width={width}
      src={playerUrl}
      frameBorder={0}
      {...props}
    />
  );
};

TwitchPlayerNonInteractive.defaultProps = defaultProps;

export default TwitchPlayerNonInteractive;
