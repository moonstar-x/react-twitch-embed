import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TWITCH_PLAYER_URL, MEDIA_DEFAULT_WIDTH, MEDIA_DEFAULT_HEIGHT } from '../constants';

const mediaProps = ['channel', 'collection', 'video'];
let scriptElement = null;

const loadScript = () => {
  scriptElement = document.createElement('script');
  scriptElement.setAttribute('type', 'text/javascript');
  scriptElement.setAttribute('src', TWITCH_PLAYER_URL);
  document.body.appendChild(scriptElement);
};

const propTypes = {
  id: PropTypes.string,
  channel: PropTypes.string,
  collection: PropTypes.string,
  video: PropTypes.string,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  playsInline: PropTypes.bool,
  autoplay: PropTypes.bool,
  muted: PropTypes.bool,
  allowFullscreen: PropTypes.bool,
  time: PropTypes.string,
  hideControls: PropTypes.bool,
  onEnded: PropTypes.func,
  onPause: PropTypes.func,
  onPlay: PropTypes.func,
  onPlaybackBlocked: PropTypes.func,
  onPlaying: PropTypes.func,
  onOffline: PropTypes.func,
  onOnline: PropTypes.func,
  onReady: PropTypes.func,
  parent: PropTypes.arrayOf(PropTypes.string)
};

const defaultProps = {
  id: 'twitch-player-embed',
  channel: null,
  collection: null,
  video: null,
  height: MEDIA_DEFAULT_HEIGHT,
  width: MEDIA_DEFAULT_WIDTH,
  playsInline: true,
  autoplay: true,
  muted: false,
  allowFullscreen: true,
  time: '0h0m0s',
  hideControls: false,
  onEnded: () => null,
  onPause: () => null,
  onPlay: () => null,
  onPlaybackBlocked: () => null,
  onPlaying: () => null,
  onOffline: () => null,
  onOnline: () => null,
  onReady: () => null,
  parent: []
};

class TwitchPlayer extends Component {
  componentDidMount() {
    this._validateProps();

    if (window.Twitch && window.Twitch.Player) {
      return this._createPlayer();
    }

    if (!scriptElement) {
      loadScript();
    }

    scriptElement.addEventListener('load', () => {
      this._createPlayer();
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this._validateProps();

    const updatedPropsExceptMedia = Object.keys(prevProps).reduce((updated, prop) => {
      if (mediaProps.includes(prop)) {
        return updated;
      }

      if (prevProps[prop] !== this.props[prop]) {
        updated.push(prop);
      }
      return updated;
    }, []);

    if (updatedPropsExceptMedia.length > 0) {
      this.player = null;
      document.getElementById(prevProps.id).innerHTML = '';
      return this._createPlayer();
    }

    if (prevProps.channel !== this.props.channel && this.props.channel) {
      return this.player.setChannel(this.props.channel);
    }

    if (prevProps.collection !== this.props.collection && this.props.collection) {
      this.player.setCollection(this.props.collection);
    }

    if (prevProps.video !== this.props.video && this.props.video) {
      this.player.setVideo(`v${this.props.video}`);
    }
  }

  _createPlayer() {
    const options = {
      height: '100%',
      width: '100%',
      playsinline: this.props.playsInline,
      allowfullscreen: this.props.allowFullscreen,
      autoplay: this.props.autoplay,
      muted: this.props.muted,
      time: this.props.time,
      controls: !this.props.hideControls,
      parent: this.props.parent
    };

    if (this.props.channel) {
      options.channel = this.props.channel;
    }

    if (this.props.video) {
      options.video = this.props.video;
    }

    if (this.props.collection) {
      options.collection = this.props.collection;
    }

    this.player = new window.Twitch.Player(this.props.id, options);
    this._addEventListeners();
  }

  _addEventListeners() {
    this.player.addEventListener(window.Twitch.Player.ENDED, this.props.onEnded);
    this.player.addEventListener(window.Twitch.Player.PAUSE, this.props.onPause);
    this.player.addEventListener(window.Twitch.Player.PLAY, this.props.onPlay);
    this.player.addEventListener(window.Twitch.Player.PLAYBACK_BLOCKED, this.props.onPlaybackBlocked);
    this.player.addEventListener(window.Twitch.Player.PLAYING, this.props.onPlaying);
    this.player.addEventListener(window.Twitch.Player.OFFLINE, this.props.onOffline);
    this.player.addEventListener(window.Twitch.Player.ONLINE, this.props.onOnline);
    this.player.addEventListener(window.Twitch.Player.READY, () => {
      this.props.onReady(this.player);
    });
  }

  _validateProps() {
    const { channel, collection, video } = this.props;

    if (!channel && !collection && !video) {
      throw new Error('A channel, collection or video prop must be supplied to TwitchPlayer!');
    }
  }

  render() {
    const unknownProps = Object.keys(this.props).reduce((unknown, prop) => {
      if (propTypes.hasOwnProperty(prop)) {
        return unknown;
      }

      unknown[prop] = this.props[prop];
      return unknown;
    }, {});

    return (
      <div id={this.props.id} style={{ width: this.props.width, height: this.props.height }} {...unknownProps} />
    );
  }
}

TwitchPlayer.propTypes = propTypes;
TwitchPlayer.defaultProps = defaultProps;

export default TwitchPlayer;
