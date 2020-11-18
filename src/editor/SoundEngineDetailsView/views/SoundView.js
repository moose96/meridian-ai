import React from 'react';

import Input from '../../../ui/Input';
import Slider from '../../../ui/Slider';
import Number from '../../../ui/Number';
import DetailsGroup from '../../DetailsGroup';
import withHandlers from './withHandlers';

function SoundView({ object, onInputChange }) {
  return (
    <DetailsGroup title="Sound details">
      <Slider
        name="startPoint"
        label="Start point"
        min={0}
        max={object.endPoint ? object.endPoint : object.originalLength}
        step={1}
        value={object.startPoint}
        onChange={onInputChange} />
      <Slider
        name="endPoint"
        label="End point"
        min={0}
        max={object.originalLength}
        step={1}
        value={object.endPoint}
        onChange={onInputChange} />
      <Slider
        name="detune"
        label="Detune"
        min={-1200}
        max={1200}
        step={1}
        value={object.detune}
        onChange={onInputChange} />
      <Number
        name="delay"
        label="Delay"
        min={0}
        step={1}
        value={object.delay}
        onChange={onInputChange} />
      <Number
        name="attack"
        label="Attack"
        min={0}
        max={10}
        step={0.001}
        value={object.attack}
        onChange={onInputChange} />
      <Number
        name="release"
        label="Release"
        min={0}
        max={10}
        step={0.001}
        value={object.release}
        onChange={onInputChange} />
    </DetailsGroup>
  );
}

export default withHandlers(SoundView);