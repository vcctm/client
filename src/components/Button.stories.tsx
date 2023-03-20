import { Story, Meta } from '@storybook/react';
import { Button, Props } from './Button';

export default {
  title: 'Button',
  component: Button,
  argTypes: {
    children: {
      type: 'string',
    },
  },
} as Meta<Props>;

export const Default: Story<Props> = (args) => <Button {...args} />;
