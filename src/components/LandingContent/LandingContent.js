import React from 'react';
import { motion } from 'framer-motion';

import LandingStyled from './styled/LandingStyled';
import LandingShapedContent from './components/LandingShapedContent';

export default function LandingContent({ background, children, ...props }) {
  const styledBackground = {
    ...background,
    image: !background.animated ? background.image : undefined,
  };

  const imageAnimated = (
    <motion.img
      src={background.image}
      alt=""
      style={{
        width: '100%',
        height: '100%',
        zIndex: 1,
        position: 'absolute',
        left: 0,
        top: 0,
        transform: 'scale(1.05)',
      }}
      animate={{ left: '-10%' }}
      transition={{ duration: 5 }}
    />
  );

  return (
    <LandingStyled background={styledBackground} {...props}>
      {background.animated ? imageAnimated : null}
      {children}
    </LandingStyled>
  );
}

LandingContent.Shaped = LandingShapedContent;
