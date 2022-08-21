/* eslint-disable react/no-multi-comp */
import React, { Fragment } from 'react';
import { Story } from '@storybook/react';
import TwitchEmbed, { TwitchEmbedProps } from '../components/TwitchEmbed';
import { STORYBOOK_DEFAULTS } from '../constants';
import withNextMediaControls from './helpers/withNextMediaControls';
import withVideoControls from './helpers/withVideoControls';

export default {
  title: 'TwitchEmbed',
  component: TwitchEmbed
};

const Template: Story<TwitchEmbedProps> = (args) => <TwitchEmbed {...args} />;

export const LightModeWithChat = Template.bind({});
LightModeWithChat.args = {
  channel: STORYBOOK_DEFAULTS.channel,
  darkMode: false,
  withChat: true
};

export const LightModeNoChat = Template.bind({});
LightModeNoChat.args = {
  channel: STORYBOOK_DEFAULTS.channel,
  darkMode: false,
  withChat: false
};

export const DarkModeWithChat = Template.bind({});
DarkModeWithChat.args = {
  channel: STORYBOOK_DEFAULTS.channel,
  darkMode: true,
  withChat: true
};

export const DarkModeNoChat = Template.bind({});
DarkModeNoChat.args = {
  channel: STORYBOOK_DEFAULTS.channel,
  darkMode: true,
  withChat: false
};

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

export const MultipleEmbeds = () => {
  return (
    <Fragment>
      <TwitchEmbed channel={STORYBOOK_DEFAULTS.channel} parent={window.location.hostname} id="1" withChat darkMode />
      <TwitchEmbed channel={STORYBOOK_DEFAULTS.channel} parent={window.location.hostname} id="2" withChat darkMode={false} />
    </Fragment>
  );
};

export const ChannelSmoothSwitching = withNextMediaControls(TwitchEmbed, 'channel', STORYBOOK_DEFAULTS.channels);
export const VideosSmoothSwitching = withNextMediaControls(TwitchEmbed, 'video', STORYBOOK_DEFAULTS.videos);
export const CollectionsSmoothSwitching = withNextMediaControls(TwitchEmbed, 'collection', STORYBOOK_DEFAULTS.collections);
export const ControlledFromOutside = withVideoControls(TwitchEmbed, STORYBOOK_DEFAULTS.video, 'onVideoReady');
