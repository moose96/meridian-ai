import React from 'react';
import { Add } from '@material-ui/icons';

import { PrimaryButton } from '../../../Button';

export default function AddButton(props) {
  return (
    <PrimaryButton {...props}>
      <Add />
      Add to playlist
    </PrimaryButton>
  );
}