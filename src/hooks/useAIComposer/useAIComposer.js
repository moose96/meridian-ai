import { useState, useRef, useEffect } from 'react';

import AIComposer from '../../ai/AIComposer';
import { getSet } from '../../api/sets';

export default function useAIComposer({ oscillate }) {
  const [loading, setLoading] = useState(true);
  // const [progress, setProgress] = useState({ current: 0, max: 100 });
  const aiComposer = useRef(new AIComposer()).current;

  // aiComposer.onProgressChange((current, max) => setProgress({ current, max }));

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await getSet('3bfa2ef6-63e1-41be-a977-0273ec87aa69');
        console.log('data', data);
        aiComposer.addSounds(data, () => setLoading(false));
        console.log('aiComposer', aiComposer);
      }
      catch(err) {
        console.log(err);
      }
    })();
  }, []);

  useEffect(() => {
    aiComposer.oscillate();
  }, [oscillate])

  const handlePrev = () => aiComposer.prev();
  const handleNext = () => aiComposer.next();
  const handleStart = () => aiComposer.start();
  const handleStop = () => aiComposer.stop();

  return {
    prev: handlePrev,
    next: handleNext,
    start: handleStart,
    stop: handleStop,
    loading
    // progress: {
    //   loading,
    //   ...progress
    // }
  }
}