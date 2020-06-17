import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CHAT_DEFAULT_HEIGHT, CHAT_DEFAULT_WIDTH, TWITCH_CHAT_URL } from '../constants';
import { getUnknownProps, parseParentQuery } from '../utils';

const propTypes = {
  channel: PropTypes.string.isRequired,
  id: PropTypes.string,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  theme: PropTypes.oneOf(['light', 'dark']),
  parent: PropTypes.arrayOf(PropTypes.string),
  migration: PropTypes.bool
};

const defaultProps = {
  id: 'twitch-chat-embed',
  height: CHAT_DEFAULT_HEIGHT,
  width: CHAT_DEFAULT_WIDTH,
  theme: 'light',
  migration: true,
  parent: []
};

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

  _createEmbedURL() {
    const { channel, theme, parent, migration } = this.props;

    const themeQuery = theme === 'dark' ? '?darkpopout' : '';
    const migrationFirstChar = theme !== 'dark' ? '?' : '&';
    return `${TWITCH_CHAT_URL}/${channel}/chat${themeQuery}${migrationFirstChar}migration=${migration.toString()}${parseParentQuery(parent)}`;
  }

  render() {
    const { height, id, width } = this.props;
    const unknownProps = getUnknownProps(this.props, propTypes);

    return (
      <iframe
        title={`Twitch Chat - ${id}`}
        id={id}
        src={this._createEmbedURL()}
        height={height}
        width={width}
        frameBorder={0}
        {...unknownProps}
      />
    );
  }
}

TwitchChat.propTypes = propTypes;
TwitchChat.defaultProps = defaultProps;

export default TwitchChat;
