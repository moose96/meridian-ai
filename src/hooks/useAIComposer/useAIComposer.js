import { useState, useRef, useEffect } from 'react';

import AIComposer from '../../ai/AIComposer';
import { getSet } from '../../api/sets';

export default function useAIComposer({ oscillate, sound }) {
  const [loading, setLoading] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  //TODO:
  // const [progress, setProgress] = useState({ current: 0, max: 100 });
  const aiComposerRef = useRef();
  const aiComposer = aiComposerRef.current;

  // aiComposer.onProgressChange((current, max) => setProgress({ current, max }));

  useEffect(() => {
    aiComposerRef.current = new AIComposer();
  }, []);

  useEffect(() => console.log(isRunning), [isRunning]);

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
          const data = await getSet(sound);
          aiComposer.addSounds(data, () => {
            setLoading(false);
            console.log(isRunning);
            if (isRunning) {
              setTimeout(() => aiComposer.start(), 500);
            }
          });
        } else {
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, [aiComposer, sound]);

  useEffect(() => {
    aiComposer?.oscillate(oscillate);
  }, [aiComposer, oscillate]);

  const handlePrev = () => aiComposer.prev();
  const handleNext = () => aiComposer.next();
  const handleStart = () => {
    aiComposer?.start();
    setIsRunning(true);
  };
  const handleStop = () => {
    aiComposer?.stop();
    setIsRunning(false);
  };

  return {
    prev: handlePrev,
    next: handleNext,
    start: handleStart,
    stop: handleStop,
    loading,
    isRunning,
    // progress: {
    //   loading,
    //   ...progress
    // }
  };
}
