import React, { useState } from 'react';
import Box from '@material-ui/core/Box';

import { TransportBar, ASMRButton } from '../../../../components';
import { useAIComposer } from '../../../../hooks';
import SoundPlaylist from './components/SoundPlaylist';

export default function PlayPage() {
  const [oscillate, setOscillate] = useState(false);
  const { prev, next, start, stop } = useAIComposer({ oscillate });

  return (
    <>
      <Box display="flex" flex={1}>
        <SoundPlaylist />
        <div style={{ display: 'flex', flexDirection: 'column-reverse', flex: 1, justifyContent: 'space-between' }}>
          <Box display="flex" justifyContent="center">
            <ASMRButton active={oscillate} onClick={() => setOscillate(!oscillate)} />
          </Box>
        </div>
      </Box>
      <TransportBar
        onPrev={() => prev()}
        onNext={() => next()}
        onPlay={() => start()}
        onStop={() => stop()}
      />
    </>
  );
}