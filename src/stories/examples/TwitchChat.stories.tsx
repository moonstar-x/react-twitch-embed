import React from 'react';
import { Story } from '@storybook/react';
import TwitchChat, { TwitchChatProps } from '../../components/TwitchChat';
import { STORYBOOK_DEFAULTS } from '../../constants';

export default {
  title: 'Examples/TwitchChat',
  component: TwitchChat
};

const Template: Story<TwitchChatProps> = (args) => <TwitchChat {...args} />;

export const LightMode = Template.bind({});
LightMode.args = {
  channel: STORYBOOK_DEFAULTS.channel,
  darkMode: false
};

export const DarkMode = Template.bind({});
DarkMode.args = {
  channel: STORYBOOK_DEFAULTS.channel,
  darkMode: true
};
