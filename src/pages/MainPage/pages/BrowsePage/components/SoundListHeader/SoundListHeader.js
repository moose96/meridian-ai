import React from 'react';
import { Typography } from '@material-ui/core';
import { Category } from '@material-ui/icons';

import { RowBox, SecondaryButton } from '../../../../../../components';
import { useOrientation } from '../../../../../../hooks';

export default function SoundListHeader({ onCategoriesVisibilityChange }) {
  const { portrait } = useOrientation();

  return (
    <RowBox>
      <Typography variant="h4" color="textPrimary" gutterBottom>
        Browse sounds
      </Typography>
      {portrait ? (
        <SecondaryButton onClick={onCategoriesVisibilityChange}>
          <Category />
        </SecondaryButton>
      ) : null}
    </RowBox>
  );
}
