import React from 'react';
import useHostname from '../hooks/useHostname';
import { DEFAULTS } from '../constants';
import { generateUrl } from '../utils/TwitchPlayerNonInteractive';

export interface TwitchPlayerNonInteractiveProps extends React.HTMLAttributes<HTMLIFrameElement> {
  parent?: string | string[]
  channel?: string
  video?: string
  collection?: string
  autoplay?: boolean
  muted?: boolean
  time?: string

  title?: string
  height?: string | number
  width?: string | number
}

const defaultProps: Partial<TwitchPlayerNonInteractiveProps> = {
  autoplay: DEFAULTS.AUTOPLAY,
  muted: DEFAULTS.MUTED,
  time: DEFAULTS.TIME,
  title: DEFAULTS.TITLE.TWITCH_PLAYER_NON_INTERACTIVE,
  height: DEFAULTS.MEDIA.HEIGHT,
  width: DEFAULTS.MEDIA.WIDTH
};

const TwitchPlayerNonInteractive: React.FC<TwitchPlayerNonInteractiveProps> = ({
  parent,
  channel,
  video,
  collection,
  autoplay,
  muted,
  time,

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
