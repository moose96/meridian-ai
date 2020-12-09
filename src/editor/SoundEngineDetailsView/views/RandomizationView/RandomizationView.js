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
    const { type, name, value, checked } = event.target;
    let _value = value;

    //change it to 'withHandlers'
    if (type === 'checkbox') {
      _value = checked;
    }

    //it's not nice
    ref.current.randomization.randomization[id].setValue(name, _value);
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