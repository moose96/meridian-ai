import React from 'react';
import BasicView from './BasicView';

import Header from './Header';
import Randomization from './Randomization';

function SoundEngineDetailsView({ object, onChange }) {
  return (
    <div className="sound-engine-details-view">
      <Header object={object} />
      <Randomization object={object} />
      <BasicView object={object && object} onChange={onChange} />
    </div>
  );
}

export default SoundEngineDetailsView;