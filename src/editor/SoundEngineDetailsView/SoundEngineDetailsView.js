import React, { Fragment } from 'react';
import BasicView from './BasicView';

import Header from './Header';
import Randomization from './Randomization';
import SoundView from './SoundView';
import SequenceView from './SequenceView'
import SoundObjectView from './SoundObjectView';

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
          <Randomization object={object} />
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