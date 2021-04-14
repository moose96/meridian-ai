import React from 'react';
import { Popover } from '@material-ui/core';
import PopupState, { bindPopover } from 'material-ui-popup-state';

export default function VolumePopover({ button, children }) {
  return (
    <PopupState variant="popover" popupId="volume-control">
      {(popupState) => (
        <>
          {button(popupState)}
          <Popover
            {...bindPopover(popupState)}
            anchorPosition={{
              top: 200,
              left: 400,
            }}
            anchorOrigin={{
              horizontal: 'center',
              vertical: 'top',
            }}
            transformOrigin={{
              horizontal: 'center',
              vertical: 'bottom',
            }}
          >
            {children}
          </Popover>
        </>
      )}
    </PopupState>
  );
}
