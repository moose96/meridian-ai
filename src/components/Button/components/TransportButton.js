import React from 'react';
import {
  PlayArrow,
  Stop,
  SkipNext,
  SkipPrevious
} from '@material-ui/icons';
import PropTypes from 'prop-types';

import RoundedButton from './RoundedButton';

const getIconAndSizes = type => {
  switch(type) {
    case 'play':
    default:
      return {
        icon: <PlayArrow />,
        size: 'medium'
      }
    case 'stop':
      return {
        icon: <Stop />,
        size: 'medium'
      }
    case 'prev':
      return {
        icon: <SkipPrevious />,
        size: 'small'
      }
    case 'next':
      return {
        icon: <SkipNext />,
        size: 'small'
      }
  }
}

export default function TransportButton({ type, ...props }) {
  const { icon, size } = getIconAndSizes(type);

  return <RoundedButton {...props} size={size}>{icon}</RoundedButton>
}

TransportButton.propTypes = {
  type: PropTypes.oneOf(['play', 'stop','prev', 'next'])
}