import React from 'react';
import { motion, useTransform } from 'framer-motion';

import { useScrollableElement } from '../../../../hooks';

export default function LandingBackgroundImage({ src, filter }) {
  const { ref, scrollBounds, scrollY } = useScrollableElement();
  const position = useTransform(
    scrollY,
    [scrollBounds.top, scrollBounds.bottom],
    [1.15, 1.05]
  );

  return (
    <motion.img
      ref={ref}
      src={src}
      alt=""
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        zIndex: 1,
        position: 'absolute',
        left: 0,
        top: 0,
        scale: position,
        filter,
      }}
    />
  );
}
