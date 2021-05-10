import React, { useMemo } from 'react';
import { Typography, Box } from '@material-ui/core';

import { LandingContent, RowBox } from '../../../../components';
import { useScrollableElement } from '../../../../hooks';
import useIsNarrow from '../../hooks';

export default function NeuronLanding({ id }) {
  const { isVisible, ref } = useScrollableElement();
  const isNarrow = useIsNarrow();

  const background = useMemo(
    () => ({ animated: true, image: '/img/neuron-4632883.jpg' }),
    []
  );

  const boxStyle = useMemo(() => ({ zIndex: 2 }), []);

  return (
    <LandingContent ref={ref} id={id} background={background}>
      <RowBox alignItems="flex-end" height="100%">
        <Box width={isNarrow ? '100%' : '30%'} padding="2rem" style={boxStyle}>
          <LandingContent.Animated
            from="left"
            variant={isVisible ? 'show' : 'hidden'}
          >
            <Typography variant="h2" color="textPrimary" gutterBottom>
              O aplikacji
            </Typography>
            <Typography align="justify" color="textPrimary">
              Ta aplikacja, jak sugeruje jej nazwa - Meridian AI - korzysta z
              algorytmów optymalizujących, pseudo sztucznej inteligencji. Jej
              celem jest maksymalizacja przyjemności poprzez uwzględnianie
              reakcji odbiorcy.
            </Typography>
          </LandingContent.Animated>
        </Box>
      </RowBox>
    </LandingContent>
  );
}
