import React from 'react';
import { Box } from '@material-ui/core';

const CONTAINER_DEFAULT_STYLE = {
  position: 'absolute',
  left: 0,
  top: 0,
  right: 0,
  height: '100%',
  zIndex: 2,
  padding: '2rem',
};

export default function LandingShapedContent({
  children,
  shape,
  float,
  containerStyle,
}) {
  return (
    <Box style={{ ...CONTAINER_DEFAULT_STYLE, ...containerStyle }}>
      <div
        style={{
          float: float,
          shapeOutside: shape,
          width: '100%',
          height: '100%',
        }}
      ></div>
      {children}
    </Box>
  );
}
