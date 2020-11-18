import React from 'react';

import Input from '../../../../ui/Input';
import Number from '../../../../ui/Number';
import withHandlers from '../withHandlers';

const keys = ['volume', 'pan', 'muted'];

function Randomization({ randomization, onInputChange }) {
  return (
    <div className="randomization">
      {/* <Input
        type="checkbox"
        name="bypass"
        label="Enabled"/> */}
      <select name="key" value={randomization.key} onChange={onInputChange}>
        {keys.map((element, index) => (
          <option
            key={`randomization-key-${index}`}
            value={element}>
              {element}
            </option>
        ))}
      </select>
      <Number
        name="offset"
        label="Offset"
        min={0}
        value={randomization.offset}
        onChange={onInputChange}/>
    </div>
  );
}

export default withHandlers(Randomization);