import React, { useMemo } from 'react';
import { Typography } from '@material-ui/core';

import { LandingContent } from '../../../../components';
import { useScrollableElement } from '../../../../hooks';
import useIsNarrow from '../../hooks';

const POLYGONS = {
  normal: [
    'polygon(35% 0%, 100% 50%, 35% 100%)',
    'polygon(0% 50%, 65% 0%, 65% 100%)',
  ],
  narrow: [
    'polygon(0% 0%, 50% 50%, 0% 100%)',
    'polygon(50% 50%, 100% 0%, 100% 100%)',
  ],
};

export default function GenerateLanding({ id }) {
  const { isVisible, ref } = useScrollableElement();
  const isNarrow = useIsNarrow();

  const background = useMemo(
    () => ({ animated: true, image: '/img/fractal-18485.jpg' }),
    []
  );

  const shapes = useMemo(
    () => [
      {
        float: 'left',
        shape: POLYGONS[isNarrow ? 'narrow' : 'normal'][0],
      },
      {
        float: 'right',
        shape: POLYGONS[isNarrow ? 'narrow' : 'normal'][1],
      },
    ],
    [isNarrow]
  );

  return (
    <LandingContent ref={ref} id={id} background={background}>
      <LandingContent.Shaped shapes={shapes}>
        <LandingContent.Animated
          from="left"
          variant={isVisible ? 'show' : 'hidden'}
        >
          <Typography align="justify" color="textPrimary">
            Aplikacja generuje ciąg specyficznych warstw dźwiękowych, które
            przeplatają się między sobą w kreatywny i kompozycyjnie harmonijny
            sposób. Warstwy przypomniają dźwięki znane z filmów ASMR ale
            dostępne są również te bardziej abstrakcyjne, przetworzone lub
            takie, które przypominają relaksacyjną muzykę.
          </Typography>
        </LandingContent.Animated>
        <LandingContent.Animated
          from="right"
          variant={isVisible ? 'show' : 'hidden'}
        >
          <Typography align="justify" color="textPrimary">
            Generacja dźwiękowych warstw opiera się na interaktywnej manipulacji
            krótkimi fragmentami. Każda warstwa ma przypisane parametry takie
            jak m.in. długość, intensywność, zagęszczenie, barwa i charakter,
            które ulegają zmianie w trakcie trwania symulacji.
          </Typography>
        </LandingContent.Animated>
      </LandingContent.Shaped>
    </LandingContent>
  );
}
