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

function Filter({ type, frequency, gain, Q }) {
  const currentType = filterTypes.find(filterType => filterType.type === type);

  return (
    <div className="equalizer-filter">
      <select name="type" value={type}>
        {filterTypes.map(type => <option value={type.type}>{type.type}</option>)}
      </select>
      <Slider
        label="Frequency"
        name="frequency"
        value={frequency}
        min={20}
        max={20000}
        step={1} />
      <Slider
        label="Gain"
        name="gain"
        value={gain}
        min={-12}
        max={12}
        step={0.1}
        disabled={currentType.disabled === 'gain'} />
      <Slider
        label="Q"
        name="Q"
        value={Q}
        min={0.5}
        max={10.0}
        step={0.1}
        disabled={currentType.disabled === 'Q'} />
    </div>
  )
}

export default Filter;