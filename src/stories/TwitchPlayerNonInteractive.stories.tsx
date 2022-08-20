import React from 'react';
import { Story } from '@storybook/react';
import TwitchPlayerNonInteractive, { TwitchPlayerNonInteractiveProps } from '../components/TwitchPlayerNonInteractive';
import { STORYBOOK_DEFAULTS } from '../constants';

// TODO: Add stories for other media.

export default {
  title: 'TwitchPlayerNonInteractive',
  component: TwitchPlayerNonInteractive
};

const Template: Story<TwitchPlayerNonInteractiveProps> = (args) => <TwitchPlayerNonInteractive {...args} />;

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
