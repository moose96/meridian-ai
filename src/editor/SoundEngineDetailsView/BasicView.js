import React from 'react';

import Input from '../../ui/Input';
import DetailsGroup from '../DetailsGroup';

function BasicView({ object, onChange }) {
  const handleChange = event => {
    onChange(event.target.name, event.target.value);
  }

  const handleCheckedChange = event => {
    onChange(event.target.name, event.target.checked);
  }

  return (
    <DetailsGroup title="Basic properties">
      <Input
        label="Volume"
        name="volume"
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={object && object.volume}
        onChange={handleChange} />
      <Input
        label="Pan"
        name="pan"
        type="range"
        min={-1}
        max={1}
        step={0.01}
        value={object && object.pan}
        onChange={handleChange} />
      <Input
        label="Mute"
        name="muted"
        type="checkbox"
        checked={object && object.muted}
        onChange={handleCheckedChange} />
    </DetailsGroup>
  );
}

export default BasicView;