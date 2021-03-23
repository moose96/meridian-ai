import React from 'react';
import {
  PlayArrow,
  Stop,
  SkipNext,
  SkipPrevious
} from '@material-ui/icons';
import PropTypes from 'prop-types';

import RoundedButton from './RoundedButton';

const getButtonData = type => {
  switch(type) {
    case 'play':
    default:
      return {
        icon: <PlayArrow />,
        size: 'medium',
        tooltip: 'Play simulation'
      }
    case 'stop':
      return {
        icon: <Stop />,
        size: 'medium',
        tooltip: 'Stop simulation'
      }
    case 'prev':
      return {
        icon: <SkipPrevious />,
        size: 'small',
        tooltip: 'Previous snapshot'
      }
    case 'next':
      return {
        icon: <SkipNext />,
        size: 'small',
        tooltip: 'Next snapshot'
      }
  }
}

export default function TransportButton({ type, ...props }) {
  const { icon, size, tooltip } = getButtonData(type);
  const disabledMessage = 'You have to wait for finish loading sounds';

  return (
    <RoundedButton
      {...props}
      size={size}
      tooltip={tooltip}
      tooltipDisabled={disabledMessage}
    >
      {icon}
    </RoundedButton>
  );
}

TransportButton.propTypes = {
  type: PropTypes.oneOf(['play', 'stop','prev', 'next'])
}