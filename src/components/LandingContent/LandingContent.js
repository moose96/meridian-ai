import React from 'react';
import { motion } from 'framer-motion';

import LandingStyled from './styled/LandingStyled';
import LandingShapedContent from './components/LandingShapedContent';

export default function LandingContent({ background, children, ...props }) {
  const styledBackground = background
    ? {
        ...background,
        image: !background.animated ? background.image : undefined,
      }
    : undefined;

  const imageAnimated = (
    <>
      <img
        src={background?.image}
        alt=""
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 1,
          position: 'absolute',
          left: 0,
          top: 0,
          transform: 'scale(1.05)',
        }}
      />
    </>
  );

  return (
    <LandingStyled background={styledBackground} {...props}>
      {background?.animated ? imageAnimated : null}
      {children}
    </LandingStyled>
  );
}

LandingContent.Shaped = LandingShapedContent;
