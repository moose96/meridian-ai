import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { PrimaryButton, SecondaryButton } from '../Button';
import GuideContainer from './styled/GuideContainer';
import GuideToolbar from './styled/GuideToolbar';
import {
  setNextFrame,
  addVisited,
  getCurrentFrame,
  getVisitedRoutes,
  getIsGuide,
  setData,
  setAllVisited,
  enableGuide,
} from '../../redux/guide';

export default function Guide({ data, route }) {
  const isGuide = useSelector(getIsGuide);
  const currentFrame = useSelector(getCurrentFrame);
  const visitedRoutes = useSelector(getVisitedRoutes);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    if (data[route]) {
      dispatch(setData(data[route]));
    }
  }, [data, dispatch, route]);

  useEffect(() => {
    if (!visitedRoutes.includes(route)) {
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
          <PrimaryButton onClick={handleNextFrame}>
            {t('buttons.nextGuide')}
          </PrimaryButton>
          <SecondaryButton
            onClick={() => dispatch(setAllVisited(Object.keys(data)))}
          >
            {t('buttons.skipGuide')}
          </SecondaryButton>
        </GuideToolbar>
      </GuideContainer>
    );
  } else {
    return null;
  }
}
