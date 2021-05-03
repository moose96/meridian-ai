import React from 'react';
import { Typography, Box } from '@material-ui/core';

import { LandingContent, RowBox } from '../../../../components';

export default function NeuronLanding({ id }) {
  return (
    <LandingContent
      id={id}
      background={{ animated: true, image: '/img/neuron-4632883.jpg' }}
    >
      <RowBox alignItems="flex-end" height="100%">
        <Box width="30%" padding="2rem" style={{ zIndex: 2 }}>
          <Typography variant="h2" color="textPrimary" gutterBottom>
            O aplikacji
          </Typography>
          <Typography align="justify" color="textPrimary">
            Ta aplikacja, jak sugeruje jej nazwa - Meridian AI - korzysta z
            algorytmów optymalizujących, pseudo sztucznej inteligencji. Jej
            celem jest maksymalizacja przyjemności poprzez uwzględnianie reakcji
            odbiorcy.
          </Typography>
        </Box>
      </RowBox>
    </LandingContent>
  );
}
