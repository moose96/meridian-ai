import React from 'react';
import { motion } from 'framer-motion';

const DIRECTIONS = {
  left: { translateX: -100 },
  right: { translateX: 100 },
  top: { translateY: -100 },
  bottom: { translateY: 100 },
};

export default function LandingAnimated({ children, variant, from }) {
  return (
    <motion.div
      animate={variant}
      variants={{
        hidden: DIRECTIONS[from],
        show: { translateX: 0, translateY: 0 },
      }}
      transform={{ duration: 2 }}
    >
      {children}
    </motion.div>
  );
}

LandingAnimated.defaultProps = {
  variant: 'hidden',
  from: 'left',
};
