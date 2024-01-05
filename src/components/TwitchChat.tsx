import React from 'react';
import useHostname from '../hooks/useHostname';
import { DEFAULTS } from '../constants';
import { generateUrl } from '../utils/TwitchChat';

export interface TwitchChatProps extends React.HTMLAttributes<HTMLIFrameElement> {
  channel: string
  parent?: string | string[]
  darkMode?: boolean

  title?: string
  height?: string | number
  width?: string | number
}

const TwitchChat: React.FC<TwitchChatProps> = ({
  channel,
  parent,
  darkMode = DEFAULTS.DARK_MODE,

  title = DEFAULTS.TITLE.TWITCH_CHAT,
  height = DEFAULTS.CHAT.HEIGHT,
  width = DEFAULTS.CHAT.WIDTH,
  ...props
}) => {
  const hostname = useHostname();

  if (!parent && !hostname) {
    return null;
  }

  const chatUrl = generateUrl(channel, parent ?? hostname!, {
    darkMode
  });

  return (
    <iframe
      title={title}
      height={height}
      width={width}
      src={chatUrl}
      frameBorder={0}
      {...props}
    />
  );
};

export default TwitchChat;
