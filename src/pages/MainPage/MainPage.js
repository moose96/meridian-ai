import React from 'react';
import { useLocation } from '@reach/router';

import { Header, Guide } from '../../components';
import { PlayPage, BrowsePage } from './pages/';
import MainContainer from './styled/MainContainer';
import ContentStyled from './styled/ContentStyled';
import { GUIDE_DATA } from '../../constants';

export default function MainPage() {
  const location = useLocation();

  console.log(location);

  return (
    <MainContainer>
      <Guide data={GUIDE_DATA} route={location.pathname} />
      <Header />
      <ContentStyled>
        <BrowsePage path="browse" />
        <PlayPage path="play" />
      </ContentStyled>
    </MainContainer>
  );
}
