import React from 'react';

import RowBox from './RowBox';

export default function CenteredRowBox(props) {
  let horizontal = props.horizontal;
  let vertical = props.vertical;

  if (!horizontal && !vertical) {
    horizontal = true;
    vertical = true;
  }

  return (
    <RowBox
      justify={horizontal && 'center'}
      alignItems={vertical && 'center'}
      {...props}
    />
  );
}