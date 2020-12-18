import React from 'react';

import ExternalOutputList from './ExternalOutputList';
import DetailsGroup from '../../../DetailsGroup';

const SoundFXView = React.forwardRef(({ object, onChange }, ref) => {
  const handleExternalChange = (id, value) => {
    ref.current.externalOutputs[id].gain = value;
    onChange(ref.current.toPlainObject());
  }

  return (
    <DetailsGroup title="Sound FX">
      <ExternalOutputList data={object?.externalOutputs} onChange={handleExternalChange} />
    </DetailsGroup>
  );
});

export default SoundFXView;