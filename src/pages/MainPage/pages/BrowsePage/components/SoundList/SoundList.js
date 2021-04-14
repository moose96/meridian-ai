import React from 'react';
import { Divider } from '@material-ui/core';

import SoundListContainer from '../../styled/SoundListContainer';
import { SoundCardList } from '../../../../../../components';

export default function SoundList({ data, header, content }) {
  return (
    <SoundListContainer>
      {header}
      <Divider />
      {content}
      <SoundCardList data={data} />
    </SoundListContainer>
  );
}
