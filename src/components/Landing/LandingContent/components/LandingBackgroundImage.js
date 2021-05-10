import React, { useMemo } from 'react';
import { motion, useTransform } from 'framer-motion';

import { useScrollableElement } from '../../../../hooks';

export default function LandingBackgroundImage({ src, filter }) {
  const { ref, scrollBounds, scrollY, isVisible } = useScrollableElement();
  const position = useTransform(
    scrollY,
    [scrollBounds.top, scrollBounds.bottom],
    [1.15, 1.05]
  );

  const conditionalPosition = useMemo(() => (isVisible ? position : 1.1), [
    isVisible,
    position,
  ]);

  const imgStyle = useMemo(
    () => ({
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      zIndex: 1,
      position: 'absolute',
      left: 0,
      top: 0,
      scale: conditionalPosition,
      filter,
    }),
    [conditionalPosition, filter]
  );

  return <motion.img ref={ref} src={src} alt="" style={imgStyle} />;
}
