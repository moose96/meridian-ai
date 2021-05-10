import React, { useCallback } from 'react';
import { Settings } from '@material-ui/icons';
import { bindTrigger } from 'material-ui-popup-state';

import { SecondaryButton } from '../Button';
import { SettingsContent, SettingsPopover } from './components';
import { useSettingsData } from './hooks';

export default function SettingsControl() {
  const { language } = useSettingsData();

  const renderButton = useCallback(
    (popoverState) => (
      <SecondaryButton {...bindTrigger(popoverState)}>
        <Settings />
      </SecondaryButton>
    ),
    []
  );

  return (
    <SettingsPopover button={renderButton}>
      <SettingsContent language={language} />
    </SettingsPopover>
  );
}
