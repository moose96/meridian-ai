import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { PrimaryButton, SecondaryButton } from '../Button';
import GuideContainer from './styled/GuideContainer';
import GuideToolbar from './styled/GuideToolbar';
import {
  setNextFrame,
  setVisited,
  getCurrentFrame,
  setData,
} from '../../redux/guide';

export default function Guide({ data }) {
  const currentFrame = useSelector(getCurrentFrame);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setData(data));
  }, [data, dispatch]);

  useEffect(() => {
    if (currentFrame === data.length) {
      dispatch(setVisited());
    }
  }, [currentFrame, data, dispatch]);

  return (
    <GuideContainer>
      <GuideToolbar reverse>
        <PrimaryButton onClick={() => dispatch(setNextFrame())}>
          Next
        </PrimaryButton>
        <SecondaryButton onClick={() => dispatch(setVisited())}>
          Skip guide
        </SecondaryButton>
      </GuideToolbar>
    </GuideContainer>
  );
}
