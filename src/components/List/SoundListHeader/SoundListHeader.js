import React from 'react';
import { Category } from '@material-ui/icons';

import { RowBox, SecondaryButton, Typography } from '../../.';
import { useOrientation } from '../../../hooks';
import { GuideTooltip } from '../../Guide';

export default function SoundListHeader({ onCategoriesVisibilityChange }) {
  const { portrait } = useOrientation();

  return (
    <RowBox justifyContent="space-between">
      <Typography
        variant="h4"
        color="textPrimary"
        gutterBottom
        translated
        subKey="headers"
      >
        Browse sounds
      </Typography>
      {portrait ? (
        <GuideTooltip frames={['browse-categories']}>
          <SecondaryButton onClick={onCategoriesVisibilityChange}>
            <Category />
          </SecondaryButton>
        </GuideTooltip>
      ) : null}
    </RowBox>
  );
}
