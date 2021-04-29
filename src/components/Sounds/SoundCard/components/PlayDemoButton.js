import React from 'react';
import { PlayArrow } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';

import { SecondaryButton } from '../../../Button';

const PlayDemoButton = React.forwardRef((props, ref) => {
  const { t } = useTranslation();

  return (
    <SecondaryButton ref={ref} {...props}>
      <PlayArrow />
      {t('buttons.playDemo')}
    </SecondaryButton>
  );
});

export default PlayDemoButton;
