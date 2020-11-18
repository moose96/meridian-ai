import React from 'react';

import DetailsGroup from '../../../DetailsGroup';
import Randomization from './Randomization';

function RandomizationView({ object, onChange }) {
  const randomization = object.randomization;

  const handleAdd = event => {
    event.preventDefault();

    const newRandomization = {
      key: 'volume',
      offset: 0
    }

    onChange({
      target: {
        name: 'randomization',
        value: newRandomization
      }
    });
  }

  return(
    <DetailsGroup title="Randomization">
      {randomization.key &&
        <Randomization randomization={randomization} />}
      <a href="#" onClick={handleAdd}>Add new</a>
    </DetailsGroup>
  );
}

export default RandomizationView;