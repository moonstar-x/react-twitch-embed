import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TWITCH_PLAYER_URL } from '../constants';

const mediaProps = ['channel', 'collection', 'video'];

class TwitchPlayer extends Component {
  componentDidMount() {
    this._validateProps();

    if (window.Twitch && window.Twitch.Player) {
      return this._createPlayer();
    }

    const scriptElement = document.createElement('script');
    scriptElement.setAttribute('src', TWITCH_PLAYER_URL);

    scriptElement.addEventListener('load', () => {
      this._createPlayer();
    });

    document.body.appendChild(scriptElement);
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
      height: this.props.height,
      width: this.props.width,
      playsinline: this.props.playsInline,
      allowfullscreen: this.props.allowFullscreen,
      autoplay: this.props.autoplay,
      muted: this.props.muted,
      time: this.props.time
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
    const { id, width, height } = this.props;

    return (
      <div id={id} style={{ width, height }} />
    );
  }
}

TwitchPlayer.propTypes = {
  id: PropTypes.string,
  channel: PropTypes.string,
  collection: PropTypes.string,
  video: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number,
  playsInline: PropTypes.bool,
  autoplay: PropTypes.bool,
  muted: PropTypes.bool,
  allowFullscreen: PropTypes.bool,
  time: PropTypes.string,
  onEnded: PropTypes.func,
  onPause: PropTypes.func,
  onPlay: PropTypes.func,
  onPlaybackBlocked: PropTypes.func,
  onPlaying: PropTypes.func,
  onOffline: PropTypes.func,
  onOnline: PropTypes.func,
  onReady: PropTypes.func
};

TwitchPlayer.defaultProps = {
  id: 'twitch-player-embed',
  channel: null,
  collection: null,
  video: null,
  height: 480,
  width: 940,
  playsInline: true,
  autoplay: true,
  muted: false,
  allowFullscreen: true,
  time: '0h0m0s',
  onEnded: () => null,
  onPause: () => null,
  onPlay: () => null,
  onPlaybackBlocked: () => null,
  onPlaying: () => null,
  onOffline: () => null,
  onOnline: () => null,
  onReady: () => null
};

export default TwitchPlayer;
