import React from 'react';
import { Grid, Typography } from '@material-ui/core';

export default function SoundInfo({ cover, title }) {
  if (title) {
    return (
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <img src={cover} alt="cover" />
        </Grid>
        <Grid item xs={9}>
          <Typography variant="h6">
            {title}
          </Typography>
        </Grid>
      </Grid>
    );
  }

  return null;
}