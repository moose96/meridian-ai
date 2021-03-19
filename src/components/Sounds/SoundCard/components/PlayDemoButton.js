import React from 'react';
import { PlayArrow } from '@material-ui/icons';

import { SecondaryButton } from '../../../Button';

export default function PlayDemoButton(props) {
  return (
    <SecondaryButton {...props}>
      <PlayArrow />
      Play demo
    </SecondaryButton>
  );
}