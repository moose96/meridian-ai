import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';

import './App.scss';
import { SoundField } from './sound-engine';
import makeTree from './utility/makeTree';
import searchTree, { modifyTreeValue } from './utility/searchTree';
import { TreeView, TreeItemGenerator } from './ui/TreeView';
import SoundEngineDetailsView from './editor/SoundEngineDetailsView';

function App({ voices }) {
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
    });

    modifyTreeValue(soundField.current.sounds[0], object => {
      if (object.id === currentObject.id) {
        object[name] = value;
      }
    });
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
    </div>
  );
}

const mapStateToProps = state => ({
  voices: state.soundEngine.voices
});

export default connect(mapStateToProps)(App);
