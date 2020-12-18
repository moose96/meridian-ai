import React from 'react';

import Slider from '../../../../ui/Slider';

function ExternalOutputList({ data, onChange }) {
  const handleChange = event => {
    const matches = event.target.name.match(/([0-9])/g);

    onChange(parseInt(matches[0]), event.target.value);
  }

  return(
    <div className="external-output-list">
      {data.map((element, index) => (
        <Slider
          key={`external-output-${index}`}
          name={`external-output-${index}`}
          label={`External output ${index + 1}`}
          min={0}
          max={1}
          step={0.01}
          value={element.gain}
          onChange={handleChange} />
      ))}
    </div>
  );
}

export default ExternalOutputList;