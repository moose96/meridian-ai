import React, { useState, useRef } from 'react';
import Pizzicato from 'pizzicato';

import PSound from '../../utility/Sound';
import RandomContainer from '../../utility/RandomContainer';
import Randomizer from '../../utility/Randomizer';

function Sound({ source, options, state, intensivity }) {
  // const [ticks, setTicks] = useState(0);
  const description = {
    source,
    options
  };

  // const sound = useRef(new PSound(options.path));
  const sound = useRef(new RandomContainer([
    new PSound('/data/drip_01.wav'),
    new PSound('/data/drip_02.wav'),
    new PSound('/data/drip_03.wav'),
    new PSound('/data/drip_04.wav'),
    new PSound('/data/drip_05.wav'),
    new PSound('/data/drip_06.wav'),
    new PSound('/data/drip_07.wav')
  ]));

  const ticks = useRef(0);

  // useEffect(() => {
  //   // clearInterval(timer.current);
  //   timer.current = setInterval(intervalProc, intensivity * 10);
  // }, [intensivity]);

  // useEffect(() => {
  //   switch(state) {
  //     case 'play':
  //       sound.current.play();
  //     break;
  //     case 'pause':
  //       sound.current.pause();
  //     break;
  //     case 'stop':
  //       sound.current.stop();
  //     break;
  //     default:
  //       console.log('error');
  //   }
  // }, [state]);

  const handleClick = () => {
    setInterval(() => {
      if (ticks.current >= intensivity / 100) {
        sound.current.beforePlay(sound => sound.setPan(Randomizer(0, 50) / 100));
        sound.current.play();
        ticks.current = 0;
      }
      console.log(intensivity);

      ticks.current = ticks.current + 1;
    }, 20);
  }

  return (
    <div className="sound">
      <button onClick={handleClick}>play</button>
    </div>
  );
}

export default Sound;