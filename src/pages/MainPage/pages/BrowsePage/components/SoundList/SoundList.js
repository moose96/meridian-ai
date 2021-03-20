import React from 'react';
import { Typography } from '@material-ui/core';

import SoundListContainer from '../../styled/SoundListContainer';
import { SoundCardList } from '../../../../../../components';

export default function SoundList({ data }) {
  return (
    <SoundListContainer>
      <Typography variant="h4">
        Browse sounds
      </Typography>
      <SoundCardList data={data} />
    </SoundListContainer>
  )
}