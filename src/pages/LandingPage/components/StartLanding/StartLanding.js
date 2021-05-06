import React from 'react';
import { Typography, Box } from '@material-ui/core';

import {
  LandingContent,
  ColumnBox,
  PrimaryButton,
} from '../../../../components';

export default function GenerateLanding({ id, onRunApp }) {
  return (
    <LandingContent
      id={id}
      background={{ animated: true, image: '/img/music-5190768.jpg' }}
    >
      <ColumnBox
        justifyContent="center"
        zIndex="2"
        height="100%"
        padding="1rem"
      >
        <ColumnBox zIndex="1" width="40%" alignItems="center">
          <Typography variant="h5" gutterBottom>
            Przekonaj się sam i uruchom teraz aplikację!
          </Typography>
          <PrimaryButton onClick={onRunApp} zIndex="1">
            Uruchom teraz!
          </PrimaryButton>
        </ColumnBox>
      </ColumnBox>
    </LandingContent>
  );
}
