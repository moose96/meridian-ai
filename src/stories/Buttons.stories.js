import React from 'react';

import {
  PrimaryButton,
  SecondaryButton,
  RoundedButton,
  TransportButton,
  ASMRButton,
  SnapshotButton
} from '../components/Button';

const meta = {
  title: 'Button'
};

export default meta;


export const Primary = () => <PrimaryButton>Primary</PrimaryButton>;
export const Secondary = () => <SecondaryButton>Secondary</SecondaryButton>;
export const Rounded = () => <RoundedButton>P</RoundedButton>;
export const Transport = (args) => <TransportButton {...args}/>;
Transport.args = {
  type: 'play'
}

export const ASMR = () => <ASMRButton />;
export const Snapshot = (args) => <SnapshotButton {...args}>1</SnapshotButton>;
Snapshot.args = {
  value: '1',
  selected: false,
  filled: false
}