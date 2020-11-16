import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';

import './App.scss';
import Slider from './ui/Slider';
// import Sound from './sound/Sound';
import SoundEngine from './integration/SoundEngine';
import { SoundField } from './sound-engine';
import makeTree from './utility/makeTree';
import searchTree from './utility/searchTree';
import { TreeView, TreeItemGenerator } from './ui/TreeView';
import SoundEngineDetailsView from './editor/SoundEngineDetailsView';

function ObjectView({ data }) {
  if (data) {
    console.log(Object.getOwnPropertyDescriptors(data));
  }
  return (
    <div className="object-view">
      {data ? (
        Object.getOwnPropertyNames(data).map((field, index) => {
          if (typeof(data[field]) !== 'object') {
            return <p key={index}>{field}: {data[field]}</p>
          } else {
            return <p key={index}>{field}: [Object]</p>
          }
        })) : (
          <p>nothing selected</p>
        )}
    </div>
  )
}

function App({ voices }) {
  // const [intensivity, setIntensivity] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [data, setData] = useState([]);
  const [currentObject, setCurrentObject] = useState(null);

  const soundField = useRef(new SoundField());

  useEffect(() => {
    fetch('/data/aa.json')
    .then(response => response.json())
    .then(data => makeTree(data))
    .then(data => {
      data.setAttenuation(1.0);
      setData(data);
      soundField.current.addSound(data);
      console.log(data);
    });
  }, []);

  const handleClick = () => {
    setPlaying(!playing);
  }

  const handleTreeItemClick = id => {
    const foundObject = searchTree(data, value => value.id === id);
    setCurrentObject(foundObject);
  }

  const handleSEDetailsChange = (name, value) => {
    setCurrentObject({
      ...currentObject,
      [name]: value
    })
  }

  useEffect(() => {
    if (playing) {
      soundField.current.start();
    } else {
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
          <SoundEngineDetailsView object={currentObject} onChange={handleSEDetailsChange} />
        </div>
        <div className="App__right__bottom">
          <p>voices: {voices}</p>
          <button onClick={handleClick}>{playing ? 'Stop' : 'Play'}</button>
        </div>
      </div>
      {/* <Slider min={0} max={100} step={1} value={intensivity} onChange={e => setIntensivity(e.target.value)} /> */}
      {/* <Sound source="file" options={{ path: '/data/drip_01.wav'}} intensivity={intensivity}/> */}
      {/* <SoundEngine data={data} play={playing} value1={intensivity}/> */}
    </div>
  );
}

const mapStateToProps = state => ({
  voices: state.soundEngine.voices
});

export default connect(mapStateToProps)(App);
