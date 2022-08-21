/* eslint-disable react/no-multi-comp */
import React, { Fragment } from 'react';
import { Story } from '@storybook/react';
import TwitchEmbed, { TwitchEmbedProps } from '../components/TwitchEmbed';
import { STORYBOOK_DEFAULTS } from '../constants';
import withNextMediaControls from './helpers/withNextMediaControls';

// TODO: Add component controlled player.
// TODO: Add stories for other media.

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
  channel: STORYBOOK_DEFAULTS.channel,
  autoplay: true
};

export const NoAutoplay = Template.bind({});
NoAutoplay.args = {
  channel: STORYBOOK_DEFAULTS.channel,
  autoplay: false
};

export const Muted = Template.bind({});
Muted.args = {
  channel: STORYBOOK_DEFAULTS.channel,
  muted: true
};

export const NotMuted = Template.bind({});
NotMuted.args = {
  channel: STORYBOOK_DEFAULTS.channel,
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

export const MultipleEmbeds = () => {
  return (
    <Fragment>
      <TwitchEmbed channel={STORYBOOK_DEFAULTS.channel} parent={window.location.hostname} id="1" withChat darkMode />
      <TwitchEmbed channel={STORYBOOK_DEFAULTS.channel} parent={window.location.hostname} id="2" withChat darkMode={false} />
    </Fragment>
  );
};

export const ChannelSmoothSwitching = withNextMediaControls(TwitchEmbed, 'channel', STORYBOOK_DEFAULTS.channels);
