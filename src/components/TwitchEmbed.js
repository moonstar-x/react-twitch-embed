import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TWITCH_EMBED_URL, MEDIA_DEFAULT_WIDTH, MEDIA_DEFAULT_HEIGHT } from '../constants';

const scriptElement = document.createElement('script');
scriptElement.setAttribute('type', 'text/javascript');
scriptElement.setAttribute('src', TWITCH_EMBED_URL);
let scriptAdded = false;

class TwitchEmbed extends Component {
  constructor(props) {
    super(props);

    if (!scriptAdded) {
      document.body.appendChild(scriptElement);
      scriptAdded = true;
    }
  }

  componentDidMount() {
    this._validateProps();

    if (window.Twitch && window.Twitch.Embed) {
      return this._createEmbed();
    }

    scriptElement.addEventListener('load', () => {
      this._createEmbed();
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this._validateProps();

    if (prevProps.withChat) {
      this.embed = null;
      this.player = null;
      document.getElementById(prevProps.id).innerHTML = '';
      return this._createEmbed();
    }

    const updatedPropsExceptChannel = Object.keys(prevProps).reduce((updated, prop) => {
      if (prop === 'channel') {
        return updated;
      }

      if (prevProps[prop] !== this.props[prop]) {
        updated.push(prop);
      }

      return updated;
    }, []);

    if (updatedPropsExceptChannel.length > 0) {
      this.embed = null;
      this.player = null;
      document.getElementById(prevProps.id).innerHTML = '';
      return this._createEmbed();
    }

    if (prevProps.channel !== this.props.channel) {
      this.player.setChannel(this.props.channel);
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
      this.player = this.embed.getPlayer();

      if (muted) {
        this.player.setVolume(0);
      }

      if (!autoplay) {
        this.player.pause();
      }

      this.props.onVideoReady(this.player);
    });
  }

  _validateProps() {
    if (!this.props.channel) {
      throw new Error('A channel prop must be supplied to TwitchEmbed!');
    }
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
  height: MEDIA_DEFAULT_HEIGHT,
  withChat: true,
  theme: 'light',
  width: MEDIA_DEFAULT_WIDTH,
  onAuthenticate: () => null,
  onVideoPlay: () => null,
  onVideoPause: () => null,
  onVideoReady: () => null,
  autoplay: true,
  muted: false
};

export default TwitchEmbed;
