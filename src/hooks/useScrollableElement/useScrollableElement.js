import { useState, useEffect, useRef } from 'react';
import { useViewportScroll } from 'framer-motion';

export default function useScrollableElement() {
  const [scrollBounds, setScrollBounds] = useState({
    top: 0,
    y: 0,
    bottom: 0,
  });
  const [isVisible, setIsVisible] = useState(false);
  const [boundsSet, setBoundsSet] = useState(false);
  const { scrollY } = useViewportScroll();

  const ref = useRef();

  useEffect(() => {
    const unsubscribe = scrollY.onChange(() => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const currentScroll = scrollY.get();

        const y = rect.y + currentScroll;
        const height = rect.height;
        const top = y - height;
        const bottom = y + height;

        if (!boundsSet) {
          setScrollBounds({
            y,
            height,
            top,
            bottom,
          });
          setBoundsSet(true);
        }

        setIsVisible(currentScroll >= top && currentScroll <= bottom);
      }
    });

    return unsubscribe;
  }, [scrollY, boundsSet]);

  return {
    ref,
    isVisible,
    scrollBounds,
    scrollY,
  };
}
