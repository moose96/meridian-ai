import React from 'react';
import { useMediaQuery } from '@material-ui/core';
import { VolumeUp, VolumeDown, VolumeMute } from '@material-ui/icons';
import { bindTrigger } from 'material-ui-popup-state';

import VolumeSlider from '../../../VolumeSlider';
import { SecondaryButton } from '../../../Button';
import VolumePopover from './VolumePopover';
import NamedVolumeSlider from './NamedVolumeSlider';

export default function VolumeControl({ value, onChange }) {
  const portrait = useMediaQuery('(orientation: portrait)');

  if (portrait) {
    console.log('portrait');
    return (
      <VolumePopover
        button={(popupState) => (
          <SecondaryButton {...bindTrigger(popupState)}>
            {value === 0 ? (
              <VolumeMute />
            ) : value < 0.5 ? (
              <VolumeDown />
            ) : (
              <VolumeUp />
            )}
          </SecondaryButton>
        )}
      >
        <VolumeSlider
          value={value}
          onChange={onChange}
          vertical
          style={{ height: 250, marginTop: 5, marginBottom: 5 }}
        />
      </VolumePopover>
    );
  } else {
    return (
      <NamedVolumeSlider
        value={value}
        onChange={onChange}
        style={{ width: '75%' }}
      />
    );
  }
}
