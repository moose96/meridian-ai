import React from 'react';

import RowBox from './RowBox';

export default function ColumnBox(props) {
  return <RowBox direction="column" {...props} />;
}