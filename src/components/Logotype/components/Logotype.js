import React from 'react';
import { useMediaQuery } from '@material-ui/core';

import LogotypeText from '../styled/LogotypeText';

export default function Logotype() {
  const tooSmall = useMediaQuery('(max-width: 720px');

  return (
    <LogotypeText variant="h3">
      {tooSmall ? 'M-AI' : 'MERIDIAN AI'}
    </LogotypeText>
  );
}
