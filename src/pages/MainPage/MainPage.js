import React from 'react';
import { useSelector } from 'react-redux';

import { Header, Guide } from '../../components';
import { PlayPage, BrowsePage } from './pages/';
import MainContainer from './styled/MainContainer';
import ContentStyled from './styled/ContentStyled';
import { getIsGuide } from '../../redux/guide';

const GUIDE_DATA = [
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
];

export default function MainPage() {
  const isGuide = useSelector(getIsGuide);

  return (
    <MainContainer>
      {isGuide ? <Guide data={GUIDE_DATA} /> : null}
      <Header />
      <ContentStyled>
        <BrowsePage path="browse" />
        <PlayPage path="play" />
      </ContentStyled>
    </MainContainer>
  );
}
