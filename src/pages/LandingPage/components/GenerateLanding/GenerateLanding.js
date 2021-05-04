import React from 'react';
import { Typography } from '@material-ui/core';

import { LandingContent } from '../../../../components';

export default function GenerateLanding({ id }) {
  return (
    <LandingContent
      id={id}
      background={{ animated: true, image: '/img/fractal-18485.jpg' }}
    >
      <LandingContent.Shaped
        shapes={[
          {
            float: 'left',
            shape: 'polygon(35% 0%, 100% 50%, 35% 100%)',
          },
          {
            float: 'right',
            shape: 'polygon(0% 50%, 65% 0%, 65% 100%)',
          },
        ]}
      >
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
      </LandingContent.Shaped>
    </LandingContent>
  );
}
