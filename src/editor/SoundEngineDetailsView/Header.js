import React from 'react';
import DetailsGroup from '../DetailsGroup';

function Header({ object }) {
  return (
    <DetailsGroup title="General information">
      <p>ID: </p>
      {object && <p>{object.id}</p>}
      <p>Name: </p>
      {object && <p>{object.name}</p>}
    </DetailsGroup>
  )
}

export default Header;