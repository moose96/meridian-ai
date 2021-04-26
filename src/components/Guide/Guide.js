import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { PrimaryButton, SecondaryButton } from '../Button';
import GuideContainer from './styled/GuideContainer';
import GuideToolbar from './styled/GuideToolbar';
import {
  setNextFrame,
  addVisited,
  getCurrentFrame,
  getVisitedRoutes,
  getIsGuide,
  resetVisited,
  setData,
  enableGuide,
} from '../../redux/guide';

export default function Guide({ data, route }) {
  const isGuide = useSelector(getIsGuide);
  const currentFrame = useSelector(getCurrentFrame);
  const visitedRoutes = useSelector(getVisitedRoutes);
  const dispatch = useDispatch();

  useEffect(() => {
    if (data[route]) {
      dispatch(setData(data[route]));
    }
  }, [data, dispatch, route]);

  useEffect(() => {
    if (!visitedRoutes.includes(route)) {
      dispatch(resetVisited());
      dispatch(enableGuide());
    }
  }, [route, dispatch, visitedRoutes]);

  const handleNextFrame = () => {
    if (currentFrame < data[route].length - 1) {
      dispatch(setNextFrame());
    } else {
      dispatch(addVisited(route));
    }
  };

  if (isGuide) {
    return (
      <GuideContainer>
        <GuideToolbar reverse>
          <PrimaryButton onClick={handleNextFrame}>Next</PrimaryButton>
          <SecondaryButton onClick={() => dispatch(addVisited(route))}>
            Skip guide
          </SecondaryButton>
        </GuideToolbar>
      </GuideContainer>
    );
  } else {
    return null;
  }
}
