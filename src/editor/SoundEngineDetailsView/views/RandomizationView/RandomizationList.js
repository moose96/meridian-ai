import React from 'react';
import Randomization from './Randomization';

function RandomizationList({ randomizations }) {
  return (
    <div className="randomization-wrapper">
      {randomizations.map((element, index) => (
        <Randomization key={`randomization-${index}`} randomization={element} />
      ))}
    </div>
  )
}

export default RandomizationList;