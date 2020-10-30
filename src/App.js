import React, { useState, useEffect } from 'react';
import './App.css';

import Slider from './ui/Slider';
// import Sound from './sound/Sound';
import SoundEngine from './integration/SoundEngine';

function App() {
  const [intensivity, setIntensivity] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/data/drip.json')
    .then(response => response.json())
    .then(data => setData(data));
  }, []);

  const handleClick = () => {
    setPlaying(!playing);
  }

  return (
    <div className="App">
      <Slider min={0} max={100} step={1} value={intensivity} onChange={e => setIntensivity(e.target.value)} />
      <button onClick={handleClick}>{playing ? 'Stop' : 'Play'}</button>
      {/* <Sound source="file" options={{ path: '/data/drip_01.wav'}} intensivity={intensivity}/> */}
      <SoundEngine data={data} play={playing}/>
    </div>
  );
}

export default App;
