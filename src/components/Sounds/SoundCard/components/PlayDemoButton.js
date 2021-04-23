import React from 'react';
import { PlayArrow } from '@material-ui/icons';

import { SecondaryButton } from '../../../Button';

const PlayDemoButton = React.forwardRef((props, ref) => {
  return (
    <SecondaryButton ref={ref} {...props}>
      <PlayArrow />
      Play demo
    </SecondaryButton>
  );
});

export default PlayDemoButton;
