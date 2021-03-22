import React, { useState } from 'react';
import { Grid } from '@material-ui/core';

import { RowBox, ColumnBox, CenteredRowBox, TransportBar, ASMRButton } from '../../../../components';
import { useAIComposer } from '../../../../hooks';
import SoundPlaylist from './components/SoundPlaylist';

export default function PlayPage() {
  const [oscillate, setOscillate] = useState(false);
  const { prev, next, start, stop } = useAIComposer({ oscillate });

  return (
    <>
      <Grid container style={{ flex: 1 }}>
        <Grid item md={2}>
          <SoundPlaylist />
        </Grid>
        <Grid item md={10}>
          <ColumnBox reverse fluid justifyContent="space-between" style={{ height: '100%' }}>
            <CenteredRowBox horizontal>
              <ASMRButton active={oscillate} onClick={() => setOscillate(!oscillate)} />
            </CenteredRowBox>
          </ColumnBox>
        </Grid>
      </Grid>
      <TransportBar
        onPrev={() => prev()}
        onNext={() => next()}
        onPlay={() => start()}
        onStop={() => stop()}
      />
    </>
  );
}