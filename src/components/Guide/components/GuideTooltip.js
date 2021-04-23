import React from 'react';
import { Tooltip } from '@material-ui/core';

import { useGuide } from '../../../hooks';

export default function GuideTooltip({ frames, children, placement }) {
  const { guide, data } = useGuide(frames);

  return (
    <Tooltip
      title={data ? data.text : ''}
      arrow
      open={guide}
      placement={placement}
    >
      {children}
    </Tooltip>
  );
}
