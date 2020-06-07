import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MEDIA_DEFAULT_HEIGHT, MEDIA_DEFAULT_WIDTH, TWITCH_CLIP_URL } from '../constants';
import { getUnknownProps, parseParentQuery } from '../utils';

const propTypes = {
  clip: PropTypes.string.isRequired,
  id: PropTypes.string,
  autoplay: PropTypes.bool,
  muted: PropTypes.bool,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  allowFullscreen: PropTypes.bool,
  parent: PropTypes.arrayOf(PropTypes.string).isRequired,
  migration: PropTypes.bool
};

const defaultProps = {
  id: 'twitch-clip-embed',
  autoplay: true,
  muted: false,
  height: MEDIA_DEFAULT_HEIGHT,
  width: MEDIA_DEFAULT_WIDTH,
  allowFullscreen: true,
  migration: true
};

class TwitchClip extends Component {
  componentDidMount() {
    this._validateProps();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this._validateProps();
  }

  _validateProps() {
    if (!this.props.clip) {
      throw new Error('A clip prop must be supplied to TwitchClip!');
    }

    if (!this.props.parent || this.props.parent.length < 1) {
      throw new Error('A parent prop must be supplied to TwitchClip containing the URLs that embed Twitch!');
    }
  }

  _createEmbedURL() {
    const { clip, autoplay, muted, parent, migration } = this.props;

    return `${TWITCH_CLIP_URL}?clip=${clip}&autoplay=${autoplay}&muted=${muted}&migration=${migration.toString()}${parseParentQuery(parent)}`;
  }

  render() {
    const { id, height, width, allowFullscreen } = this.props;
    const unknownProps = getUnknownProps(this.props, propTypes);

    return (
      <iframe
        title={`Twitch Clip Embed - ${id}`}
        src={this._createEmbedURL()}
        id={id}
        height={height}
        width={width}
        allowFullScreen={allowFullscreen}
        {...unknownProps}
      />
    );
  }
}

TwitchClip.propTypes = propTypes;
TwitchClip.defaultProps = defaultProps;

export default TwitchClip;
