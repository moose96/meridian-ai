import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const DIRECTIONS = {
  left: { translateX: -100 },
  right: { translateX: 100 },
  top: { translateY: -100 },
  bottom: { translateY: 100 },
};

export default function LandingAnimated({ children, variant, from }) {
  const variants = useMemo(
    () => ({
      hidden: DIRECTIONS[from],
      show: { translateX: 0, translateY: 0 },
    }),
    [from]
  );

  const transform = useMemo(() => ({ duration: 2 }), []);

  return (
    <motion.div animate={variant} variants={variants} transform={transform}>
      {children}
    </motion.div>
  );
}

LandingAnimated.defaultProps = {
  variant: 'hidden',
  from: 'left',
};
