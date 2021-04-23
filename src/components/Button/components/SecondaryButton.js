import React from 'react';

import ButtonWithTooltip from './ButtonWithTooltip';

const SecondaryButton = React.forwardRef((props, ref) => (
  <ButtonWithTooltip ref={ref} variant="text" color="default" {...props} />
));

export default SecondaryButton;
