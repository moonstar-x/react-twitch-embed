import React from 'react';
import PropTypes from 'prop-types';
import { getChatEmbedURL } from '../utils';

const TwitchChat = ({ channel, height, id, width, ...props }) => {
  return (
    <iframe
      title={`Twitch Chat - ${id}`}
      id={id}
      src={getChatEmbedURL(channel)}
      height={height}
      width={width}
      {...props}
    />
  );
};

TwitchChat.propTypes = {
  channel: PropTypes.string.isRequired,
  id: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number
};

TwitchChat.defaultProps = {
  id: 'chat-embed',
  height: 500,
  width: 350
};

export default TwitchChat;
