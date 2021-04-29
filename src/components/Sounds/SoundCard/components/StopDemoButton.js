import React from 'react';
import { Stop } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';

import { SecondaryButton } from '../../../Button';

export default function StopDemoButton(props) {
  const { t } = useTranslation();

  return (
    <SecondaryButton {...props}>
      <Stop />
      {t('buttons.stopDemo')}
    </SecondaryButton>
  );
}
