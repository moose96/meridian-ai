import React from 'react';

import DetailsGroup from '../../../DetailsGroup';
import RandomizationList from './RandomizationList';

const RandomizationView = React.forwardRef(({ object, onChange, keys }, ref) => {
  const randomization = object.randomization;

  const handleAdd = event => {
    event.preventDefault();

    ref.current.addRandomization();
    onChange(ref.current.toPlainObject());
  }

  const handleChange = (id, event) => {
    const { name, value } = event.target;

    ref.current.randomization[id][name] = name !== 'key' ? parseFloat(value) : value;
    onChange(ref.current.toPlainObject());
  }

  const handleDelete = (id, event) => {
    ref.current.deleteRandomization(id);
    onChange(ref.current.toPlainObject());
  }

  return(
    <DetailsGroup title="Randomization">
      <RandomizationList randomizations={randomization} keys={keys} onChange={handleChange} onDelete={handleDelete}/>
      <a href="#" onClick={handleAdd}>Add new</a>
    </DetailsGroup>
  );
});

export default RandomizationView;