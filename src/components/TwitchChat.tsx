import React from 'react';
import { DEFAULTS } from '../constants';
import { generateUrl, generateUrlDefaultOptions } from '../utils/TwitchChat';

// TODO: Remove parent forced and enableMigration
export interface TwitchChatProps extends React.HTMLAttributes<HTMLIFrameElement> {
  channel: string
  darkMode?: boolean
  parent: string | string[]
  enableMigration?: boolean

  height?: string | number
  width?: string | number
}

// TODO: Create defaultProps.

const TwitchChat: React.FC<TwitchChatProps> = ({
  channel,
  darkMode,
  parent,
  enableMigration,

  title,
  height,
  width,
  ...props
}) => {
  const chatUrl = generateUrl(channel, parent, {
    darkMode: darkMode ?? generateUrlDefaultOptions.darkMode,
    enableMigration: enableMigration ?? generateUrlDefaultOptions.enableMigration
  });

  return (
    <iframe
      title={title ?? 'TwitchChat'}
      height={height ?? DEFAULTS.CHAT.HEIGHT}
      width={width ?? DEFAULTS.CHAT.WIDTH}
      src={chatUrl}
      frameBorder={0}
      {...props}
    />
  );
};

export default TwitchChat;
