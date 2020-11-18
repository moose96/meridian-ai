import React from 'react';

import Slider from '../../../ui/Slider';
import Number from '../../../ui/Number';
import DetailsGroup from '../../DetailsGroup';
import withHandlers from './withHandlers';

function SoundObjectView({ object, onInputChange }) {
  const handlePositionChange = event => {
    const position = {
      ...object.position,
      [event.target.name]: event.target.value
    }

    onInputChange({
      target: {
        name: 'position',
        value: position
      }
    });
  }

  return (
    <DetailsGroup title="Sound Object details">
      <Slider
        name="x"
        label="Position x"
        min={-object.attenuation}
        max={object.attenuation}
        step={object.attenuation/10}
        value={object.position.x}
        onChange={handlePositionChange} />
      <Slider
        name="y"
        label="Position y"
        min={-object.attenuation}
        max={object.attenuation}
        step={object.attenuation/10}
        value={object.position.y}
        onChange={handlePositionChange} />
      <Slider
        name="z"
        label="Position z"
        min={-object.attenuation}
        max={object.attenuation}
        step={object.attenuation/10}
        value={object.position.z}
        onChange={handlePositionChange} />
      <Number
        name="attenuation"
        label="Attennuation"
        min={0}
        value={object.attenuation}
        onChange={onInputChange} />
    </DetailsGroup>
  );
}

export default withHandlers(SoundObjectView);