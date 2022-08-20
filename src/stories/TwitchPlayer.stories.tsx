/* eslint-disable react/no-multi-comp */
import React, { Fragment, useState } from 'react';
import { Story } from '@storybook/react';
import TwitchPlayer, { TwitchPlayerProps } from '../components/TwitchPlayer';
import { STORYBOOK_DEFAULTS } from '../constants';

// TODO: Add component controlled player.

export default {
  title: 'TwitchPlayer',
  component: TwitchPlayer
};

const Template: Story<TwitchPlayerProps> = (args) => <TwitchPlayer {...args} />;

export const ChannelWithAutoplay = Template.bind({});
ChannelWithAutoplay.args = {
  channel: STORYBOOK_DEFAULTS.channel,
  id: STORYBOOK_DEFAULTS.channel,
  autoplay: true
};

export const ChannelNoAutoplay = Template.bind({});
ChannelNoAutoplay.args = {
  channel: STORYBOOK_DEFAULTS.channel,
  id: STORYBOOK_DEFAULTS.channel,
  autoplay: false
};

export const ChannelMuted = Template.bind({});
ChannelMuted.args = {
  channel: STORYBOOK_DEFAULTS.channel,
  id: STORYBOOK_DEFAULTS.channel,
  muted: true
};

export const ChannelNotMuted = Template.bind({});
ChannelNotMuted.args = {
  channel: STORYBOOK_DEFAULTS.channel,
  id: STORYBOOK_DEFAULTS.channel,
  muted: false
};

export const ChannelSmoothSwitching = () => {
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
      <TwitchPlayer channel={channel} id="twitch-embed" />
      <div style={{ margin: '1rem 3rem' }}>
        <button style={style} onClick={handlePrevious}>Previous</button>
        <span style={style}>Current channel: {channel}</span>
        <button style={style} onClick={handleNext}>Next</button>
      </div>
    </Fragment>
  );
};
