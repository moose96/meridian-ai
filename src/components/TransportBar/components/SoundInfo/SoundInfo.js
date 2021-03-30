import React from 'react';
import { Typography } from '@material-ui/core';

import { RowBox } from '../../../Box';

export default function SoundInfo({ cover, title }) {
  if (title) {
    return (
      <RowBox alignItems="center">
        <div style={{ height: '4rem', width: '4rem', marginRight: '1rem' }}>
          <img src={cover} alt="cover" style={{ width: '100%', height: '100%' }} />
        </div>
        <Typography variant="h6" color="textPrimary">
          {title}
        </Typography>
      </RowBox>
    );
  }

  return null;
}