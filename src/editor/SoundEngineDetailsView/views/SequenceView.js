import React from 'react';

import Input from '../../../ui/Input';
import Number from '../../../ui/Number';
import DetailsGroup from '../../DetailsGroup';
import withHandlers from './withHandlers';

function SequenceView({ object, onInputChange, onCheckedChange }) {
  return (
    <DetailsGroup title="Sequence Container details">
      <Number
        name="delay"
        label="Delay"
        min={0}
        step={25}
        value={Math.floor(object.delay)}
        onChange={onInputChange} />
      <Input
        type="checkbox"
        name="loop"
        label="Loop"
        checked={object.loop}
        onChange={onCheckedChange} />
    </DetailsGroup>
  );
}

SequenceView.randomizationKeys = ['delay', 'loop'];

export default withHandlers(SequenceView);