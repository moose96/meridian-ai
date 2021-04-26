import { useSelector } from 'react-redux';

import { getIsGuide, getCurrentFrame, getGuideData } from '../../redux/guide';
import { guideStyles } from '../../components/Guide';

export default function useGuide(frameIDs) {
  const isGuide = useSelector(getIsGuide);
  const currentFrame = useSelector(getCurrentFrame);
  const guideData = useSelector(getGuideData);

  return {
    guide:
      isGuide &&
      guideData.length > 0 &&
      frameIDs.includes(guideData[currentFrame].id),
    style: guideStyles,
    data: guideData[currentFrame],
  };
}
