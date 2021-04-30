import React from 'react';
import { Popover } from '@material-ui/core';
import PopupState, { bindPopover } from 'material-ui-popup-state';

export default function SettingsPopover({ button, children }) {
  return (
    <PopupState variant="popover">
      {(popupState) => (
        <>
          {button(popupState)}
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            {children}
          </Popover>
        </>
      )}
    </PopupState>
  );
}
