import React from 'react';
import Input from '../../ui/Input';

import DetailsGroup from '../DetailsGroup';

function SequenceView({ object, onChange }) {
  const handleChange = event => {
    onChange(event.target.name, event.target.value);
  }

  const handleCheckedChange = event =>{
    onChange(event.target.name, event.target.value);
  }

  return (
    <DetailsGroup title="Sequence Container details">
      <Input
        type="number"
        name="delay"
        label="Delay"
        min={0}
        step={1}
        value={object.delay}
        onChange={handleChange} />
      <Input
        type="checkbox"
        name="loop"
        label="Loop"
        checked={object.loop}
        onChange={handleCheckedChange} />
    </DetailsGroup>
  );
}

export default SequenceView;