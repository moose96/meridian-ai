import React from 'react';
import { CircularProgress } from '@material-ui/core';

import { CenteredColumnBox } from '../../components';

export default function Loading() {
  return (
    <CenteredColumnBox>
      <CircularProgress />
    </CenteredColumnBox>
  );
}