import React, { Fragment } from 'react';
import BasicView from './views/BasicView';

import Header from './views/Header';
import RandomizationView from './views/RandomizationView';
import SoundView from './views/SoundView';
import SequenceView from './views/SequenceView'
import SoundObjectView from './views/SoundObjectView';
import './SoundEngineDetailsView.scss'

function SoundEngineDetailsView({ object, onChange }) {
  let dependentView;

  if (object) {
    switch(object.type) {
      case 'Sound':
        dependentView = <SoundView object={object} onChange={onChange} />
      break;
      case 'SequenceContainer':
        dependentView = <SequenceView object={object} onChange={onChange} />
      break;
      case 'MultipleSoundObject':
      case 'SingleSoundObject':
      dependentView = <SoundObjectView object={object} onChange={onChange} />
      break;
      default:
        dependentView = null;
      break;
    }
  }

  return (
    <div className="sound-engine-details-view">
      {object ? (
        <Fragment>
          <Header object={object} />
          <RandomizationView object={object} onChange={onChange}/>
          <BasicView object={object} onChange={onChange} />
          {dependentView}
        </Fragment>
      ) : (
        <p>Select object on the left side.</p>
      )}
    </div>
  );
}

export default SoundEngineDetailsView;