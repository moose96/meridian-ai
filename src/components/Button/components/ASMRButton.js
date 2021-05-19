import React from 'react';
import { useTheme } from '@material-ui/core/styles';

import RoundedButton from './RoundedButton';

const globalStyles = {
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  borderWidth: 4,
};

const ASMRButton = React.forwardRef(({ active, onClick }, ref) => {
  const theme = useTheme();
  let styles = { ...globalStyles };

  if (theme) {
    styles = {
      ...globalStyles,
      borderColor: active
        ? theme.palette.primary.light
        : theme.palette.primary.dark,
    };
  }

  return (
    <RoundedButton
      ref={ref}
      style={styles}
      size="large"
      variant="outlined"
      onClick={onClick}
      tooltip={active ? 'Disables ASMR mode' : 'Enables ASMR mode'}
    >
      ASMR!
    </RoundedButton>
  );
});

export default ASMRButton;
