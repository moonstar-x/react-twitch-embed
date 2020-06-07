import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CHAT_DEFAULT_HEIGHT, CHAT_DEFAULT_WIDTH, TWITCH_CHAT_URL } from '../constants';
import { parseParentQuery } from '../utils';

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

    if (!this.props.parent || this.props.parent.length < 1) {
      throw new Error('A parent prop must be supplied to TwitchChat containing the URLs that embed Twitch!');
    }
  }

  _createEmbedURL() {
    const { channel, theme, parent, migration } = this.props;

    const themeQuery = theme === 'dark' ? '?darkpopout' : '';
    const migrationFirstChar = theme !== 'dark' ? '?' : '&';
    return `${TWITCH_CHAT_URL}/${channel}/chat${themeQuery}${migrationFirstChar}migration=${migration.toString()}${parseParentQuery(parent)}`;
  }

  render() {
    const { height, id, width, ...props } = this.props;

    return (
      <iframe
        title={`Twitch Chat - ${id}`}
        id={id}
        src={this._createEmbedURL()}
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
  theme: PropTypes.oneOf(['light', 'dark']),
  parent: PropTypes.arrayOf(PropTypes.string).isRequired,
  migration: PropTypes.bool
};

TwitchChat.defaultProps = {
  id: 'twitch-chat-embed',
  height: CHAT_DEFAULT_HEIGHT,
  width: CHAT_DEFAULT_WIDTH,
  theme: 'light',
  migration: true
};

export default TwitchChat;
