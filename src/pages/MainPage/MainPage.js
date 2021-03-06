import React from 'react';

import { Header, TransportBar } from '../../components';
import MainContainer from './styled/MainContainer';

export default function MainPage() {
  return (
    <MainContainer>
      <Header />
      <div style={{ flex: 1 }}>
        <p>content</p>
      </div>
      <TransportBar />
    </MainContainer>
  );
}