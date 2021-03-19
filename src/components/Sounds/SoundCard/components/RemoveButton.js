import React from 'react';
import { Remove } from '@material-ui/icons';

import { SecondaryButton } from '../../../Button';

export default function RemoveButton(props) {
  return (
    <SecondaryButton {...props}>
      <Remove />
      Remove from playlist
    </SecondaryButton>
  );
}