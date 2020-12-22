import React from 'react';

import Slider from '../../../../ui/Slider';

function ParamsList({ params, onChange }) {
  const handleChange = event => {
    onChange(event.target.name, event.target.value);
  }

  return (
    <div className="params-list">
      {Object.entries(params).map(param => {
        const [name, value] = param;

        return (
          <Slider
            key={`param-slider-${name}`}
            name={name}
            label={name}
            min={0}
            max={100}
            step={1}
            value={value}
            onChange={handleChange} />
        );
      })}
    </div>
  )
}

export default ParamsList;