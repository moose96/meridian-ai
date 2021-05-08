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
  shapes,
  containerStyle,
}) {
  return (
    <Box style={{ ...CONTAINER_DEFAULT_STYLE, ...containerStyle }}>
      {shapes.map(({ float, shape }, index) => (
        <div
          key={`shape-${shape}`}
          style={{
            float,
            shapeOutside: shape,
            width: `${100 / shapes.length}%`,
            height: '100%',
          }}
        />
      ))}
      {children}
    </Box>
  );
}
