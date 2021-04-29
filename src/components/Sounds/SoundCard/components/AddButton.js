import React from 'react';
import { Add } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';

import { PrimaryButton } from '../../../Button';

const AddButton = React.forwardRef((props, ref) => {
  const { t } = useTranslation();

  return (
    <PrimaryButton ref={ref} {...props}>
      <Add />
      {t('buttons.addPlaylist')}
    </PrimaryButton>
  );
});

export default AddButton;
