import React from 'react';
import { Story } from '@storybook/react';
import TwitchPlayerNonInteractive, { TwitchPlayerNonInteractiveProps } from '../components/TwitchPlayerNonInteractive';
import { STORYBOOK_DEFAULTS } from '../constants';

export default {
  title: 'TwitchPlayerNonInteractive',
  component: TwitchPlayerNonInteractive
};

const Template: Story<TwitchPlayerNonInteractiveProps> = (args) => <TwitchPlayerNonInteractive {...args} />;

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

export const Channel = Template.bind({});
Channel.args = {
  channel: STORYBOOK_DEFAULTS.channel
};

export const Video = Template.bind({});
Video.args = {
  video: STORYBOOK_DEFAULTS.video
};

export const Collection = Template.bind({});
Collection.args = {
  collection: STORYBOOK_DEFAULTS.collection
};

export const CollectionWithInitialVideo = Template.bind({});
CollectionWithInitialVideo.args = {
  video: STORYBOOK_DEFAULTS.videoInCollection,
  collection: STORYBOOK_DEFAULTS.collection
};
