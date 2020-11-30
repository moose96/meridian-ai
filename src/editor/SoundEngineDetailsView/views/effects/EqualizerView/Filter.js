import React from 'react';

import Slider from '../../../../../ui/Slider';

const filterTypes = [{
  type: 'lowpass',
  disabled: 'gain'
}, {
  type: 'highpass',
  disabled: 'gain'
}, {
  type: 'bandpass',
  disabled: 'gain'
}, {
  type: 'lowshelf',
  disabled: 'Q'
}, {
  type: 'highshelf',
  disabled: 'Q'
}, {
  type: 'peaking',
  disabled: null
}, {
  type: 'notch',
  disabled: 'gain'
}, {
  type: 'allpass',
  disabled: 'gain'
}];

function Filter({ type, frequency, gain, Q, id, onChange }) {
  const currentType = filterTypes.find(filterType => filterType.type === type);

  const handleChange = event => {
    onChange(id, event.target.name, event.target.value);
  }

  return (
    <div className="equalizer-filter">
      <select name="type" value={type} onChange={handleChange}>
        {filterTypes.map(type => <option value={type.type}>{type.type}</option>)}
      </select>
      <Slider
        label="Frequency"
        name="frequency"
        value={frequency}
        min={20}
        max={20000}
        step={1}
        onChange={handleChange} />
      <Slider
        label="Gain"
        name="gain"
        value={gain}
        min={-12}
        max={12}
        step={0.1}
        onChange={handleChange}
        disabled={currentType?.disabled === 'gain'} />
      <Slider
        label="Q"
        name="Q"
        value={Q}
        min={0.5}
        max={10.0}
        step={0.1}
        onChange={handleChange}
        disabled={currentType?.disabled === 'Q'} />
    </div>
  )
}

export default Filter;