import React from 'react';
import { Tooltip } from '@material-ui/core';

import { useGuide } from '../../../hooks';

export default function GuideTooltip({ frames, children, placement, show }) {
  const { guide, data } = useGuide(frames);

  return (
    <Tooltip
      title={data ? data.text : ''}
      arrow
      open={guide && show}
      placement={placement}
    >
      {children}
    </Tooltip>
  );
}

GuideTooltip.defaultProps = {
  show: true,
};
