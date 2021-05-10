import React, { useMemo } from 'react';
import { Typography } from '@material-ui/core';

import {
  LandingContent,
  ColumnBox,
  PrimaryButton,
} from '../../../../components';

export default function StartLanding({ id, onRunApp }) {
  const background = useMemo(
    () => ({ animated: true, image: '/img/music-5190768.jpg' }),
    []
  );
  const buttonStyle = useMemo(() => ({ zIndex: 2 }), []);

  return (
    <LandingContent id={id} background={background}>
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
          <PrimaryButton onClick={onRunApp} style={buttonStyle}>
            Uruchom teraz!
          </PrimaryButton>
        </ColumnBox>
      </ColumnBox>
    </LandingContent>
  );
}
