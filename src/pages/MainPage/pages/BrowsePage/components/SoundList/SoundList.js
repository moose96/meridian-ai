import React from 'react';
import { Typography, Divider } from '@material-ui/core';

import SoundListContainer from '../../styled/SoundListContainer';
import { SoundCardList } from '../../../../../../components';

export default function SoundList({ data, header }) {
  return (
    <SoundListContainer>
      {/* <Typography variant="h4" color="textPrimary" gutterBottom>
        Browse sounds
      </Typography> */}
      {header}
      <Divider />
      <SoundCardList data={data} />
    </SoundListContainer>
  );
}
