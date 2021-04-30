import React from 'react';
import { Settings } from '@material-ui/icons';
import { bindTrigger } from 'material-ui-popup-state';

import { SecondaryButton } from '../Button';
import { SettingsContent, SettingsPopover } from './components';
import { useSettingsData } from './hooks';

export default function SettingsControl() {
  const { language } = useSettingsData();

  return (
    <SettingsPopover
      button={(popverState) => (
        <SecondaryButton {...bindTrigger(popverState)}>
          <Settings />
        </SecondaryButton>
      )}
    >
      <SettingsContent language={language} />
    </SettingsPopover>
  );
}
