import React from 'react';

import Navigation, { NavItem } from '../components/Navigation';

const meta = {
  title: 'Navigation',
  component: Navigation
}

export default meta;

export const Primary = (args) => (
  <Navigation {...args}>
    <NavItem label="Browse" />
    <NavItem label="Play!" />
  </Navigation>
);
Primary.args = {
  value: 1
}