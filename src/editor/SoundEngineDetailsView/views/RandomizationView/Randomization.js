import React from 'react';

import Input from '../../../../ui/Input';
import Number from '../../../../ui/Number';
import './Randomization.scss';
import DeleteIcon from '@material-ui/icons/Delete';

const keys = ['volume', 'pan', 'muted'];

function Randomization({ id, randomization, onChange, onDelete }) {
  const handleChange = event => {
    onChange(id, event);
  }

  const handleDelete = event => {
    event.preventDefault();
    onDelete(id);
  }

  return (
    <div className="randomization">
      {/* <Input
        type="checkbox"
        name="bypass"
        label="Enabled"/> */}
      <select name="key" value={randomization.key} onChange={handleChange}>
        {keys.map((element, index) => (
          <option
            key={`randomization-key-${index}`}
            value={element}>
              {element}
            </option>
        ))}
      </select>
      <Number
        name="value"
        label="Value"
        step={0.01}
        value={randomization.value}
        onChange={handleChange} />
      <Number
        name="offset"
        label="Offset"
        min={0}
        step={0.1}
        value={randomization.offset}
        onChange={handleChange}/>
      <a href="#" onClick={handleDelete}><DeleteIcon /></a>
    </div>
  );
}

export default Randomization;