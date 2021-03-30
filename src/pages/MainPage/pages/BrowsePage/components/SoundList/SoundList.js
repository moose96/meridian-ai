import React from 'react';
import { Typography, Divider } from '@material-ui/core';

import SoundListContainer from '../../styled/SoundListContainer';
import { SoundCardList } from '../../../../../../components';

export default function SoundList({ data }) {
  return (
    <SoundListContainer>
      <Typography variant="h4" color="textPrimary" gutterBottom>
        Browse sounds
      </Typography>
      <Divider />
      <SoundCardList data={data} />
    </SoundListContainer>
  )
}