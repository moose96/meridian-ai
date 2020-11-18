import React from 'react';

import Input from '../../../ui/Input';
import Slider from '../../../ui/Slider';
import DetailsGroup from '../../DetailsGroup';
import withHandlers from './withHandlers';

function BasicView({ object, onInputChange, onCheckedChange }) {
  return (
    <DetailsGroup title="Basic properties">
      <Slider
        label="Volume"
        name="volume"
        min={0}
        max={1}
        step={0.01}
        value={object.volume}
        onChange={onInputChange} />
      <Slider
        label="Pan"
        name="pan"
        min={-1}
        max={1}
        step={0.01}
        value={object.pan}
        onChange={onInputChange} />
      <Input
        label="Mute"
        name="muted"
        type="checkbox"
        checked={object.muted}
        onChange={onCheckedChange} />
    </DetailsGroup>
  );
}

export default withHandlers(BasicView);