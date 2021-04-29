import React from 'react';
import { Tooltip } from '@material-ui/core';

import { useTranslateByValue } from '../../hooks';

export default function TranslatedTooltip({ translate, title, ns, ...props }) {
  const _title = useTranslateByValue({
    ns: ns ? ns : 'tooltips',
    value: title,
  });

  return <Tooltip title={translate ? _title : title} {...props} />;
}
