import React from 'react';
import { Typography, Box } from '@material-ui/core';

import { LandingContent } from '../../../../components';

const shapeStyle = {
  width: '50%',
  height: '50%',
};

export default function GenerateLanding({ id }) {
  return (
    <LandingContent
      id={id}
      background={{ animated: true, image: '/img/fractal-18485.jpg' }}
    >
      <Box
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          right: 0,
          height: '100%',
          zIndex: 2,
          padding: '2rem',
        }}
      >
        <div
          style={{
            ...shapeStyle,
            float: 'left',
            shapeOutside: 'polygon(25% 0%, 100% 50%, 25% 100%)',
          }}
        />
        <div
          style={{
            ...shapeStyle,
            float: 'right',
            shapeOutside: 'polygon(50% 50%, 75% 0%, 75% 100%)',
          }}
        />
        <Typography align="justify" color="textPrimary">
          Aplikacja generuje ciąg specyficznych warstw dźwiękowych, które
          przeplatają się między sobą w kreatywny i kompozycyjnie harmonijny
          sposób. Warstwy przypomniają dźwięki znane z filmów ASMR ale dostępne
          są również te bardziej abstrakcyjne, przetworzone lub takie, które
          przypominają relaksacyjną muzykę.
        </Typography>
        <Typography align="justify" color="textPrimary">
          Generacja dźwiękowych warstw opiera się na interaktywnej manipulacji
          krótkimi fragmentami. Każda warstwa ma przypisane parametry takie jak
          m.in. długość, intensywność, zagęszczenie, barwa i charakter, które
          ulegają zmianie w trakcie trwania symulacji.
        </Typography>
      </Box>
    </LandingContent>
  );
}
