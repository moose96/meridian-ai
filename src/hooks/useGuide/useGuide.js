import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  getIsGuide,
  getCurrentFrame,
  getIsVisited,
  getGuideData,
  enableGuide,
} from '../../redux/guide';
import { guideStyles } from '../../components/Guide';

export default function useGuide(frameIDs) {
  const isGuide = useSelector(getIsGuide);
  const currentFrame = useSelector(getCurrentFrame);
  const isVisited = useSelector(getIsVisited);
  const guideData = useSelector(getGuideData);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isVisited) {
      dispatch(enableGuide());
    }
  }, [isVisited, dispatch]);

  return {
    guide:
      isGuide &&
      guideData.length > 0 &&
      frameIDs.includes(guideData[currentFrame].id),
    style: guideStyles,
    data: guideData[currentFrame],
  };
}
