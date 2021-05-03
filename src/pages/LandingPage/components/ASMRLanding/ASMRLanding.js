import React from 'react';
import { Typography } from '@material-ui/core';

import { LandingContent } from '../../../../components';

export default function ASMRLanding({ id }) {
  return (
    <LandingContent
      id={id}
      background={{ animated: true, image: '/img/ear-3971050.jpg' }}
    >
      <LandingContent.Shaped
        float="right"
        shape="polygon(31% 0, 16% 90%, 75% 80%,95% 45%)"
      >
        <Typography variant="h2" color="textPrimary" gutterBottom>
          ASMR
        </Typography>
        <Typography
          variant="h4"
          color="textPrimary"
          gutterBottom
          align="justify"
        >
          Autonomous Sensory Meridian Response
        </Typography>
        <Typography color="textPrimary" paragraph align="justify">
          ASMR to zjawisko przyjemnego mrowienia w okolicach głowy, szyi i
          innych obszarach ludzkiego ciała. Może zostać wywołane poprzez
          wizualne, słuchowe, dotykowe i zapachowe bodźce zewnętrzne. Czasami
          określane jest również jako orgazm mózgu ze względu na podobne
          zamknięcie obszarów mózgu odpowiedzialnych za stres.
        </Typography>
      </LandingContent.Shaped>
    </LandingContent>
  );
}
