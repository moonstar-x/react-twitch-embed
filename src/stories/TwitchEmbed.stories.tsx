/* eslint-disable react/no-multi-comp */
import React, { Fragment, useState } from 'react';
import { Story } from '@storybook/react';
import TwitchEmbed, { TwitchEmbedProps } from '../components/TwitchEmbed';
import { STORYBOOK_DEFAULTS } from '../constants';

// TODO: Add component controlled player.

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

export const SmoothChannelSwitching = () => {
  const channels = [STORYBOOK_DEFAULTS.channel, 'LCS', 'ibai'];
  const [index, setIndex] = useState<number>(0);
  const channel = channels[index];

  const handlePrevious = () => {
    setIndex((index - 1) % channels.length);
  };

  const handleNext = () => {
    setIndex((index + 1) % channels.length);
  };

  const style = {
    margin: '1rem',
    fontSize: '1.3em'
  };

  return (
    <Fragment>
      <TwitchEmbed channel={channel} id="twitch-embed" />
      <div style={{ margin: '1rem 3rem' }}>
        <button style={style} onClick={handlePrevious}>Previous</button>
        <span style={style}>Current channel: {channel}</span>
        <button style={style} onClick={handleNext}>Next</button>
      </div>
    </Fragment>
  );
};
