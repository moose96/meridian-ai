import React, { useState } from 'react';
import Box from '@material-ui/core/Box';

import { TransportBar, ASMRButton } from '../../../../components';
import { useAIComposer } from '../../../../hooks';

export default function PlayPage() {
  const [oscillate, setOscillate] = useState(false);
  const { prev, next, start, stop } = useAIComposer({ oscillate });

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
        <p>content</p>
        <Box display="flex" justifyContent="center">
          <ASMRButton active={oscillate} onClick={() => setOscillate(!oscillate)} />
        </Box>
      </div>
      <TransportBar
        onPrev={() => prev()}
        onNext={() => next()}
        onPlay={() => start()}
        onStop={() => stop()}
      />
    </>
  );
}