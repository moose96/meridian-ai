import React from 'react';
import DetailsGroup from '../DetailsGroup';

function Header({ object }) {
  return (
    <DetailsGroup title="General information">
      <p>ID: </p>
      <p>{object.id}</p>
      <p>Name: </p>
      <p>{object.name}</p>
    </DetailsGroup>
  )
}

export default Header;