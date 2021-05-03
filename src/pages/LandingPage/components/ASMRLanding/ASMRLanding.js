import React from 'react';
import { Typography, Box } from '@material-ui/core';

import { LandingContent, RowBox, ColumnBox } from '../../../../components';

export default function ASMRLanding({ id }) {
  return (
    <LandingContent id={id}>
      <img
        src="/img/ear-3971050.jpg"
        alt=""
        style={{
          width: '100%',
          height: '100%',
          zIndex: 1,
          position: 'absolute',
          left: 0,
          top: 0,
          transform: 'scale(1.05)',
        }}
      />
      <RowBox
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          right: 0,
          height: '100%',
          zIndex: 2,
        }}
      >
        {/* <Box flex={1}>
          <img
            src="/img/ear-3971050.jpg"
            alt=""
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        </Box> */}
        <Box
          style={{
            padding: '2rem',
          }}
        >
          <div
            style={{
              float: 'right',
              shapeOutside: 'polygon(31% 0, 16% 90%, 75% 80%,95% 45%)',
              width: '100%',
              height: '100%',
            }}
          ></div>
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
            zamknięcie obszarów mózgu odpowiedzialnych za stres.{' '}
          </Typography>
        </Box>
      </RowBox>
    </LandingContent>
  );
}
