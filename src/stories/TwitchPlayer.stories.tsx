/* eslint-disable react/no-multi-comp */
import React from 'react';
import { Story } from '@storybook/react';
import TwitchPlayer, { TwitchPlayerProps } from '../components/TwitchPlayer';
import { STORYBOOK_DEFAULTS } from '../constants';
import withNextMediaControls from './helpers/withNextMediaControls';
import withVideoControls from './helpers/withVideoControls';

export default {
  title: 'TwitchPlayer',
  component: TwitchPlayer
};

const Template: Story<TwitchPlayerProps> = (args) => <TwitchPlayer {...args} />;

export const WithAutoplay = Template.bind({});
WithAutoplay.args = {
  video: STORYBOOK_DEFAULTS.video,
  autoplay: true
};

export const NoAutoplay = Template.bind({});
NoAutoplay.args = {
  video: STORYBOOK_DEFAULTS.video,
  autoplay: false
};

export const Muted = Template.bind({});
Muted.args = {
  video: STORYBOOK_DEFAULTS.video,
  muted: true
};

export const NotMuted = Template.bind({});
NotMuted.args = {
  video: STORYBOOK_DEFAULTS.video,
  muted: false
};

export const FullscreenAllowed = Template.bind({});
FullscreenAllowed.args = {
  channel: STORYBOOK_DEFAULTS.channel,
  allowFullscreen: true
};

export const FullscreenForbidden = Template.bind({});
FullscreenForbidden.args = {
  channel: STORYBOOK_DEFAULTS.channel,
  allowFullscreen: false
};

export const ControlsVisible = Template.bind({});
ControlsVisible.args = {
  channel: STORYBOOK_DEFAULTS.channel,
  hideControls: false
};

export const ControlsHidden = Template.bind({});
ControlsHidden.args = {
  channel: STORYBOOK_DEFAULTS.channel,
  hideControls: true
};

export const CollectionWithInitialVideo = Template.bind({});
CollectionWithInitialVideo.args = {
  video: STORYBOOK_DEFAULTS.videoInCollection,
  collection: STORYBOOK_DEFAULTS.collection
};

export const ChannelSmoothSwitching = withNextMediaControls(TwitchPlayer, 'channel', STORYBOOK_DEFAULTS.channels);
export const VideosSmoothSwitching = withNextMediaControls(TwitchPlayer, 'video', STORYBOOK_DEFAULTS.videos);
export const CollectionsSmoothSwitching = withNextMediaControls(TwitchPlayer, 'collection', STORYBOOK_DEFAULTS.collections);
export const ControlledFromOutside = withVideoControls(TwitchPlayer, STORYBOOK_DEFAULTS.video);
