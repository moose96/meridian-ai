import React from 'react';
import { Box } from '@material-ui/core';
import PropTypes from 'prop-types';

export default function RowBox({ fluid, reverse, direction: _direction, ...props }) {
  let direction = _direction;

  if (reverse) {
    direction = `${direction}-reverse`;
  }

  return (
    <Box
      display="flex"
      flexDirection={direction}
      flex={fluid && 1}
      {...props}
    />
  );
}

RowBox.defaultProps = {
  direction: 'row'
}

RowBox.propTypes = {
  fluid: PropTypes.bool,
  reverse: PropTypes.bool,
  direction: PropTypes.oneOf(['row', 'column'])
}