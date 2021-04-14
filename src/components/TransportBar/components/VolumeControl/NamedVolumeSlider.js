import React from 'react';
import { Typography } from '@material-ui/core';

import { ColumnBox } from '../../../Box';
import VolumeSlider from '../../../VolumeSlider';

export default function NamedVolumeSlider({ value, style, onChange }) {
  return (
    <ColumnBox style={style}>
      <Typography color="textPrimary">Volume</Typography>
      <VolumeSlider value={value} onChange={onChange} />
    </ColumnBox>
  );
}
