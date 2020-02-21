import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TWITCH_EMBED_URL } from '../constants';

class TwitchEmbed extends Component {
  componentDidMount() {
    if (!this.props.channel) {
      throw new Error('A channel prop must be supplied to TwitchEmbed!');
    }

    if (window.Twitch && window.Twitch.Embed) {
      return this._createEmbed();
    }

    const scriptElement = document.createElement('script');
    scriptElement.setAttribute('src', TWITCH_EMBED_URL);

    scriptElement.addEventListener('load', () => {
      this._createEmbed();
    });

    document.body.appendChild(scriptElement);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!this.props.channel) {
      throw new Error('A channel prop must be supplied to TwitchEmbed!');
    }

    if (
      prevProps.channel !== this.props.channel ||
      prevProps.width !== this.props.width ||
      prevProps.height !== this.props.height
    ) {
      this.embed = null;
      document.getElementById(prevProps.id).innerHTML = '';
      this._createEmbed();
    }
  }

  _createEmbed() {
    this.embed = new window.Twitch.Embed(this.props.id, {
      allowfullscreen: this.props.allowFullscreen,
      channel: this.props.channel,
      'font-size': this.props.fontSize,
      height: this.props.height,
      layout: this.props.withChat ? 'video-with-chat' : 'video',
      theme: this.props.theme,
      width: this.props.width
    });

    this._addEventListeners();
  }

  _addEventListeners() {
    this.embed.addEventListener(window.Twitch.Embed.AUTHENTICATE, this.props.onAuthenticate);
    this.embed.addEventListener(window.Twitch.Embed.VIDEO_PLAY, this.props.onVideoPlay);
    this.embed.addEventListener(window.Twitch.Embed.VIDEO_PAUSE, this.props.onVideoPause);
    this.embed.addEventListener(window.Twitch.Embed.VIDEO_READY, () => {
      const { autoplay, muted } = this.props;
      const player = this.embed.getPlayer();

      if (muted) {
        player.setVolume(0);
      }

      if (!autoplay) {
        player.pause();
      }

      this.props.onVideoReady(player);
    });
  }

  render() {
    const { id, width, height } = this.props;

    return (
      <div style={{ width, height }} id={id} />
    );
  }
}

TwitchEmbed.propTypes = {
  id: PropTypes.string,
  allowFullscreen: PropTypes.bool,
  channel: PropTypes.string.isRequired,
  fontSize: PropTypes.oneOf(['small', 'medium', 'large']),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  withChat: PropTypes.bool,
  theme: PropTypes.oneOf(['light', 'dark']),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onAuthenticate: PropTypes.func,
  onVideoPlay: PropTypes.func,
  onVideoPause: PropTypes.func,
  onVideoReady: PropTypes.func,
  autoplay: PropTypes.bool,
  muted: PropTypes.bool
};

TwitchEmbed.defaultProps = {
  id: 'twitch-embed',
  allowFullscreen: true,
  fontSize: 'small',
  height: 480,
  withChat: true,
  theme: 'light',
  width: 940,
  onAuthenticate: () => null,
  onVideoPlay: () => null,
  onVideoPause: () => null,
  onVideoReady: () => null,
  autoplay: true,
  muted: false
};

export default TwitchEmbed;
