import { useRef, useEffect } from 'react';

import AIComposer from '../../ai/AIComposer';

export default function useAIComposer() {
  const aiComposer = useRef(new AIComposer()).current;

  useEffect(() => {
    (async () => {
      try {
        const data = await getSet();
        aiComposer.addSounds(data);
      }
      catch(err) {
        console.log(err);
      }
    })();
  }, []);

  const handlePrev = () => aiComposer.prev();
  const handleNext = () => aiComposer.next();
  const handleStart = () => aiComposer.start();
  const handleStop = () => aiComposer.stop();

  return {
    prev: handlePrev,
    next: handleNext,
    start: handleStart,
    stop: handleStop
  }
}