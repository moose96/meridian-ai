import React from 'react';
import { Meta } from '@storybook/react';
import Button from '@material-ui/core/Button';

const meta = {
  title: 'Button',
  component: Button
};

export default meta;

export const Primary = () => <Button variant="contained" color="primary">Primary</Button>;
export const Secondary = () => <Button variant="text" color="default">Secondary</Button>;