import React from 'react';
import { Remove } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';

import { SecondaryButton } from '../../../Button';

export default function RemoveButton(props) {
  const { t } = useTranslation();

  return (
    <SecondaryButton {...props}>
      <Remove />
      {t('buttons.removePlaylist')}
    </SecondaryButton>
  );
}
