import React from 'react';
import { KeyboardArrowDownRounded } from '@material-ui/icons';
import { Typography, Box } from '@material-ui/core';
import Typist from 'react-typist';

import {
  LandingContent,
  PrimaryButton,
  SecondaryButton,
  ColumnBox,
} from '../../../../components';

export default function MainLanding({ id, onRunApp, onGoNext }) {
  return (
    <LandingContent id={id} style={{ marginTop: '4rem' }}>
      {/* <Box bgcolor="black" style={{ filter: 'blur(2px)', zIndex: 1 }}>
        {/* <video height="100%">
          {/*muted autoPlay loop
          <source src="/vid/main.webm" type="video/webm" />
        </video>
      </Box> */}
      <ColumnBox
        style={{
          height: '100%',
          position: 'absolute',
          left: 0,
          top: 0,
          right: 0,
          zIndex: 2,
          padding: '1rem',
          backgroundColor: 'black',
        }}
      >
        <ColumnBox
          width="100%"
          alignItems="center"
          justifyContent="space-around"
          flex={2}
        >
          <Typography
            variant="h1"
            color="textPrimary"
            style={{ textShadow: '0 0 12px white' }}
          >
            Meridian AI
          </Typography>
          <Typography variant="subtitle1" color="textPrimary">
            <Typist cursor={{ show: false }}>
              <span>Inteligentna, </span>
              <Typist.Delay ms={500} />
              <span>generatywna...</span>
              <Typist.Backspace count={3} delay={500} />
              <Typist.Delay ms={500} />
              <span> aplikacja stworzona w celu osiągnięcia </span>
              <span style={{ letterSpacing: '0.1rem' }}>relaksu</span>
              <span> i </span>
              <span style={{ letterSpacing: '0.1rem' }}>spokoju</span>
              <span>.</span>
            </Typist>
          </Typography>
        </ColumnBox>
        <ColumnBox
          width="100%"
          alignItems="center"
          justifyContent="center"
          flex={1}
        >
          <PrimaryButton onClick={onRunApp}>Uruchom aplikację</PrimaryButton>
          <SecondaryButton onClick={onGoNext}>
            <KeyboardArrowDownRounded />
          </SecondaryButton>
        </ColumnBox>
      </ColumnBox>
    </LandingContent>
  );
}
