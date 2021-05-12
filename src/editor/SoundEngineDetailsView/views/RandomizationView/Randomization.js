import React from 'react';

import Input from '../../../../ui/Input';
import Number from '../../../../ui/Number';
import './Randomization.scss';
import DeleteIcon from '@material-ui/icons/Delete';

const KEYS = ['volume', 'pan', 'muted'];

function Randomization({ id, randomization, keys, onChange, onDelete }) {
  const handleChange = (event) => {
    onChange(id, event);
  };

  const handleDelete = (event) => {
    event.preventDefault();
    onDelete(id);
  };

  let mergedKeys;

  if (keys) {
    mergedKeys = [...KEYS, ...keys];
  } else {
    mergedKeys = KEYS;
  }

  return (
    <div className="randomization">
      {/* <Input
        type="checkbox"
        name="bypass"
        label="Enabled"/> */}
      <select name="key" value={randomization.key} onChange={handleChange}>
        {mergedKeys.map((element, index) => (
          <option key={`randomization-key-${index}`} value={element}>
            {element}
          </option>
        ))}
      </select>
      <Number
        name="value"
        label="Value"
        step={0.01}
        value={randomization.value}
        onChange={handleChange}
      />
      <Number
        name="offset"
        label="Offset"
        min={0}
        step={0.1}
        value={randomization.offset}
        onChange={handleChange}
      />
      <Input
        type="checkbox"
        name="loop"
        label="Loop"
        checked={randomization.loop}
        onChange={handleChange}
      />
      <Number
        name="time"
        label="Time"
        value={randomization.time}
        onChange={handleChange}
      />
      <a href="/" onClick={handleDelete}>
        <DeleteIcon />
      </a>
    </div>
  );
}

export default Randomization;
