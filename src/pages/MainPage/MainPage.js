import React from 'react';

import { Header } from '../../components';
import { PlayPage, BrowsePage } from './pages/';
import MainContainer from './styled/MainContainer';
import ContentStyled from './styled/ContentStyled';

export default function MainPage() {
  return (
    <MainContainer>
      <Header />
      <ContentStyled>
        <BrowsePage path="browse" />
        <PlayPage path="play" />
      </ContentStyled>
    </MainContainer>
  );
}