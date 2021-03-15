import React from 'react';

import { Header, TransportBar, ASMRButton } from '../../components';
import MainContainer from './styled/MainContainer';
import { useAIComposer } from '../../hooks';

export default function MainPage() {
  const { prev, next, start, stop, startOscillate } = useAIComposer();

  return (
    <MainContainer>
      <Header />
      <div style={{ flex: 1 }}>
        <p>content</p>
        <ASMRButton onClick={startOscillate} />
      </div>
      <TransportBar
        onPrev={() => prev()}
        onNext={() => next()}
        onPlay={() => start()}
        onStop={() => stop()}
      />
    </MainContainer>
  );
}