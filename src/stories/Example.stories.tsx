import React from 'react';
import { Story } from '@storybook/react';
import Example, { ExampleProps } from '../components/Example';

export default {
  title: 'Example',
  component: Example
};

const Template: Story<ExampleProps> = (args) => <Example {...args} />;

export const SampleText = Template.bind({});
SampleText.args = {
  text: 'Sample Text'
};
