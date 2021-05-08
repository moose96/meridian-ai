import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  Link,
} from '@material-ui/core';

import { MenuButton } from '../../../../components';
import MenuDialogWrapper from './styled/MenuDialogWrapper';

export default function MenuDialog({ open, Links, onClose, onLinkClick }) {
  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <Dialog fullScreen open={open} onClose={handleClose}>
      <DialogTitle>
        <MenuButton onClick={handleClose} /> Menu
      </DialogTitle>
      <DialogContent>
        <List>
          {Links?.map((link, index) => (
            <ListItem key={`menu-dialog-link-${index}`}>
              {React.cloneElement(link, { onClick: handleClose })}
            </ListItem>
          ))}
        </List>
      </DialogContent>
    </Dialog>
  );
}
