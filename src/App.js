import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';

import './App.scss';
import { SoundField } from './sound-engine';
import { makeTree } from './utility/makeTree';
import { TreeView, TreeItemGenerator } from './ui/TreeView';
import SoundEngineDetailsView from './editor/SoundEngineDetailsView';
import store from './redux/store';

import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';

function measure(data) {
  let result = [];

  for (let i = 0; i < 500; i++) {
    const t1 = window.performance.now();
    data.setCurve('volume', Math.floor(Math.random() * 1000 + 25));
    const t2 = window.performance.now();

    result.push(t2 - t1);
  }

  result.sort();
  const avg = result.reduce((prev, current) => prev + current) / result.length;
  console.log(avg, result);
}

function App({ voices }) {
  const [playing, setPlaying] = useState(false);
  const [data, setData] = useState([]);
  const [currentObject, setCurrentObject] = useState(null);

  // const soundField = useRef(new SoundField());
  const soundField = useRef();
  const refs = useRef([]);
  const currentRef = useRef(null);

  useEffect(() => {
    fetch('/data/aa2.json')
    .then(response => response.json())
    .then(data => {
      const [_treeView, result, _refs] = makeTree(data);
      refs.current = _refs;

      refs.current.forEach(ref => ref.setReduxStore(store));
      return result;
    })
    .then(data => {
      // data.setAttenuation(1.0);
      setData(data);
      measure(data);
      soundField.current = new SoundField();
      soundField.current.addSound(data);
      console.log(data);
      console.log(refs);
    });
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
    // currentRef.current[name] = value;
    //setDeepValue(currentRef.current, names, value);
    // setCurrentObject(currentRef.current.toPlainObject());

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

  useEffect(() => {
    if (playing) {
      soundField.current.start();
    } else if(soundField.current) {
      soundField.current.stop();
    }
  }, [playing]);

  return (
    <div className="App">
      <div className="App__left">
        <TreeView>
          <TreeItemGenerator data={data} onClick={handleTreeItemClick}/>
        </TreeView>
      </div>
      <div className="App__right">
        <div className="App__right__top">
          <SoundEngineDetailsView ref={currentRef} object={currentObject} onChange={handleSEDetailsChange} />
        </div>
        <div className="App__right__bottom">
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
