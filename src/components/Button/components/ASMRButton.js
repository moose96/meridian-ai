import React from 'react';
import { useTheme } from '@material-ui/core/styles';

import RoundedButton from './RoundedButton';

const globalStyles = {
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  borderWidth: 4
}

export default function ASMRButton({ onClick }) {
  const theme = useTheme();
  let styles = {...globalStyles};

  if (theme) {
    styles = {
      ...globalStyles,
      borderColor: theme.palette.primary.dark
    }
  }

  return <RoundedButton style={styles} size="large" variant="outlined" onClick={onClick}>ASMR!</RoundedButton>;
}