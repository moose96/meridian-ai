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

export default function MenuDialog({ open, navItems, onClose, onLinkClick }) {
  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  const handleLinkClick = (id, event) => {
    if (onLinkClick) {
      onLinkClick(id, event);
    }

    if (onClose) {
      onClose();
    }
  };

  return (
    <Dialog fullScreen open={open} handleClose={handleClose}>
      <DialogTitle>
        <MenuButton onClick={handleClose} /> Menu
      </DialogTitle>
      <DialogContent>
        <List>
          {navItems.map(({ id, label }) => (
            <ListItem>
              <Link
                href={`#${id}`}
                color="textPrimary"
                onClick={(event) => handleLinkClick(id, event)}
              >
                {label}
              </Link>
            </ListItem>
          ))}
        </List>
      </DialogContent>
    </Dialog>
  );
}
