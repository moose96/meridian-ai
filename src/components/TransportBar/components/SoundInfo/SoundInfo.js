import React from 'react';
import { Grid, Typography } from '@material-ui/core';

export default function SoundInfo({ cover, title }) {
  if (title) {
    return (
      <Grid container spacing={2}>
        <Grid item xs={6}>
          {/* <img style={{ width: '25%', height: '25%', objectFit: 'cover' }} src={cover} alt="cover" /> */}
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6">
            {title}
          </Typography>
        </Grid>
      </Grid>
    );
  }

  return null;
}