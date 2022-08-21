/* eslint-disable react/no-multi-comp */
import React from 'react';
import { Story } from '@storybook/react';
import TwitchPlayer, { TwitchPlayerProps } from '../components/TwitchPlayer';
import { STORYBOOK_DEFAULTS } from '../constants';
import withNextMediaControls from './helpers/withNextMediaControls';

// TODO: Add component controlled player.
// TODO: Add stories for other media.

export default {
  title: 'TwitchPlayer',
  component: TwitchPlayer
};

const Template: Story<TwitchPlayerProps> = (args) => <TwitchPlayer {...args} />;

export const ChannelWithAutoplay = Template.bind({});
ChannelWithAutoplay.args = {
  channel: STORYBOOK_DEFAULTS.channel,
  autoplay: true
};

export const ChannelNoAutoplay = Template.bind({});
ChannelNoAutoplay.args = {
  channel: STORYBOOK_DEFAULTS.channel,
  autoplay: false
};

export const ChannelMuted = Template.bind({});
ChannelMuted.args = {
  channel: STORYBOOK_DEFAULTS.channel,
  muted: true
};

export const ChannelNotMuted = Template.bind({});
ChannelNotMuted.args = {
  channel: STORYBOOK_DEFAULTS.channel,
  muted: false
};

export const ChannelFullscreenAllowed = Template.bind({});
ChannelFullscreenAllowed.args = {
  channel: STORYBOOK_DEFAULTS.channel,
  allowFullscreen: true
};

export const ChannelFullscreenForbidden = Template.bind({});
ChannelFullscreenForbidden.args = {
  channel: STORYBOOK_DEFAULTS.channel,
  allowFullscreen: false
};

export const ChannelControlsVisible = Template.bind({});
ChannelControlsVisible.args = {
  channel: STORYBOOK_DEFAULTS.channel,
  hideControls: false
};

export const ChannelControlsHidden = Template.bind({});
ChannelControlsHidden.args = {
  channel: STORYBOOK_DEFAULTS.channel,
  hideControls: true
};

export const ChannelSmoothSwitching = withNextMediaControls(TwitchPlayer, 'channel', STORYBOOK_DEFAULTS.channels);
