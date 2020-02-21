import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getChatEmbedURL } from '../utils';

class TwitchChat extends Component {
  componentDidMount() {
    if (!this.props.channel) {
      throw new Error('A channel prop must be supplied to TwitchChat!');
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!this.props.channel) {
      throw new Error('A channel prop must be supplied to TwitchChat!');
    }
  }

  render() {
    const { channel, height, id, width, ...props } = this.props;

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
  }
}

TwitchChat.propTypes = {
  channel: PropTypes.string.isRequired,
  id: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number
};

TwitchChat.defaultProps = {
  id: 'twitch-chat-embed',
  height: 500,
  width: 350
};

export default TwitchChat;
