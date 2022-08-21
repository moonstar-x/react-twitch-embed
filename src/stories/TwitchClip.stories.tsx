import React from 'react';
import { Story } from '@storybook/react';
import TwitchClip, { TwitchClipProps } from '../components/TwitchClip';
import { STORYBOOK_DEFAULTS } from '../constants';

export default {
  title: 'TwitchClip',
  component: TwitchClip
};

const Template: Story<TwitchClipProps> = (args) => <TwitchClip {...args} />;

export const WithAutoplay = Template.bind({});
WithAutoplay.args = {
  clip: STORYBOOK_DEFAULTS.clips[0],
  autoplay: true
};

export const NoAutoplay = Template.bind({});
NoAutoplay.args = {
  clip: STORYBOOK_DEFAULTS.clips[0],
  autoplay: false
};

export const Muted = Template.bind({});
Muted.args = {
  clip: STORYBOOK_DEFAULTS.clips[1],
  muted: true
};

export const NotMuted = Template.bind({});
NotMuted.args = {
  clip: STORYBOOK_DEFAULTS.clips[1],
  muted: false
};
