import React from 'react';

import DetailsGroup from '../../../DetailsGroup';
import RandomizationList from './RandomizationList';

function RandomizationView({ object, onChange }) {
  const randomization = object.randomization;

  const handleAdd = event => {
    event.preventDefault();

    const newRandomization = {
      key: 'volume',
      offset: 0,
      value: 0
    }

    onChange('randomization', [...randomization, newRandomization]);
  }

  const handleChange = (id, event) => {
    let newRandomization = [...randomization];
    const { name, value } = event.target;

    newRandomization[id][name] = name !== 'key' ? parseFloat(value) : value;

    onChange('randomization', newRandomization);
  }

  const handleDelete = (id, event) => {
    let newRandomization = [...randomization];

    newRandomization.splice(id, 1);
    onChange('randomization', newRandomization);
  }

  return(
    <DetailsGroup title="Randomization">
      <RandomizationList randomizations={randomization} onChange={handleChange} onDelete={handleDelete}/>
      <a href="#" onClick={handleAdd}>Add new</a>
    </DetailsGroup>
  );
}

export default RandomizationView;