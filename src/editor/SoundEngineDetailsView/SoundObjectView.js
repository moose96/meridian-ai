import React from 'react';

import Input from '../../ui/Input';
import DetailsGroup from '../DetailsGroup';

function SoundObjectView({ object, onChange }) {
  const handlePositionChange = event => {
    const position = {
      ...object.position,
      [event.target.name]: event.target.value
    }

    onChange('position', position);
  }
  const handleChange = event => {
    onChange(event.target.name, event.target.value);
  }

  return (
    <DetailsGroup title="Sound Object details">
      <Input
        type="range"
        name="x"
        label="Position x"
        min={-object.attenuation}
        max={object.attenuation}
        step={object.attenuation/10}
        value={object.position.x}
        onChange={handlePositionChange} />
      <Input
        type="range"
        name="y"
        label="Position y"
        min={-object.attenuation}
        max={object.attenuation}
        step={object.attenuation/10}
        value={object.position.y}
        onChange={handlePositionChange} />
      <Input
        type="range"
        name="z"
        label="Position z"
        min={-object.attenuation}
        max={object.attenuation}
        step={object.attenuation/10}
        value={object.position.z}
        onChange={handlePositionChange} />
      <Input
        type="number"
        name="attenuation"
        label="Attennuation"
        min={0}
        value={object.attenuation}
        onChange={handleChange} />
    </DetailsGroup>
  );
}

export default SoundObjectView;