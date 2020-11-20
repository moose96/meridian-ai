import React from 'react';
import Randomization from './Randomization';

function RandomizationList({ randomizations, keys, onChange, onDelete }) {
  return (
    <div className="randomization-wrapper">
      {randomizations && randomizations.map((element, index) => (
        <Randomization
          key={`randomization-${index}`}
          id={index}
          randomization={element}
          keys={keys}
          onChange={onChange}
          onDelete={onDelete}/>
      ))}
    </div>
  )
}

export default RandomizationList;