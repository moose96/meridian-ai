import React from 'react';

import RoundedButton from './RoundedButton';

const styles ={
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  borderWidth: 4
}

export default function ASMRButton() {
  return <RoundedButton style={styles} size="large">ASMR!</RoundedButton>;
}