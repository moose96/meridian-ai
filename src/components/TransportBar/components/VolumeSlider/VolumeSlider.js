import React from 'react';
import { Grid, Typography, Slider } from '@material-ui/core';
import { VolumeDown, VolumeUp } from '@material-ui/icons';

import { ColumnBox } from '../../../Box';

export default function VolumeSlider() {
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
          <Slider />
        </Grid>
        <Grid item>
          <VolumeUp color="action"/>
        </Grid>
      </Grid>
    </ColumnBox>
  );
}