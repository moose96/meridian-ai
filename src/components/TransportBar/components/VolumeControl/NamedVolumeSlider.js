import React from 'react';
// import { Typography } from '@material-ui/core';

import { ColumnBox } from '../../../Box';
import VolumeSlider from '../../../VolumeSlider';
import { GuideTooltip } from '../../../Guide';
import Typography from '../../../Typography';

export default function NamedVolumeSlider({ value, style, onChange }) {
  return (
    <ColumnBox style={style}>
      <Typography color="textPrimary" translated>
        Volume
      </Typography>
      <GuideTooltip frames={['play-volume']}>
        <VolumeSlider value={value} onChange={onChange} />
      </GuideTooltip>
    </ColumnBox>
  );
}
