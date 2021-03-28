import React from 'react';
import { Grid, Typography, Slider } from '@material-ui/core';
import { VolumeDown, VolumeUp } from '@material-ui/icons';

import { ColumnBox } from '../../../Box';

export default function VolumeSlider({ value, onChange }) {
  return (
    <ColumnBox>
      <Typography color="textPrimary">
        Volume
      </Typography>
      <Grid container spacing={2}>
        <Grid item>
          <VolumeDown color="action"/>
        </Grid>
        <Grid item xs>
          <Slider
            min={0.0}
            max={1.0}
            step={0.01}
            value={value}
            onChange={onChange}
          />
        </Grid>
        <Grid item>
          <VolumeUp color="action"/>
        </Grid>
      </Grid>
    </ColumnBox>
  );
}