import React, { useMemo } from 'react';
import { Typography } from '@material-ui/core';

import { LandingContent } from '../../../../components';
import { useScrollableElement } from '../../../../hooks';
import useIsNarrow from '../../hooks';

const POLYGONS = {
  normal: 'polygon(0% 0%, 55% 0%, 70% 35%, 60% 100%)',
  narrow: 'polygon(0% 0%, 35% 0%, 50% 35%, 40% 100%)',
};

export default function EffectsLanding({ id }) {
  const { isVisible, ref } = useScrollableElement();
  const isNarrow = useIsNarrow();

  const background = useMemo(
    () => ({
      animated: true,
      image: '/img/white-4557097.jpg',
    }),
    []
  );

  const shapes = useMemo(
    () => [
      {
        float: 'left',
        shape: POLYGONS[isNarrow ? 'narrow' : 'normal'],
      },
    ],
    [isNarrow]
  );

  return (
    <LandingContent ref={ref} id={id} background={background}>
      <LandingContent.Shaped shapes={shapes}>
        <LandingContent.Animated
          from="right"
          variant={isVisible ? 'show' : 'hidden'}
        >
          <Typography align="justify">
            Obecnie ASMR jest jednym z najchętniej oglądanych rodzajów filmów na
            platformie YouTube. Zazwyczaj osoby tworzące takie filmy korzystają
            ze swojego głosu, szeptu, stukania, skrobania, pocierania różnych
            przedmiotów by stworzyć delikatną, bogatą w transienty warstwę
            dźwiękową. Oprócz tego istnieje praktycznie każdy rodzaj dźwięków
            tam użyty, od miauczenia małego kotka, krojenie mydła w kostki, po
            mlaskanie osoby jedzącej ośmiornice.
          </Typography>
        </LandingContent.Animated>
      </LandingContent.Shaped>
    </LandingContent>
  );
}
