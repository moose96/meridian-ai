import { useRef } from 'react';

export default function useMediaPlayer() {
  const ref = useRef(null);

  const play = () => {
    ref.current.play();
  }

  const stop = () => {
    ref.current.pause();
    ref.current.currentTime = 0;
  }

  return {
    ref,
    play,
    stop
  }
}