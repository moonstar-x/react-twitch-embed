import React from 'react';
import useHostname from '../hooks/useHostname';
import { DEFAULTS } from '../constants';
import { generateUrl, generateUrlDefaultOptions } from '../utils/TwitchChat';

export interface TwitchChatProps extends React.HTMLAttributes<HTMLIFrameElement> {
  channel: string
  darkMode?: boolean
  parent?: string | string[]

  title?: string
  height?: string | number
  width?: string | number
}

const defaultProps: Partial<TwitchChatProps> = {
  darkMode: generateUrlDefaultOptions.darkMode,
  title: 'TwitchChat',
  height: DEFAULTS.CHAT.HEIGHT,
  width: DEFAULTS.CHAT.WIDTH
};

const TwitchChat: React.FC<TwitchChatProps> = ({
  channel,
  darkMode,
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

TwitchChat.defaultProps = defaultProps;

export default TwitchChat;
