import React from 'react';
import { Typography } from '@material-ui/core';

import { LandingContent } from '../../../../components';

export default function EffectsLanding({ id }) {
  return (
    <LandingContent
      id={id}
      background={{ animated: true, image: '/img/white-4557097.jpg' }}
    >
      <LandingContent.Shaped
        float="left"
        shape="polygon(0% 0%, 55% 0%, 70% 35%, 60% 100%)"
      >
        <Typography align="justify">
          Obecnie ASMR jest jednym z najchętniej oglądanych rodzajów filmów na
          platformie YouTube. Zazwyczaj osoby tworzące takie filmy korzystają ze
          swojego głosu, szeptu, stukania, skrobania, pocierania różnych
          przedmiotów by stworzyć delikatną, bogatą w transienty warstwę
          dźwiękową. Oprócz tego istnieje praktycznie każdy rodzaj dźwięków tam
          użyty, od miauczenia małego kotka, krojenie mydła w kostki, po
          mlaskanie osoby jedzącej ośmiornice.
        </Typography>
      </LandingContent.Shaped>
    </LandingContent>
  );
}
