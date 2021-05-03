import React from 'react';
import { Box } from '@material-ui/core';

export default function LandingShapedContent({
  children,
  shape,
  float,
  containerStyle,
}) {
  return (
    <Box style={containerStyle}>
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
