import React, { useState } from 'react';
import { Grid } from '@material-ui/core';

import { ColumnBox, CenteredRowBox, TransportBar, ASMRButton, Loading } from '../../../../components';
import { useAIComposer } from '../../../../hooks';
import SoundPlaylist from './components/SoundPlaylist';

export default function PlayPage() {
  const [oscillate, setOscillate] = useState(false);
  const { prev, next, start, stop, loading } = useAIComposer({ oscillate });
  // const { loading, current, max } = progress;

  return (
    <>
      <Grid container style={{ flex: 1 }}>
        <Grid item md={2}>
          <SoundPlaylist />
        </Grid>
        <Grid item md={10}>
          <ColumnBox reverse fluid justifyContent="space-between" style={{ height: '100%' }}>
            {loading && <Loading />}
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