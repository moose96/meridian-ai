import React from 'react';
import { Stop } from '@material-ui/icons';

import { SecondaryButton } from '../../../Button';

export default function StopDemoButton(props) {
  return (
    <SecondaryButton {...props}>
      <Stop />
      Stop demo
    </SecondaryButton>
  );
}