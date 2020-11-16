import React from 'react';
import DetailsGroup from '../DetailsGroup';
import Input from '../../ui/Input';

function Randomization({ object }) {
  return(
    <DetailsGroup title="Randomization">
      <select>
        <option>volume</option>
        <option>pan</option>
        <option>muted</option>
      </select>
      <Input type="range" />
    </DetailsGroup>
  );
}

export default Randomization;