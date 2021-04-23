import React from 'react';

import ButtonWithTooltip from './ButtonWithTooltip';

const PrimaryButton = React.forwardRef((props, ref) => (
  <ButtonWithTooltip ref={ref} variant="contained" color="primary" {...props} />
));

export default PrimaryButton;
