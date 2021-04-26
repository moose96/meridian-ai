import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from '@reach/router';

import { Header, Guide } from '../../components';
import { PlayPage, BrowsePage } from './pages/';
import MainContainer from './styled/MainContainer';
import ContentStyled from './styled/ContentStyled';

const GUIDE_DATA = {
  '/browse': [
    {
      id: 'browse-add',
      text: 'lorem ipsum',
    },
    {
      id: 'browse-demo',
      text: 'sit dolores',
    },
    { id: 'browse-categories', text: 'abc' },
    { id: 'navigation', text: 'def' },
  ],
  '/play': [
    { id: 'play-playlist', text: 'abc' },
    { id: 'play-playlist-hide', text: 'abc' },
    { id: 'play-transport-play', text: 'abc' },
    { id: 'play-transport-next', text: 'abc' },
    { id: 'play-transport-prev', text: 'abc' },
    { id: 'play-asmr-button', text: 'abc' },
    { id: 'play-volume', text: 'abc' },
  ],
};

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
