import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CHAT_DEFAULT_HEIGHT, CHAT_DEFAULT_WIDTH } from '../constants';
import { getChatEmbedURL } from '../utils';

class TwitchChat extends Component {
  componentDidMount() {
    this._validateProps();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this._validateProps();
  }

  _validateProps() {
    if (!this.props.channel) {
      throw new Error('A channel prop must be supplied to TwitchChat!');
    }
  }

  render() {
    const { channel, height, id, width, theme, ...props } = this.props;

    return (
      <iframe
        title={`Twitch Chat - ${id}`}
        id={id}
        src={getChatEmbedURL(channel, theme)}
        height={height}
        width={width}
        {...props}
      />
    );
  }
}

TwitchChat.propTypes = {
  channel: PropTypes.string.isRequired,
  id: PropTypes.string,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  theme: PropTypes.oneOf(['light', 'dark'])
};

TwitchChat.defaultProps = {
  id: 'twitch-chat-embed',
  height: CHAT_DEFAULT_HEIGHT,
  width: CHAT_DEFAULT_WIDTH,
  theme: 'light'
};

export default TwitchChat;
