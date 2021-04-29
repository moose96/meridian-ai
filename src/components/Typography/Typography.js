import React from 'react';
import { Typography } from '@material-ui/core';

import { useTranslateByValue } from '../../hooks';

export default function TranslatedTypography({
  translated,
  children,
  ns,
  subKey,
  ...props
}) {
  const text = useTranslateByValue({
    ns: ns ? ns : undefined,
    value: children,
    subKey: subKey ? subKey : undefined,
  });

  return <Typography {...props}>{translated ? text : children}</Typography>;
}
