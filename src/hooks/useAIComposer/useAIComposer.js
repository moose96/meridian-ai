import { useState, useRef, useEffect } from 'react';

import AIComposer from '../../ai/AIComposer';
import { getSet } from '../../api/sets';

export default function useAIComposer({ oscillate, sound }) {
  const [loading, setLoading] = useState(true);
  // const [progress, setProgress] = useState({ current: 0, max: 100 });
  const aiComposerRef = useRef();
  const aiComposer = aiComposerRef.current;

  // aiComposer.onProgressChange((current, max) => setProgress({ current, max }));

  useEffect(() => {
    aiComposerRef.current = new AIComposer();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);

        if (aiComposer?.hasSounds()) {
          if (aiComposer.isRunning()) {
            aiComposer.stop();
          }
          aiComposer.clear();
        }

        if (sound.length > 0) {
          const data = await getSet(/*'3bfa2ef6-63e1-41be-a977-0273ec87aa69'*/ sound);
          console.log('data', data);
          aiComposer.addSounds(data, () => setLoading(false));
          console.log('aiComposer', aiComposer);
        } else {
          setLoading(false);
        }
      }
      catch(err) {
        console.log(err);
      }
    })();
  }, [aiComposer, sound]);

  useEffect(() => {
    aiComposer?.oscillate();
  }, [aiComposer, oscillate])

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