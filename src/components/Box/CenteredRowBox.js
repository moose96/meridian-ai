import React from 'react';

import RowBox from './RowBox';

export default function CenteredRowBox({ horizontal, vertical, ...props }) {
  let _horizontal = props.horizontal;
  let _vertical = props.vertical;

  if (!_horizontal && !_vertical) {
    _horizontal = true;
    _vertical = true;
  }

  return (
    <RowBox
      justifyContent={_horizontal && 'center'}
      alignItems={_vertical && 'center'}
      {...props}
    />
  );
}