import { useRef, useEffect } from 'react';

import AIComposer from '../../ai/AIComposer';
import { getSet } from '../../api/sets';

export default function useAIComposer() {
  const aiComposer = useRef(new AIComposer()).current;

  useEffect(() => {
    (async () => {
      try {
        const data = await getSet('3bfa2ef6-63e1-41be-a977-0273ec87aa69');
        console.log('data', data);
        aiComposer.addSounds(data);
        console.log('aiComposer', aiComposer);
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
  const handleOscillate = mode => aiComposer.oscillate(mode);

  return {
    prev: handlePrev,
    next: handleNext,
    start: handleStart,
    stop: handleStop,
    startOscillate: () => handleOscillate(true),
    stopOscillate: () => handleOscillate(false)
  }
}