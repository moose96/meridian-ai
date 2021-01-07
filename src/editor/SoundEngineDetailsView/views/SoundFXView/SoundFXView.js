import React from 'react';

import ExternalOutputList from './ExternalOutputList';
import ParamsList from './ParamsList';
import DetailsGroup from '../../../DetailsGroup';

const SoundFXView = React.forwardRef(({ object, onChange }, ref) => {
  const handleExternalChange = (id, value) => {
    ref.current.externalOutputs[id].gain = value;
    onChange(ref.current.toPlainObject());
  }

  const handleParamsChange = (name, value) => {
    ref.current.setParam(name, value, 'immediately');
    onChange(ref.current.toPlainObject());
  }

  return (
    <DetailsGroup title="Sound FX">
      <ExternalOutputList data={object?.externalOutputs} onChange={handleExternalChange} />
      <ParamsList params={object?.storedParams} onChange={handleParamsChange} />
    </DetailsGroup>
  );
});

export default SoundFXView;