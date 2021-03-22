import React from 'react';

import ColumnBox from './ColumnBox';

export default function CenteredRowBox(props) {
  let horizontal = props.horizontal;
  let vertical = props.vertical;

  if (!horizontal && !vertical) {
    horizontal = true;
    vertical = true;
  }

  return (
    <ColumnBox
      alignItems={horizontal && 'center'}
      justify={vertical && 'center'}
      {...props}
    />
  );
}