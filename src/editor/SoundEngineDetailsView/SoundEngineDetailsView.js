import React, { Fragment } from 'react';

import {
  Header,
  BasicView,
  RandomizationView,
  SoundView,
  SequenceView,
  EffectView,
  SoundFXView
} from './views';
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
      case 'RandomContainer':
      case 'ParallelContainer':
        dependentView = <SequenceView ref={ref} object={object} onChange={onChange} />
        additionalRandomizationKeys = SequenceView.randomizationKeys;
      break;
      case 'SoundFX':
        dependentView = <SoundFXView ref={ref} object={object} onChange={onChange} />
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
          <EffectView ref={ref} object={object} id={0} onChange={onChange} />
        </Fragment>
      ) : (
        <p>Select object on the left side.</p>
      )}
    </div>
  );
});

export default SoundEngineDetailsView;