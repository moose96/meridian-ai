import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';

import './App.scss';
import { SoundField } from './sound-engine';
import SoundEngine from './sound-engine/SoundEngine';
import { TreeView, TreeItemGenerator } from './ui/TreeView';
import SoundEngineDetailsView from './editor/SoundEngineDetailsView';
import { Input } from './ui';

import { startLoop, stopLoop } from './ai/ai-loop';

import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';

function App({ voices }) {
  const [playing, setPlaying] = useState(false);
  const [simulation, setSimulation] = useState(true);
  const [sounds, setSounds] = useState([]);
  const [currentObject, setCurrentObject] = useState(null);

  const soundField = useRef();
  const refs = useRef([]);
  const currentRef = useRef(null);

  useEffect(() => {
    (async () => {
      const response = await fetch('/v1/sounds');

      if (response.status === 200) {
        const data = await response.json();

        soundField.current = new SoundField();

        data.forEach(sound => {
          const [_treeView, result, _refs] = SoundEngine.createSoundFX(sound);
          refs.current = [...refs.current, ..._refs];
          soundField.current.addSound(result);
          setSounds(sounds => [...sounds, result]);
          console.log("data", sounds);
          console.log("refs", refs);
        });
      }
    })()
  }, []);

  const handleClick = () => {
    setPlaying(!playing);
  }

  const handleTreeItemClick = id => {
    currentRef.current = refs.current.find(ref => ref.id === id);
    setCurrentObject(currentRef.current.toPlainObject());
  }

  const handleSEDetailsChange = (object) => {
    setCurrentObject(object);

    /*
    all functions
    current.volume = value
    current.pan = value
    current.muted = value
    ...
    current.position.x = value
    ...
    current.addRandomization() | current.randomization = Array()
    current.randomization[id].offset = value
    current.effect[effectID].filters[0].frequency = value
    current.addEffect()
    */
  }

  const handleSimulationChange = event => {
    setSimulation(event.target.checked);
  }

  useEffect(() => {
    if (playing) {
      soundField.current.start();

      if (simulation) {
        startLoop(soundField.current.sounds);
      }
    } else if(soundField.current) {
      soundField.current.stop();

      if (simulation) {
        stopLoop();
      }
    }
  }, [playing, simulation]);

  return (
    <div className="App">
      <div className="App__left">
        <TreeView>
          {sounds.map((element, index) =>
            <TreeItemGenerator key={`tree-item-sound-fx-${index}`} data={element} onClick={handleTreeItemClick}/>
          )}
        </TreeView>
      </div>
      <div className="App__right">
        <div className="App__right__top">
          <SoundEngineDetailsView ref={currentRef} object={currentObject} onChange={handleSEDetailsChange} />
        </div>
        <div className="App__right__bottom">
          <Input type="checkbox" name="ai" label="simulation" checked={simulation} onChange={handleSimulationChange} />
          <button style={{gridColumn: '2/3'}} onClick={handleClick}>
            {playing ? <StopIcon /> : <PlayArrowIcon />}
          </button>
          <p id="voices">voices: {voices}</p>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  voices: state.soundEngine.voices
});

export default connect(mapStateToProps)(App);
