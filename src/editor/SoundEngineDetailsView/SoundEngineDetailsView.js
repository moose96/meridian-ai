import React, { Fragment } from 'react';
import BasicView from './views/BasicView';

import Header from './views/Header';
import RandomizationView from './views/RandomizationView';
import SoundView from './views/SoundView';
import SequenceView from './views/SequenceView'
import SoundObjectView from './views/SoundObjectView';
import GlobalView from './views/GlobalView';
import EffectView from './views/effects/EffectView';
import './SoundEngineDetailsView.scss'

const SoundEngineDetailsView = React.forwardRef(({ object, onChange }, ref) => {
  let dependentView;
  let additionalRandomizationKeys;

  if (object) {
    switch(object.type) {
      case 'Sound':
        dependentView = <SoundView ref={ref} object={object} onChange={onChange} />
        additionalRandomizationKeys = SoundView.randomizationKeys;
      break;
      case 'SequenceContainer':
        dependentView = <SequenceView ref={ref} object={object} onChange={onChange} />
        additionalRandomizationKeys = SequenceView.randomizationKeys;
      break;
      case 'MultipleSoundObject':
      case 'SingleSoundObject':
      dependentView = <SoundObjectView ref={ref} object={object} onChange={onChange} />
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
          <RandomizationView ref={ref} object={object} onChange={onChange} keys={additionalRandomizationKeys}/>
          <BasicView ref={ref} object={object} onChange={onChange} />
          {dependentView}
          <EffectView ref={ref} object={object} id={0} />
          <GlobalView />
        </Fragment>
      ) : (
        <p>Select object on the left side.</p>
      )}
    </div>
  );
});

export default SoundEngineDetailsView;