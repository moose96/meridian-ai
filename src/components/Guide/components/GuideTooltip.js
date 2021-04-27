import React from 'react';
import { Tooltip } from '@material-ui/core';

import { useGuide } from '../../../hooks';
import StyledTooltip from '../styled/StyledTooltip';

export default function GuideTooltip({ frames, children, placement, show }) {
  const { guide, data } = useGuide(frames);

  return (
    <StyledTooltip
      title={data ? data.text : ''}
      arrow
      open={guide && show}
      placement={placement}
    >
      {children}
    </StyledTooltip>
  );
}

GuideTooltip.defaultProps = {
  show: true,
};
