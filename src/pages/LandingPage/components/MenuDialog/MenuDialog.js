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

export default function MenuDialog({ open, navItems, onClose }) {
  const handleClose = () => {
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
              <Link href={`#${id}`} onClick={handleClose}>
                {label}
              </Link>
            </ListItem>
          ))}
        </List>
      </DialogContent>
    </Dialog>
  );
}
