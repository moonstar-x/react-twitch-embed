import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getClipEmbedURL } from '../utils';

class TwitchClip extends Component {
  componentDidMount() {
    if (!this.props.clip) {
      throw new Error('A clip prop must be supplied to TwitchClip!');
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!this.props.clip) {
      throw new Error('A clip prop must be supplied to TwitchClip!');
    }
  }

  render() {
    const { clip, id, autoplay, muted, height, width, allowFullscreen, ...props } = this.props;

    return (
      <iframe
        title={`Twitch Clip Embed - ${id}`}
        src={getClipEmbedURL(clip, autoplay, muted)}
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
  height: PropTypes.number,
  width: PropTypes.number,
  allowFullscreen: PropTypes.bool
};

TwitchClip.defaultProps = {
  id: 'twitch-clip-embed',
  autoplay: true,
  muted: false,
  height: 480,
  width: 940,
  allowFullscreen: true
};

export default TwitchClip;
