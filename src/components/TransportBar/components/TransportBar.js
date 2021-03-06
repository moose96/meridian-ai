import React from 'react';
import Grid from '@material-ui/core/Grid';

import TransportBarWrapper from '../styled/TransportBarWrapper';
import { TransportButton } from '../../Button';

export default function TransportBar() {
  return (
    <TransportBarWrapper container spacing={1}>
      <Grid item>
        <TransportButton type="prev" />
      </Grid>
      <Grid item>
        <TransportButton type="play" />
      </Grid>
      <Grid item>
        <TransportButton type="next" />
      </Grid>
    </TransportBarWrapper>
  )
}