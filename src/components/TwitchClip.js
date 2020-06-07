import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MEDIA_DEFAULT_HEIGHT, MEDIA_DEFAULT_WIDTH, TWITCH_CLIP_URL } from '../constants';
import { parseParentQuery } from '../utils';

const getClipEmbedURL = (clip, autoplay, muted, parent, migration) => {
  return `${TWITCH_CLIP_URL}?clip=${clip}&autoplay=${autoplay}&muted=${muted}&migration=${migration.toString()}${parseParentQuery(parent)}`;
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

  render() {
    const { clip, id, autoplay, muted, height, width, allowFullscreen, parent, migration, ...props } = this.props;

    return (
      <iframe
        title={`Twitch Clip Embed - ${id}`}
        src={getClipEmbedURL(clip, autoplay, muted, parent, migration)}
        id={id}
        height={height}
        width={width}
        allowFullScreen={allowFullscreen}
        {...props}
      />
    );
  }
}

TwitchClip.propTypes = {
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

TwitchClip.defaultProps = {
  id: 'twitch-clip-embed',
  autoplay: true,
  muted: false,
  height: MEDIA_DEFAULT_HEIGHT,
  width: MEDIA_DEFAULT_WIDTH,
  allowFullscreen: true,
  migration: true
};

export default TwitchClip;
