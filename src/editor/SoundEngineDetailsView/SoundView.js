import React from 'react';

import Input from '../../ui/Input';
import DetailsGroup from '../DetailsGroup';

function SoundView({ object, onChange }) {
  const handleChange = event => {
    onChange(event.target.name, event.target.value);
  }

  return (
    <DetailsGroup title="Sound details">
      <Input
        type="range"
        name="startPoint"
        label="Start point"
        min={0}
        max={object.endPoint ? object.endPoint : object.originalLength}
        step={1}
        value={object.startPoint}
        onChange={handleChange} />
      <Input
        type="range"
        name="endPoint"
        label="End point"
        min={0}
        max={object.originalLength}
        step={1}
        value={object.endPoint}
        onChange={handleChange} />
      <Input
        type="range"
        name="detune"
        label="Detune"
        min={-1200}
        max={1200}
        step={1}
        value={object.detune}
        onChange={handleChange} />
      <Input
        type="number"
        name="delay"
        label="Delay"
        min={0}
        step={1}
        value={object.delay}
        onChange={handleChange} />
      <Input
        type="number"
        name="attack"
        label="Attack"
        min={0}
        max={10}
        step={0.001}
        value={object.attack}
        onChange={handleChange} />
      <Input
        type="number"
        name="release"
        label="Release"
        min={0}
        max={10}
        step={0.001}
        value={object.release}
        onChange={handleChange} />
    </DetailsGroup>
  );
}

export default SoundView;